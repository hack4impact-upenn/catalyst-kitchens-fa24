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
  const startDate = new Date(Date.UTC(year.getFullYear(), 0, 1));
  const endDate = new Date(Date.UTC(year.getFullYear() + 1, 0, 1));

  const outcomes = await ProgramOutcomes.findOne({
    orgId: orgId,
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
  const years = outcomes.map((outcome) => outcome.year.getUTCFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
};

// Get all program outcomes of a given year
const getAllProgramOutcomesByYear = async (year: Date) => {
  const outcomes = await ProgramOutcomes.find({ year }).exec();
  return outcomes;
};

const addProgramOutcomes = async (obj: IProgramOutcomes) => {
  const newOutcomes = new ProgramOutcomes(obj);
  const outcomes = await newOutcomes.save();
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
): Promise<number | null> => {
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(year + 1, 0, 1));

  try {
    console.log('Service - Getting network average for:', {
      field,
      year,
      startDate,
      endDate,
    });
    const result = await ProgramOutcomes.aggregate([
      {
        $match: {
          year: { $gte: startDate, $lt: endDate },
          [field]: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          average: { $avg: `$${field}` },
        },
      },
    ]);
    console.log('Service - Network average result:', result);
    return result.length > 0 ? result[0].average : null;
  } catch (error) {
    console.error(`Error calculating network average for ${field}:`, error);
    throw new Error(`Unable to calculate network average for ${field}`);
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
};
