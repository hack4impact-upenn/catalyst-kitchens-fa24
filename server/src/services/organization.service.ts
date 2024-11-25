import { IOrganization, Organization } from '../models/organization.model.ts';

const getOrganizationByName = async (name: string) => {
  const org = await Organization.findOne({
    organizationName: name,
  }).exec();
  return org;
};
const getOrganizationNameById = async (id: string) => {
  const org = await Organization.findOne(
    {
      _id: id,
    },
    ['organizationName'],
  ).exec();
  return org;
};
const getAllOrganizations = async () => {
  const orgList = await Organization.find({}, [
    '_id',
    'organizationName',
  ]).exec();
  return orgList;
};

const getOrganizationById = async (
  orgId: string,
): Promise<IOrganization | null> => {
  try {
    const org = await Organization.findById(orgId).exec();
    return org;
  } catch (error) {
    console.error('Error fetching organization by ID:', error);
    throw error;
  }
};

export {
  getOrganizationByName,
  getAllOrganizations,
  getOrganizationById,
  getOrganizationNameById,
};
