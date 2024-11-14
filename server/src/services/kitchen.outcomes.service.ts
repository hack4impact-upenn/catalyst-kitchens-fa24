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

const getAverageSocialEnterpriseRevenue = async (year: number) => {
  try {
    const outcomes = await KitchenOutcomes.find({
      year: {
      $gt: new Date(year - 1, 11, 31),
      $lt: new Date(year + 1, 0, 1),
      },
    }).exec();
    if (!outcomes || outcomes.length === 0) {
      throw new Error('No kitchen outcomes found for the specified year');
    }

    const totalRevenue = outcomes.reduce((sum, outcome) => sum + outcome.retailSocialEnterpriseRevenue, 0);
    const averageRevenue = totalRevenue / outcomes.length;

    return { averageRevenue: averageRevenue };
  } catch (error) {
    console.error('Error calculating average retail social enterprise revenue for the specified year:', error);
    throw new Error('Unable to calculate average retail social enterprise revenue for the specified year');
  }
};

const getGrossRevenue = async (year: number, type: string) => {
  try {
    const outcomes = await KitchenOutcomes.find({
      year: {
        $gt: new Date(year - 1, 11, 31),
        $lt: new Date(year + 1, 0, 1),
      },
    }).exec();

    if (!outcomes || outcomes.length === 0) {
      throw new Error('No kitchen outcomes found for the specified year');
    }

    const grossRevenueCounts = outcomes.reduce((acc: { [key: string]: number }, outcome) => {
      let revenue;
      switch (type) {
        case 'cafe':
          revenue = outcome.grossRevenueCafe;
          break;
        case 'catering':
          revenue = outcome.grossRevenueCatering;
          break;
        case 'subscription':
          revenue = outcome.grossRevenueFoodSubscription;
          break;
        case 'truck':
          revenue = outcome.grossRevenueFoodTruck;
          break;
        case 'restaurant':
          revenue = outcome.grossRevenueRestaurant;
          break;
        case 'wholesale':
          revenue = outcome.grossRevenueWholesale;
          break;
        default:
          throw new Error('Invalid type specified');
      }
      if (acc[revenue]) {
        acc[revenue]++;
      } else {
        acc[revenue] = 1;
      }
      return acc;
    }, {});

    return { grossRevenueCounts };
  } catch (error) {
    console.error('Error calculating gross revenue cafe counts for the specified year:', error);
    throw new Error('Unable to calculate gross revenue cafe counts for the specified year');
  }
};


export {
  getOneKitchenOutcomes,
  getAllYearsForOrganization,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllKitchenOutcomesByOrg,
  deleteKitchenOutcomeById,
  getAverageSocialEnterpriseRevenue,
  getGrossRevenue,
};
