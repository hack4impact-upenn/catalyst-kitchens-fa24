import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';

import {
  getOneProgramOutcomesController,
  getAllProgramOutcomesByYearController,
} from '../controllers/program.outcomes.controller.ts';

const router = express.Router();

router.get('/:year/:orgId', getOneProgramOutcomesController); // no authentication for now
router.get('/:year', getAllProgramOutcomesByYearController); // no authentication for now

export default router;
