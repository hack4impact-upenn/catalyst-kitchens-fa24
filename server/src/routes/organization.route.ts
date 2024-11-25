import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import {
  getOrgByName,
  getAll,
  getOrganizationNameByIdController,
} from '../controllers/organization.controller.ts';

const router = express.Router();

router.get('/name/:name', getOrgByName);
router.get('/organizations', getAll);
router.get('/organization/name/:id', getOrganizationNameByIdController);
export default router;
