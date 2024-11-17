import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import {
  getOneProgramOutcomesController,
  getAllProgramOutcomesByYearController,
  addProgramOutcomesController,
  getAllProgramOutcomesByOrgController,
  deleteProgramOutcomeByIdController,
  getDistinctYearsByOrgIdController,
  getNetworkAverageController,
} from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

router.get('/network-average/:field/:year', getNetworkAverageController);
router.get('/org/:orgId/years', getDistinctYearsByOrgIdController);
router.get('/org/:orgId/all', getAllProgramOutcomesByOrgController);
router.get('/org/:orgId/:year', getOneProgramOutcomesController);
router.delete('/org/:id', deleteProgramOutcomeByIdController);
router.get('/year/:year', getAllProgramOutcomesByYearController);
router.post('/new', addProgramOutcomesController);

export default router;
