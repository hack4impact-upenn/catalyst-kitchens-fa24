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

const getAllKitchenOutcomesByYear = async (year: Date) => {
  const outcomes = await KitchenOutcomes.find({ year }).exec();
  return outcomes;
};

export { getOneKitchenOutcomes, getAllKitchenOutcomesByYear };
