import mongoose from 'mongoose';
import {
  IKitchenOutcomes,
  KitchenOutcomes,
} from '../models/kitchen.outcomes.model.ts';

const calculateAgeAndRaceDistributions = async (
  startYear: number,
  endYear: number,
  mealType: string,
  mealRange: string,
  modelOrganizationComparison: string,
) => {
  try {
    console.log(
      'calculating age and race distribution service for start year:',
      startYear,
      'end year:',
      endYear,
    );
    const startDate = new Date(Date.UTC(startYear, 0, 1));
    const endDate = new Date(Date.UTC(endYear + 1, 0, 1));

    const matchConditions: any = {
      year: { $gte: startDate, $lt: endDate },
    };

    if (mealType !== 'All') {
      matchConditions.typeOfMealsServed = { $in: [mealType] };
    }

    if (mealRange !== 'All') {
      if (mealRange.includes('+')) {
        const minRange = parseInt(mealRange.replace('+', ''), 10);
        matchConditions.hungerReliefsMealsServed = { $gte: minRange };
      } else {
        const [minRange, maxRange] = mealRange.split('-').map(Number);
        matchConditions.hungerReliefsMealsServed = {
          $gte: minRange,
          ...(maxRange && { $lte: maxRange }),
        };
      }
    }
    let outcomes: any[] = [];
    if (modelOrganizationComparison !== 'true') {
      outcomes = await KitchenOutcomes.find(matchConditions);
    } else {
      outcomes = await KitchenOutcomes.aggregate([
        {
          $match: matchConditions,
        },
        {
          $lookup: {
            from: 'organization',
            localField: 'orgId',
            foreignField: '_id',
            as: 'organization',
          },
        },
        {
          $unwind: '$organization',
        },
        {
          $match: {
            'organization.status': 'Model Member',
          },
        },
      ]);
    }

    let totalMealsAdults = 0;
    let totalMealsInfants = 0;
    let totalMealsChildren = 0;
    let totalMealsSeniors = 0;
    let totalMealsAgeUnknown = 0;
    let totalMealsAmericanIndian = 0;
    let totalMealsAsian = 0;
    let totalMealsBlack = 0;
    let totalMealsLatinx = 0;
    let totalMealsNativeHawaiian = 0;
    let totalMealsMultiRacial = 0;
    let totalMealsWhite = 0;
    let totalMealsOtherRace = 0;
    let totalMealsRaceUnknown = 0;

    outcomes.forEach((outcome) => {
      if (
        !Number.isNaN(outcome.hungerReliefsMealsServed) &&
        !Number.isNaN(outcome.mealsAdults) &&
        !Number.isNaN(outcome.mealsInfants) &&
        !Number.isNaN(outcome.mealsChildren) &&
        !Number.isNaN(outcome.mealsSeniors) &&
        !Number.isNaN(outcome.mealsAgeUnknown)
      ) {
        const mealsServed = outcome.hungerReliefsMealsServed || 0;
        totalMealsAdults += (outcome.mealsAdults || 0) * mealsServed;
        totalMealsInfants += (outcome.mealsInfants || 0) * mealsServed;
        totalMealsChildren += (outcome.mealsChildren || 0) * mealsServed;
        totalMealsSeniors += (outcome.mealsSeniors || 0) * mealsServed;
        totalMealsAgeUnknown += (outcome.mealsAgeUnknown || 0) * mealsServed;
      }
      if (
        !Number.isNaN(outcome.hungerReliefsMealsServed) &&
        !Number.isNaN(outcome.mealsAmericanIndian) &&
        !Number.isNaN(outcome.mealsAsian) &&
        !Number.isNaN(outcome.mealsBlack) &&
        !Number.isNaN(outcome.mealsLatinx) &&
        !Number.isNaN(outcome.mealsNativeHawaiian) &&
        !Number.isNaN(outcome.mealsMultiRacial) &&
        !Number.isNaN(outcome.mealsWhite) &&
        !Number.isNaN(outcome.mealsOtherRace) &&
        !Number.isNaN(outcome.mealsRaceUnknown)
      ) {
        const mealsServed = outcome.hungerReliefsMealsServed || 0;
        totalMealsAmericanIndian +=
          (outcome.mealsAmericanIndian || 0) * mealsServed;
        totalMealsAsian += (outcome.mealsAsian || 0) * mealsServed;
        totalMealsBlack += (outcome.mealsBlack || 0) * mealsServed;
        totalMealsLatinx += (outcome.mealsLatinx || 0) * mealsServed;
        totalMealsNativeHawaiian +=
          (outcome.mealsNativeHawaiian || 0) * mealsServed;
        totalMealsMultiRacial += (outcome.mealsMultiRacial || 0) * mealsServed;
        totalMealsWhite += (outcome.mealsWhite || 0) * mealsServed;
        totalMealsOtherRace += (outcome.mealsOtherRace || 0) * mealsServed;
        totalMealsRaceUnknown += (outcome.mealsRaceUnknown || 0) * mealsServed;
      }
    });

    const totalAgeMeals =
      totalMealsAdults +
      totalMealsInfants +
      totalMealsChildren +
      totalMealsSeniors +
      totalMealsAgeUnknown;

    const totalRaceMeals =
      totalMealsAmericanIndian +
      totalMealsAsian +
      totalMealsBlack +
      totalMealsLatinx +
      totalMealsNativeHawaiian +
      totalMealsMultiRacial +
      totalMealsWhite +
      totalMealsOtherRace +
      totalMealsRaceUnknown;

    const ageAndRaceDistributions = {
      mealsAdults: (totalMealsAdults / totalAgeMeals) * 100,
      mealsInfants: (totalMealsInfants / totalAgeMeals) * 100,
      mealsChildren: (totalMealsChildren / totalAgeMeals) * 100,
      mealsSeniors: (totalMealsSeniors / totalAgeMeals) * 100,
      mealsAgeUnknown: (totalMealsAgeUnknown / totalAgeMeals) * 100,
      mealsAmericanIndian: (totalMealsAmericanIndian / totalRaceMeals) * 100,
      mealsAsian: (totalMealsAsian / totalRaceMeals) * 100,
      mealsBlack: (totalMealsBlack / totalRaceMeals) * 100,
      mealsLatinx: (totalMealsLatinx / totalRaceMeals) * 100,
      mealsNativeHawaiian: (totalMealsNativeHawaiian / totalRaceMeals) * 100,
      mealsMultiRacial: (totalMealsMultiRacial / totalRaceMeals) * 100,
      mealsWhite: (totalMealsWhite / totalRaceMeals) * 100,
      mealsOtherRace: (totalMealsOtherRace / totalRaceMeals) * 100,
      mealsRaceUnknown: (totalMealsRaceUnknown / totalRaceMeals) * 100,
    };

    console.log('AGE RACE DISTRIBUTIONS:', ageAndRaceDistributions);

    return ageAndRaceDistributions;
  } catch (error) {
    console.error('Error calculating age and race distributions:', error);
    throw new Error('Unable to calculate age and race distributions');
  }
};

