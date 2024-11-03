/* eslint-disable consistent-return */
import express from 'express';
import { DocumentDefinition } from 'mongoose';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IKitchenOutcomes } from '../models/kitchen.outcomes.model.ts';
import {
  getOneKitchenOutcomes,
  addKitchenOutcomes,
} from '../services/kitchen.outcomes.service.ts';

const getOneKitchenOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { year, orgId } = req.params;
  if (!year || !orgId) {
    next(ApiError.missingFields(['year', 'orgId']));
    return;
  }
  const yearDate = new Date(year);
  return getOneKitchenOutcomes(yearDate, orgId)
    .then((kitchenOutcomes: unknown) => {
      res.status(StatusCode.OK).send(kitchenOutcomes);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve kitchen outcomes by year and orgId',
        ),
      );
    });
};

const addKitchenOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const kitchenData: IKitchenOutcomes = req.body;
  return addKitchenOutcomes(kitchenData)
    .then((kitchenData) => {
      res.status(StatusCode.OK).send(kitchenData);
    })
    .catch(() => {
      next(ApiError.internal('Kitchen outcomes form data could not be added'));
    });
};
export { getOneKitchenOutcomesController, addKitchenOutcomeController };
