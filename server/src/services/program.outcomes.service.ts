/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IProgramOutcomes,
  ProgramOutcomes,
} from '../models/program.outcomes.model.ts';

// Get a list of project outcomes data points by org_id
const getProgramOutcomesByOrgId = async (orgId: string) => {
  const outcomes = await ProgramOutcomes.find({
    orgId,
  }).exec();
  return outcomes;
};

// Get a singular project outcomes data point by org_id and year
const getOneProgramOutcomes = async (year: Date, orgId: string) => {
  console.log('Service - Getting program outcomes for:', { year, orgId });
  const targetYear = year.getUTCFullYear() - 1; // Shift back
  const startDate = new Date(Date.UTC(targetYear, 0, 1)); // Start
  const endDate = new Date(Date.UTC(targetYear + 1, 0, 1)); // Start of next
  const outcomes = await ProgramOutcomes.findOne({
    orgId,
    year: {
      $gte: startDate,
      $lt: endDate,
    },
  }).exec();

  console.log('Service - Found program outcomes:', outcomes);
  return outcomes;
};

const getAllProgramOutcomesByOrg = async (orgId: string) => {
  const outcomes = await ProgramOutcomes.find({ orgId }, [
    '_id',
    'year',
  ]).exec();
  return outcomes;
};

const getDistinctYearsByOrgId = async (orgId: string): Promise<number[]> => {
  console.log('Service - Getting years for orgId:', orgId);
  const outcomes = await ProgramOutcomes.find({ orgId }, ['year']);
  const years = outcomes.map((outcome: any) => outcome.year.getUTCFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
};

// Get all program outcomes of a given year
const getAllProgramOutcomesByYear = async (year: Date) => {
  const outcomes = await ProgramOutcomes.find({ year }).exec();
  return outcomes;
};

const addProgramOutcomes = async (obj: IProgramOutcomes) => {
  const newOutcomes = new ProgramOutcomes(obj);
  let outcomes = newOutcomes;
  try {
    outcomes = await newOutcomes.save();
  } catch (error) {
    throw new Error('Unable to add program outcome');
  }
  return outcomes;
};

const deleteProgramOutcomeById = async (id: string) => {
  try {
    const result = await ProgramOutcomes.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Program outcome not found');
    }
    return { message: 'Program outcome successfully deleted' };
  } catch (error) {
    console.error('Error deleting program outcome:', error);
    throw new Error('Unable to delete program outcome');
  }
};

const getNetworkAverage = async (
  field: string,
  year: number,
  endYear: number,
  adultProgramSize: 'All' | '1-19' | '20-49' | '50-99' | '100+',
  youthProgramSize: 'All' | '1-19' | '20-49' | '50-99' | '100+',
  barrierHomelessness: 'All' | '0-25%' | '26-50%' | '51-75%' | '76-100%',
  barrierInRecovery: 'All' | '0-25%' | '26-50%' | '51-75%' | '76-100%',
  barrierReturningCitizens: 'All' | '0-25%' | '26-50%' | '51-75%' | '76-100%',
): Promise<number | null> => {
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(endYear + 1, 0, 1));

  // Helper function to convert ranges to numerical bounds
  const getRange = (
    range: string,
  ): { $gte: number; $lt: number } | undefined => {
    const ranges: Record<string, [number, number]> = {
      '1-19': [1, 20],
      '20-49': [20, 50],
      '50-99': [50, 100],
      '100+': [100, Infinity],
      '0-25%': [0, 25],
      '26-50%': [26, 50],
      '51-75%': [51, 75],
      '76-100%': [76, 100],
    };
    return ranges[range]
      ? { $gte: ranges[range][0], $lt: ranges[range][1] }
      : undefined;
  };

  // Base filters
  const filters: any = {
    year: { $gte: startDate, $lt: endDate },
    [field]: { $exists: true, $ne: null },
  };

  // Add filters based on program size and barriers
  if (adultProgramSize !== 'All') {
    const range = getRange(adultProgramSize);
    if (range) filters.adultsTrained = range;
  }

  if (youthProgramSize !== 'All') {
    const range = getRange(youthProgramSize);
    if (range) filters.youthTrained = range;
  }

  if (barrierHomelessness !== 'All') {
    const range = getRange(barrierHomelessness);
    if (range) filters.barrierUnhoused = range;
  }

  if (barrierInRecovery !== 'All') {
    const range = getRange(barrierInRecovery);
    if (range) filters.barrierInRecovery = range;
  }

  if (barrierReturningCitizens !== 'All') {
    const range = getRange(barrierReturningCitizens);
    if (range)
      filters.barrierReturningCitizensOrFormerlyIncarceratedPersons = range;
  }

  try {
    console.log('Service - Getting network average with filters:', {
      field,
      year,
      startDate,
      endDate,
      filters,
    });

    const result = await ProgramOutcomes.aggregate([
      {
        $match: filters,
      },
      {
        $group: {
          _id: null,
          average: { $avg: `$${field}` },
        },
      },
    ]);

    console.log('Service - Network average result:', result);
    if (result.length > 0) {
      return result[0].average ? result[0].average : null;
    }
    return null;
  } catch (error) {
    console.error(`Error calculating network average for ${field}:`, error);
    throw new Error(`Unable to calculate network average for ${field}`);
  }
};

const getFieldValuesByYear = async (
  orgId: string,
  field: keyof IProgramOutcomes,
): Promise<Map<number, number | null>> => {
  try {
    const outcomes = await ProgramOutcomes.find(
      {
        orgId,
        [field]: { $exists: true },
      },
      ['year', field],
    ).exec();

    const valuesByYear = new Map<number, number | null>();

    outcomes.forEach((outcome: any) => {
      const year = outcome.year.getUTCFullYear();
      const value = outcome[field] as number | null;
      valuesByYear.set(year, value);
    });

    return valuesByYear;
  } catch (error) {
    console.error(`Error getting ${field} values by year:`, error);
    throw error;
  }
};

export {
  getProgramOutcomesByOrgId,
  getOneProgramOutcomes,
  getAllProgramOutcomesByYear,
  addProgramOutcomes,
  getAllProgramOutcomesByOrg,
  deleteProgramOutcomeById,
  getDistinctYearsByOrgId,
  getNetworkAverage,
  getFieldValuesByYear,
};
