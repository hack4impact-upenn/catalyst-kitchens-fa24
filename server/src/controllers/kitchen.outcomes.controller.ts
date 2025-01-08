/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IKitchenOutcomes } from '../models/kitchen.outcomes.model.ts';
import {
  getOneKitchenOutcomes,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllYearsForOrganization,
  getAllKitchenOutcomesByOrg,
  deleteKitchenOutcomeById,
  addKitchenOutcomes,
  getNetworkAverage,
  calculateAgeAndRaceDistributions,
} from '../services/kitchen.outcomes.service.ts';

const distriController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { year } = req.params;

  if (!year) {
    next(ApiError.missingFields(['year']));
    return;
  }

  try {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum)) {
      next(ApiError.badRequest('Invalid year format'));
      return;
    }

    console.log(
      'calculating age and race distribution controller for year:',
      year,
    );

    const ageDistribution = await calculateAgeAndRaceDistributions(yearNum);

    res.status(StatusCode.OK).json({
      year: yearNum,
      ageDistribution,
    });
  } catch (error) {
    next(
      ApiError.internal(
        `Unable to calculate age distribution for year ${year}`,
      ),
    );
  }
};

export { distriController };

const getNetworkAverageController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { field, year } = req.params;

  if (!field || !year) {
    next(ApiError.missingFields(['field', 'year']));
    return;
  }

  try {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum)) {
      next(ApiError.badRequest('Invalid year format'));
      return;
    }

    const average = await getNetworkAverage(field, yearNum);

    res.status(StatusCode.OK).json({
      field,
      year: yearNum,
      average: average ?? null,
    });
  } catch (error) {
    next(ApiError.internal(`Unable to calculate network average for ${field}`));
  }
};

export { getNetworkAverageController };

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
  console.log('Year', year);
  const adjustedYear = parseInt(year, 10) + 1;
  const yearDate = new Date(Date.UTC(adjustedYear, 0, 1));
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

export { getOneKitchenOutcomesController };

const getKitchenOutcomesByOrg = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { orgId } = req.params;
  return getAllKitchenOutcomesByOrg(orgId)
    .then((kitchenOutcomes: unknown) => {
      res.status(StatusCode.OK).send(kitchenOutcomes);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to return all kitchen outcomes for this organization',
        ),
      );
    });
};

export { getKitchenOutcomesByOrg };
const getAllKitchenOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const kitchenOutcomes = await getAllKitchenOutcomes();
    res.status(StatusCode.OK).send(kitchenOutcomes);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve all kitchen outcomes'));
  }
};

export { getAllKitchenOutcomesController };

const getAllOrganizationsController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const organizations = await getAllOrganizations();
    res.status(StatusCode.OK).send(organizations);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve organizations'));
  }
};

export { getAllOrganizationsController };

const getAllYearsForOrganizationController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { orgId } = req.params;

  if (!orgId) {
    next(ApiError.missingFields(['organization ID']));
    return;
  }

  try {
    const years = await getAllYearsForOrganization(orgId);
    res.status(StatusCode.OK).send(years);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve years for the organization'));
  }
};

export { getAllYearsForOrganizationController };

const deleteKitchenOutcomeByIdController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }

  try {
    const result = await deleteKitchenOutcomeById(id);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export { deleteKitchenOutcomeByIdController };
const addKitchenOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const formState = req.body;
  if (!formState) {
    next(ApiError.missingFields(['forState']));
  }
  try {
    const result = await addKitchenOutcomes(formState);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export { addKitchenOutcomesController };