export { calculateAgeAndRaceDistributions };

const getNetworkAverage = async (
  field: string,
  startYear: number,
  endYear: number,
  mealType: string,
  mealRange: string,
  modelOrganizationComparison: string,
): Promise<number | null> => {
  const startDate = new Date(Date.UTC(startYear, 0, 1));
  const endDate = new Date(Date.UTC(endYear + 1, 0, 1));

  try {
    console.log('Service - Getting network average for:', {
      field,
      startYear,
      endYear,
      startDate,
      endDate,
      mealType,
      mealRange,
    });
    const matchConditions: any = {
      year: { $gte: startDate, $lt: endDate },
      [field]: { $exists: true, $ne: NaN },
    };

    if (mealType !== 'All') {
      matchConditions.typeOfMealsServed = { $in: [mealType] };
    }

    if (mealRange !== 'All') {
      if (mealRange.includes('+')) {
        const minRange = parseInt(mealRange.replace('+', ''), 10);
        matchConditions.hungerReliefsMealsServed = { $gte: minRange };
      } else {
        const [minRange, maxRange] = mealRange.split('-').map(Number);
        matchConditions.hungerReliefsMealsServed = {
          $gte: minRange,
          ...(maxRange && { $lte: maxRange }),
        };
      }
    }

    console.log('Service - Match conditions:', matchConditions);
    if (modelOrganizationComparison !== 'true') {
      const result = await KitchenOutcomes.aggregate([
        {
          $match: matchConditions,
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
    }
    const result = await KitchenOutcomes.aggregate([
      {
        $match: matchConditions,
      },
      {
        $lookup: {
          from: 'organization',
          localField: 'orgId',
          foreignField: '_id',
          as: 'organization',
        },
      },
      {
        $unwind: '$organization',
      },
      {
        $match: {
          'organization.status': 'Model Member',
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

const getOneKitchenOutcomes = async (year: Date, orgId: string) => {
  console.log('Year', year.getFullYear());
  const startDate = new Date(Date.UTC(year.getFullYear(), 0, 1));
  const endDate = new Date(
    Date.UTC(year.getFullYear(), 11, 31, 23, 59, 59, 999),
  );
  const outcomes = await KitchenOutcomes.findOne({
    orgId,
    year: {
      $gte: startDate,
      $lte: endDate,
    },
  }).exec();
  console.log(startDate);
  console.log(endDate);
  console.log('Service - Found kitchen outcomes:', outcomes);
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

const addKitchenOutcomes = async (formState: any) => {
  const kitchenOutcomesData = {
    orgId: new mongoose.Types.ObjectId(formState.orgId), // Assume orgId is provided in formState or session
    year: formState.year,
    shareSurvey: formState.shareSurvey ? 'Yes' : 'No',
    organizationName: formState.organizationName,
    responderName: formState.responderName,
    responderTitle: formState.responderTitle,
    hungerReliefsMealsServed: formState.noMealsServed,
    typeOfMealsServed: formState.typeOfMealsServed,
    costPerMeal: formState.costPerMeal,
    foodCostPercentage: formState.foodCostPercentage,
    mealReimbursement: formState.mealReimbursement,
    mealFundingPublic: formState.mealFundingPublic,
    mealFundingPrivateContracts: formState.mealFundingPrivateContracts,
    mealFundingPrivateDonations: formState.mealFundingPrivateDonations,
    mealsFemale: formState.mealsFemale,
    mealsMale: formState.mealsMale,
    mealsNonBinary: formState.mealsNonBinary,
    mealsGenderUnknown: formState.mealsGenderUnknown,
    mealsTransgender: formState.mealsTrangender,
    mealsAmericanIndian: formState.mealsAmericanIndian,
    mealsAsian: formState.mealsAsian,
    mealsBlack: formState.mealsBlack,
    mealsLatinx: formState.mealsLatinx,
    mealsNativeHawaiian: formState.mealsNativeHawaiian,
    mealsMultiRacial: formState.mealsMultiRacial,
    mealsWhite: formState.mealsWhite,
    mealsOtherRace: formState.mealsOtherRace,
    mealsRaceUnknown: formState.mealsRaceUnknown,
    mealsInfants: formState.mealsInfants,
    mealsChildren: formState.mealsChildren,
    mealsAdults: formState.mealsAdults,
    mealsSeniors: formState.mealsSeniors,
    mealsAgeUnknown: formState.mealsAgeUnknown,
    capitalExpansionProjects: formState.capitalExpansionProjects,
    capitalProjectSize: formState.capitalProjectSize,
    capitalProjectDate: formState.capitalProjectDate,
    capitalExpansionProjectNeeds: formState.capitalExpansionProjectNeeds,
    retailSocialEnterpriseRevenue: formState.retailSocialEnterpriseRevenue,
    grossRevenueCafe: formState.grossRevenueCafe,
    grossRevenueRestaurant: formState.grossRevenueRestaurant,
    grossRevenueCatering: formState.grossRevenueCatering,
    grossRevenueFoodTruck: formState.grossRevenueFoodTruck,
    grossRevenueWholesale: formState.grossRevenueWholesale,
    grossRevenueFoodSubscription: formState.grossRevenueFoodSubscription,
  };
  const kitchenOutcomes = new KitchenOutcomes(kitchenOutcomesData);
  await kitchenOutcomes.save();
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
const getAllKitchenOutcomesByYear = async (year: number) => {
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(year + 1, 0, 1));
  const outcomes = await KitchenOutcomes.find({
    year: {
      $gte: startDate,
      $lt: endDate,
    },
  }).exec();
  if (outcomes.length > 0) {
    const parsedOutcomes = outcomes.map((outcome) => {
      return {
        ...outcome.toObject(),
        typeOfMealsServed: outcome.typeOfMealsServed?.join(';') || '',
        capitalExpansionProjectNeeds:
          outcome.capitalExpansionProjectNeeds?.join(';') || '',
      };
    });

    console.log('Parsed outcomes:', parsedOutcomes);
    return parsedOutcomes;
  }
  console.log('No outcomes found for the specified year.');
  return [];
};

export {
  getOneKitchenOutcomes,
  getAllYearsForOrganization,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllKitchenOutcomesByOrg,
  deleteKitchenOutcomeById,
  addKitchenOutcomes,
  getNetworkAverage,
  getAllKitchenOutcomesByYear,
};
