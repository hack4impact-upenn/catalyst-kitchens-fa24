import {
  IKitchenOutcomes,
  KitchenOutcomes,
} from '../models/kitchen.outcomes.model.ts';

const getOneKitchenOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await KitchenOutcomes.findOne({
    orgId,
    year,
  }).exec();
  return outcomes;
};

const getAllKitchenOutcomesByOrg = async (orgId: string) => {
  const outcomes = await KitchenOutcomes.find(
    {
      orgId,
    },
    ['_id', 'year'],
  ).exec();
  return outcomes;
};

const getAllKitchenOutcomes = async () => {
  const outcomes = await KitchenOutcomes.find().exec();
  return outcomes;
};

const getAllOrganizations = async () => {
  try {
    // Use `distinct` to get unique organization names from the `organizationName` field
    const organizations = await KitchenOutcomes.distinct('organizationName');
    return organizations;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new Error('Unable to retrieve organizations');
  }
};

const getAllYearsForOrganization = async (organizationId: string) => {
  try {
    // Use aggregation to filter by organization name and extract unique years from the date field
    const results = await KitchenOutcomes.find({
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

const deleteKitchenOutcomeById = async (id: string) => {
  try {
    const result = await KitchenOutcomes.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Kitchen outcome not found');
    }
    return { message: 'Kitchen outcome successfully deleted' };
  } catch (error) {
    console.error('Error deleting kitchen outcome:', error);
    throw new Error('Unable to delete kitchen outcome');
  }
};

const addKitchenOutcomes = async (obj: IKitchenOutcomes) => {
  const newOutcomes = new KitchenOutcomes(obj);
  console.log('tried to save');
  const outcomes = newOutcomes;
  try {
    const outcomes = await newOutcomes.save();
  } catch (error) {
    console.log(error);
  }
  console.log('service saved');
  return outcomes;
};
export {
  getOneKitchenOutcomes,
  getAllYearsForOrganization,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllKitchenOutcomesByOrg,
  deleteKitchenOutcomeById,
  addKitchenOutcomes,
};
