/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IProgramOutcomes } from '../models/program.outcomes.model.ts';
import {
  getOneProgramOutcomes,
  getAllProgramOutcomes,
  getAllOrganizations,
  getAllYearsForOrganization,
} from '../services/program.outcomes.service.ts';

const getOneProgramOutcomesController = async (
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
  return getOneProgramOutcomes(yearDate, orgId)
    .then((programOutcomes: unknown) => {
      res.status(StatusCode.OK).send(programOutcomes);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve program outcomes by year and orgId',
        ),
      );
    });
};

const getAllProgramOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const programOutcomes = await getAllProgramOutcomes();
    res.status(StatusCode.OK).send(programOutcomes);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve all program outcomes'));
  }
};

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

const getAllAverageBarrierProgramOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const programOutcomes = await getAllProgramOutcomes();

    const filteredOutcomes = programOutcomes.map((outcome: any) => ({
      barrierInRecovery: outcome.barrierInRecovery,
      barrierIntellectualOrDevelopmentalDisability:
        outcome.barrierIntellectualOrDevelopmentalDisability,
      barrierMentalHealth: outcome.barrierMentalHealth,
      barrierNewAmericans: outcome.barrierNewAmericans,
      barrierPhysicalDisability: outcome.barrierPhysicalDisability,
      barrierReturningCitizensOrFormerlyIncarceratedPersons:
        outcome.barrierReturningCitizensOrFormerlyIncarceratedPersons,
      barrierUnhoused: outcome.barrierUnhoused,
      barrierVeteran: outcome.barrierVeteran,
    }));

    const averageOutcomes = filteredOutcomes.reduce((acc: any, curr: any) => {
      acc.barrierInRecovery += curr.barrierInRecovery;
      acc.barrierIntellectualOrDevelopmentalDisability +=
        curr.barrierIntellectualOrDevelopmentalDisability;
      acc.barrierMentalHealth += curr.barrierMentalHealth;
      acc.barrierNewAmericans += curr.barrierNewAmericans;
      acc.barrierPhysicalDisability += curr.barrierPhysicalDisability;
      acc.barrierReturningCitizensOrFormerlyIncarceratedPersons +=
        curr.barrierReturningCitizensOrFormerlyIncarceratedPersons;
      acc.barrierUnhoused += curr.barrierUnhoused;
      acc.barrierVeteran += curr.barrierVeteran;
      return acc;
    });

    const count = filteredOutcomes.length;
    averageOutcomes.barrierInRecovery /= count;
    averageOutcomes.barrierIntellectualOrDevelopmentalDisability /= count;
    averageOutcomes.barrierMentalHealth /= count;
    averageOutcomes.barrierNewAmericans /= count;
    averageOutcomes.barrierPhysicalDisability /= count;
    averageOutcomes.barrierReturningCitizensOrFormerlyIncarceratedPersons /=
      count;
    averageOutcomes.barrierUnhoused /= count;
    averageOutcomes.barrierVeteran /= count;

    res.status(StatusCode.OK).send(averageOutcomes);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve all program outcomes'));
  }
};

export {
  getOneProgramOutcomesController,
  getAllProgramOutcomesController,
  getAllOrganizationsController,
  getAllYearsForOrganizationController,
  getAllAverageBarrierProgramOutcomesController,
};
