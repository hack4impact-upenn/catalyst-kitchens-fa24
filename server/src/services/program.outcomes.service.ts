import {
  IProgramOutcomes,
  ProgramOutcomes,
} from '../models/program.outcomes.model.ts';

const getOneProgramOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await ProgramOutcomes.findOne({
    orgId,
    year,
  }).exec();
  return outcomes;
};

const getAllProgramOutcomes = async () => {
  const outcomes = await ProgramOutcomes.find().exec();
  return outcomes;
};

const getAllOrganizations = async () => {
  try {
    // Use `distinct` to get unique organization names from the `organizationName` field
    const organizations = await ProgramOutcomes.distinct('_id');
    return organizations;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new Error('Unable to retrieve organizations');
  }
};

const getAllYearsForOrganization = async (organizationId: string) => {
  try {
    // Use aggregation to filter by organization name and extract unique years from the date field
    const results = await ProgramOutcomes.find({
      orgId: organizationId,
    }).exec();

    // Extract years from the aggregation result
    if (results != null) {
      return results.map((r) => r.year.getUTCFullYear());
    }
    throw new Error('No organization found');
  } catch (error) {
    console.error('Error fetching years:', error);
    throw new Error('Unable to retrieve years for the organization');
  }
};

export {
  getOneProgramOutcomes,
  getAllYearsForOrganization,
  getAllProgramOutcomes,
  getAllOrganizations,
};
