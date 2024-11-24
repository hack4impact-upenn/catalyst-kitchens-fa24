import mongoose from 'mongoose';
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

const addKitchenOutcomes = async (formState: any) => {
  const kitchenOutcomesData = {
    orgId: new mongoose.Types.ObjectId('672679257a17c492dd2405a2'), // Assume orgId is provided in formState or session
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
  console.log(kitchenOutcomes);
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

export {
  getOneKitchenOutcomes,
  getAllYearsForOrganization,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllKitchenOutcomesByOrg,
  deleteKitchenOutcomeById,
  addKitchenOutcomes,
};
