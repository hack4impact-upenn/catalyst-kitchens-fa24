import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import {
  getOneKitchenOutcomesController,
  getAllKitchenOutcomesController,
  getAllOrganizationsController,
  getAllYearsForOrganizationController,
  getKitchenOutcomesByOrg,
  deleteKitchenOutcomeByIdController,
  getAverageSocialEnterpriseRevenueController,
  getGrossRevenueController,
} from '../controllers/kitchen.outcomes.controller.ts';

const router = express.Router();

// router.get('/:year/:orgName', isAuthenticated, getOneKitchenOutcomesController);
router.get('/:year/:orgId', getOneKitchenOutcomesController); // no authentication for now

router.get('/', getAllKitchenOutcomesController);
// Route to get all unique organization names
router.get('/organizations', getAllOrganizationsController);

// Route to get all unique years for a specified organization
router.get('/get/years/:orgId', getAllYearsForOrganizationController);

router.get('/get/all/:orgId', getKitchenOutcomesByOrg);

router.delete('/delete/:id', deleteKitchenOutcomeByIdController);

router.get('/get/avgRevenue/:year', getAverageSocialEnterpriseRevenueController);

router.get('/get/avgRevenue/:year/:type', getGrossRevenueController);

export default router;
