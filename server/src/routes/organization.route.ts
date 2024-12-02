import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import {
  getOrgByName,
  getAll,
  getOrgById,
  getOrganizationNameByIdController,
  addOrganizationController,
  editOrganizationController,
} from '../controllers/organization.controller';
import { isAdmin } from '../controllers/admin.middleware';

const router = express.Router();

router.get('/name/:name', isAuthenticated, getOrgByName);
router.get('/organizations', isAuthenticated, getAll);
router.get('/id/:id', isAuthenticated, getOrgById);
router.post('/new', isAdmin, addOrganizationController);
router.post('/edit', isAdmin, editOrganizationController);

router.get(
  '/organization/name/:id',
  isAuthenticated,
  getOrganizationNameByIdController,
);
export default router;
