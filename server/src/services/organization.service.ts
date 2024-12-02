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
const addOrganization = async (
  status: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  organizationName: string,
) => {
  const newOrg = new Organization({
    status,
    street,
    city,
    state,
    zip,
    organizationName,
  });
  let res = newOrg;
  try {
    res = await newOrg.save();
  } catch (error) {
    throw new Error('Unable to add new organization');
  }
  return res;
};
const editOrganization = async (
  status: string,
  organizationName: string,
  id: string,
  street: string,
  city: string,
  state: string,
  zip: string,
) => {
  try {
    const res = await Organization.updateOne(
      { _id: id },
      {
        $set: {
          organizationName,
          status,
          street,
          city,
          state,
          zip,
        },
      },
    );
    console.log('Organization correctly updated!');
    return res;
  } catch (error) {
    throw new Error('Unable to update organization');
  }
};
export {
  getOrganizationByName,
  getAllOrganizations,
  getOrganizationById,
  getOrganizationNameById,
  addOrganization,
  editOrganization,
};
