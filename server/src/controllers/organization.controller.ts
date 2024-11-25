import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IOrganization } from '../models/organization.model.ts';
import {
  getOrganizationByName,
  getAllOrganizations,
  getOrganizationNameById,
  getOrganizationById,
} from '../services/organization.service.ts';

const getOrgByName = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { name } = req.params;
  if (!name) {
    next(ApiError.missingFields(['name']));
  }
  return getOrganizationByName(name)
    .then((org: unknown) => {
      res.status(StatusCode.OK).send(org);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve the organization by the name provided',
        ),
      );
    });
};
const getOrganizationNameByIdController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
  }
  return getOrganizationNameById(id)
    .then((name: unknown) => {
      res.status(StatusCode.OK).send(name);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve the organization by the name provided',
        ),
      );
    });
};
const getAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return getAllOrganizations()
    .then((org: unknown) => {
      res.status(StatusCode.OK).send(org);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve all organizations'));
    });
};
const getOrgById = async (
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
    const org = await getOrganizationById(id);

    if (!org) {
      next(ApiError.notFound('Organization not found'));
      return;
    }

    res.status(StatusCode.OK).send(org);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve organization by ID'));
  }
};
export { getOrgByName, getAll, getOrganizationNameByIdController, getOrgById };
