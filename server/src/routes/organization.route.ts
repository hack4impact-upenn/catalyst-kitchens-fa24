import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import {
  getOrgByName,
  getAll,
  getOrgById,
  getOrganizationNameByIdController,
} from '../controllers/organization.controller';

const router = express.Router();

router.get('/name/:name', getOrgByName);
router.get('/organizations', getAll);
router.get('/id/:id', getOrgById);

router.get('/organization/name/:id', getOrganizationNameByIdController);
export default router;
