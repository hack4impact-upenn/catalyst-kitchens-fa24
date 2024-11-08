import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import {
  getOneProgramOutcomesController,
  getAllProgramOutcomesController,
  getAllOrganizationsController,
  getAllYearsForOrganizationController,
  getBarrierInformation,
} from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

// router.get('/:year/:orgName', isAuthenticated, getOneProgramOutcomesController);
router.get('/:year/:orgId', getOneProgramOutcomesController); // no authentication for now

router.get('/', getAllProgramOutcomesController);
// Route to get all unique organization names
router.get('/organizations', getAllOrganizationsController);

// Route to get all unique years for a specified organization
router.get('/get/years/:orgId', getAllYearsForOrganizationController);

// Route to get all Barriers from unique years for a specified organization
router.get('/barriers/:year/:orgId', getBarrierInformation); // no authentication for now

export default router;
