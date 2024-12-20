import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { isAdmin } from '../controllers/admin.middleware';

import {
  getOneKitchenOutcomesController,
  getAllKitchenOutcomesController,
  getAllOrganizationsController,
  getAllYearsForOrganizationController,
  getKitchenOutcomesByOrg,
  deleteKitchenOutcomeByIdController,
  addKitchenOutcomesController,
} from '../controllers/kitchen.outcomes.controller.ts';

const router = express.Router();

// router.get('/:year/:orgName', isAuthenticated, getOneKitchenOutcomesController);
router.get('/:year/:orgId', isAuthenticated, getOneKitchenOutcomesController); // no authentication for now

router.get('/', isAuthenticated, getAllKitchenOutcomesController);
// Route to get all unique organization names
router.get('/organizations', isAuthenticated, getAllOrganizationsController);

// Route to get all unique years for a specified organization
router.get(
  '/get/years/:orgId',
  isAuthenticated,
  getAllYearsForOrganizationController,
);

router.get('/get/all/:orgId', isAuthenticated, getKitchenOutcomesByOrg);

router.delete('/delete/:id', isAdmin, deleteKitchenOutcomeByIdController);

router.post('/add/', isAuthenticated, addKitchenOutcomesController);
export default router;
