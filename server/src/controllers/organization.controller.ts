import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IOrganization } from '../models/organization.model.ts';
import {
  getOrganizationByName,
  getAllOrganizations,
  getOrganizationNameById,
  getOrganizationById,
  addOrganization,
  editOrganization,
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
const addOrganizationController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { status, street, city, zip, state, organizationName } = req.body;
  addOrganization(status, street, city, state, zip, organizationName)
    .then((org: unknown) => {
      res.status(StatusCode.OK).send(org);
    })
    .catch(() => {
      next(ApiError.internal('Unable to add the organization'));
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
const editOrganizationController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, organizationName, status, street, city, state, zip } = req.body;
  if (!id) {
    next(ApiError.missingFields(['id']));
  }
  try {
    //     (alias) editOrganization(status: string, organizationName: string, id: string, street: string, city: string, state: string, zip: string): Promise<UpdateResult>
    // import editOrganization
    const org = await editOrganization(
      status,
      organizationName,
      id,
      street,
      city,
      state,
      zip,
    );
    if (!res) {
      next(ApiError.notFound('Organization could not be found and edited'));
    }
    res.status(StatusCode.OK).send(org);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve organization by ID'));
  }
};
export {
  getOrgByName,
  getAll,
  getOrganizationNameByIdController,
  getOrgById,
  addOrganizationController,
  editOrganizationController,
};
