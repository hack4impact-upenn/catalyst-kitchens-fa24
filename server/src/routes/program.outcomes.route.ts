import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { isAdmin } from '../controllers/admin.middleware';
import {
  getOneProgramOutcomesController,
  getAllProgramOutcomesByYearController,
  addProgramOutcomesController,
  getAllProgramOutcomesByOrgController,
  deleteProgramOutcomeByIdController,
  getDistinctYearsByOrgIdController,
  getNetworkAverageController,
  getFieldValuesByYearController,
} from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

router.get(
  '/network-average/:field/:year/:endYear/:adultProgramSize/:youthProgramSize/:barrierHomelessness/:barrierInRecovery/:barrierReturningCitizens/:compareModelOrganization',
  isAuthenticated,
  getNetworkAverageController,
);
router.get(
  '/org/:orgId/years',
  isAuthenticated,
  getDistinctYearsByOrgIdController,
);
router.get(
  '/org/:orgId/all',
  isAuthenticated,
  getAllProgramOutcomesByOrgController,
);
router.get(
  '/org/:orgId/:year',
  isAuthenticated,
  getOneProgramOutcomesController,
);
router.delete('/org/:id', isAdmin, deleteProgramOutcomeByIdController);
router.get(
  '/year/:year',
  isAuthenticated,
  getAllProgramOutcomesByYearController,
);
router.post('/new', isAuthenticated, addProgramOutcomesController);
router.get(
  '/field-values/:orgId/:field',
  isAuthenticated,
  getFieldValuesByYearController,
);

export default router;
