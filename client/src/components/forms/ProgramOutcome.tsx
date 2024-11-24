import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Checkbox,
  Radio,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { postData } from '../../util/api';

export default function ProgramOutcome() {
  enum YouthEnrollmentStructure {
    Staggered = 'Staggered',
    Single = 'Single',
    Both = 'Both',
  }
  type FormState = {
    emailAddress: string;
    shareSurvey: boolean;
    organizationName: string;
    responderName: string;
    responderTitle: string;
    programCostPerTrainee: number;
    programDesignedForYouthAndAdults: boolean;
    youthTrained?: number;
    youthProgramRetentionRate?: number;
    youthPositiveOutcomes?: number;
    youthWage?: number;
    youthJobRetentionThreeMonths?: number;
    youthJobRetentionSixMonths?: number;
    youthJobRetentionTwelveMonths?: number;
    youthJobRetentionTwentyFourMonths?: number;
    youthProgramWeeks?: number;
    youthProgramHours?: number;
    youthEnrollmentStructure?: YouthEnrollmentStructure;
    youthCompensation?: 'Hourly' | 'Stipend' | 'None';
    youthTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period';
    youthGraduatedDefinition?:
      | 'All weeks of program'
      | 'Early exit for employment allowed'
      | 'Other';
    youthOutcomesMeasure?: (
      | 'High School Graduation'
      | 'Return to School'
      | 'Family Reunification'
      | 'Non-Recidivism'
      | 'Stable Housing'
      | 'Other'
    )[];
    programsThatServeAdults: boolean;
    adultsTrained?: number;
    adultsGraduated?: number;
    adultPositiveOutcome?: number;
    adultJobPlacement?: number;
    adultWage?: number;
    adultJobRetentionThreeMonths?: number;
    adultJobRetentionSixMonths?: number;
    adultWageAtSixMonths?: number;
    adultJobRetentionTwelveMonths?: number;
    adultWageAtTwelveMonths?: number;
    adultJobRetentionTwentyFourMonths?: number;
    adultWageTwentyFourMonths?: number;
    adultProgramWeeks?: number;
    adultProgramHours?: number;
    adultEnrollmentStructure?: 'Single Cohort' | 'Staggered';
    adultCompensation?: 'Hourly' | 'Stipend' | 'None';
    adultTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period'
      | 'Other';
    traineeAge?: number;
    traineePercentFemale?: number;
    traineePercentMale?: number;
    traineePercentNonBinary?: number;
    traineePercentTransgender?: number;
    traineePercentAmericanIndian?: number;
    traineePercentAsianOrAsianAmerican?: number;
    traineePercentBlackOrAfricanAmerican?: number;
    traineePercentLatinaLatinoLatinx?: number;
    traineePercentNativeHawaiianPacificIslander?: number;
    traineeMultiracial?: number;
    traineeWhite?: number;
    traineeOtherRace?: number;
    traineeRaceUnknown?: number;
    barrierReturningCitizensOrFormerlyIncarceratedPersons?: number;
    barrierPhysicalDisability?: number;
    barrierIntellectualOrDevelopmentalDisability?: number;
    barrierUnhoused?: number;
    barrierMentalHealth?: number;
    barrierNewAmericans?: number;
    barrierInRecovery?: number;
    barrierVeteran?: number;
    wrapAroundServicesHousing?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesLifeSkillsOrSocialEmotionalLearning?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesCaseManagement?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesJobSearchAndPlacement?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesRecoveryTreatment?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesMentalHealthServices?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesHealthcareAllOther?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesChildcare?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    wrapAroundServicesTransportation?:
      | 'You mostly facilitate access through partner agency'
      | 'You mostly provide in-house'
      | 'Your program does not provide or facilitate access';
    otherPleaseSpecifyOtherWrapAroundServices?: string;
    fundingPercentFromPublicFunding?: number;
    fundingPercentFromPrivateFunding?: number;
    fundingPercentFromSocialEnterpriseOrGeneratedRevenue?: number;
    SNAPEAndT?: 'Yes' | 'No But' | 'No And';
    WIOA?: 'Yes' | 'No But' | 'No And';
    curriculum?: 'All' | 'Part';
    programCertifications?:
      | 'ACF Quality/Approved Program'
      | 'DOL approved apprenticeship'
      | 'State Association apprenticeship'
      | 'Local or State Dept. of Education or Community College'
      | 'Other';
    otherProgramCertifications?: string;
    participantCertifications?:
      | 'Basic Food Safety'
      | 'Advanced Food Safety'
      | 'Credit toward Comm College'
      | 'ACF Certification'
      | 'NRA'
      | 'AHLEI'
      | 'Other';
    otherParticipantCertifications?: string;
    internshipOrExternship?: boolean;
    internshipOrExternshipDescription?: string;
    minimumWage?: number;
    jobType?: '1-25%' | '26-50%' | '51-75%' | '76-100%';
    jobCategory?:
      | 'Food Service: restaurant, cafe'
      | 'Food Service: institutional'
      | 'Food Service: grocery'
      | 'Customer Service and Retail'
      | 'Transportation & warehousing'
      | 'Healthcare & social assistance'
      | 'Safety & maintenance'
      | 'Construction'
      | 'Other';
    alumniHiredByOrg?: number;
  };
  const noState: FormState = {
    emailAddress: '',
    shareSurvey: false,
    organizationName: '',
    responderName: '',
    responderTitle: '',
    programCostPerTrainee: 0,
    programDesignedForYouthAndAdults: false,
    youthTrained: undefined,
    youthProgramRetentionRate: undefined,
    youthPositiveOutcomes: undefined,
    youthWage: undefined,
    youthJobRetentionThreeMonths: undefined,
    youthJobRetentionSixMonths: undefined,
    youthJobRetentionTwelveMonths: undefined,
    youthJobRetentionTwentyFourMonths: undefined,
    youthProgramWeeks: undefined,
    youthProgramHours: undefined,
    youthEnrollmentStructure: undefined,
    youthCompensation: undefined,
    youthTrainedDefinition: undefined,
    youthGraduatedDefinition: undefined,
    youthOutcomesMeasure: undefined,
    programsThatServeAdults: false,
    adultsTrained: undefined,
    adultsGraduated: undefined,
    adultPositiveOutcome: undefined,
    adultJobPlacement: undefined,
    adultWage: undefined,
    adultJobRetentionThreeMonths: undefined,
    adultJobRetentionSixMonths: undefined,
    adultWageAtSixMonths: undefined,
    adultJobRetentionTwelveMonths: undefined,
    adultWageAtTwelveMonths: undefined,
    adultJobRetentionTwentyFourMonths: undefined,
    adultWageTwentyFourMonths: undefined,
    adultProgramWeeks: undefined,
    adultProgramHours: undefined,
    adultEnrollmentStructure: undefined,
    adultCompensation: undefined,
    adultTrainedDefinition: undefined,
    traineeAge: undefined,
    traineePercentFemale: undefined,
    traineePercentMale: undefined,
    traineePercentNonBinary: undefined,
    traineePercentTransgender: undefined,
    traineePercentAmericanIndian: undefined,
    traineePercentAsianOrAsianAmerican: undefined,
    traineePercentBlackOrAfricanAmerican: undefined,
    traineePercentLatinaLatinoLatinx: undefined,
    traineePercentNativeHawaiianPacificIslander: undefined,
    traineeMultiracial: undefined,
    traineeWhite: undefined,
    traineeOtherRace: undefined,
    traineeRaceUnknown: undefined,
    barrierReturningCitizensOrFormerlyIncarceratedPersons: undefined,
    barrierPhysicalDisability: undefined,
    barrierIntellectualOrDevelopmentalDisability: undefined,
    barrierUnhoused: undefined,
    barrierMentalHealth: undefined,
    barrierNewAmericans: undefined,
    barrierInRecovery: undefined,
    barrierVeteran: undefined,
    wrapAroundServicesHousing: undefined,
    wrapAroundServicesLifeSkillsOrSocialEmotionalLearning: undefined,
    wrapAroundServicesCaseManagement: undefined,
    wrapAroundServicesJobSearchAndPlacement: undefined,
    wrapAroundServicesRecoveryTreatment: undefined,
    wrapAroundServicesMentalHealthServices: undefined,
    wrapAroundServicesHealthcareAllOther: undefined,
    wrapAroundServicesChildcare: undefined,
    wrapAroundServicesTransportation: undefined,
    otherPleaseSpecifyOtherWrapAroundServices: '',
    fundingPercentFromPublicFunding: undefined,
    fundingPercentFromPrivateFunding: undefined,
    fundingPercentFromSocialEnterpriseOrGeneratedRevenue: undefined,
    SNAPEAndT: undefined,
    WIOA: undefined,
    curriculum: undefined,
    programCertifications: undefined,
    otherProgramCertifications: '',
    participantCertifications: undefined,
    otherParticipantCertifications: '',
    internshipOrExternship: false,
    internshipOrExternshipDescription: '',
    minimumWage: undefined,
    jobType: undefined,
    jobCategory: undefined,
    alumniHiredByOrg: undefined,
  };
  const [formState, setFormState] = React.useState<FormState>(noState);
  const validateInputs = () => {
    // Add validation logic here:
    // ex:
    // const { adultProgram, minimumWage, jobTypeFoodService } = formState;
    // if (!adultProgram || !minimumWage || !jobTypeFoodService) {
    //   return false;
    // }

    return true;
  };
  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        const formData = {
          ...formState,
          youthOutcomesMeasure:
            formState.youthOutcomesMeasure?.join(', ') || '',
        };

        const response = await postData('program_outcomes/', formData);
        console.log('Program outcome submitted successfully:', response);
        // Handle success (e.g., show a success message, reset form, etc.)
      } catch (error) {
        console.error('Error submitting program outcome:', error);
        // Handle error (e.g., show an error message)
      }
    } else {
      console.error('Validation failed: Please fill out all required fields.');
      // Handle validation failure (e.g., show a validation error message)
    }
  };
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Submit Program Outcomes</h1>
      <p>
        Thank you for sharing your Program and Kitchen outcomes. This year we
        have split the survey into two forms.{' '}
        <b>This is the Programs Outcomes Survey.</b> Here we ask about the
        structure of your foodservice training programs, details about the
        people who participate in them, and your program outcomes.
        <br />
        <br />
        <b>
          There is a separate survey for kitchen details including your hunger
          relief efforts:{' '}
          <Link to="/kitchen-outcome-test">Kitchen Outcomes Survey</Link>.
        </b>
        <br />
        <br />
        <b>Collecting outcomes enables our collective fundraising</b>
        <br />
        Submitting annual outcomes keeps you in good standing as a member of the
        network so that when we receive those major funds, your organization
        will be included as we distribute that support across the country.
        <br />
        <br />
        <b>
          Calendar year data for the current year is preferred but not required
        </b>
        <br />
        Please submit data for the current calendar year if you are able. If you
        operate on non-calendar operating years, and calendar year data is
        difficult to produce, you may submit your most recent 12 months of
        complete data.
        <br />
        <br />
        This survey has the following parts:
        <ol>
          <li>Organization & Responder Details</li>
          <li>
            Youth & Young Adult Specific Programs (16-24): Outcomes & Program
            Structure
          </li>
          <li>Adult Programs (18+): Outcomes & Program Structure</li>
          <li>Trainee Demographics & Wrap Around Services</li>
          <li>Training Program Funding</li>
          <li>General Program Questions</li>
        </ol>
        Feel free to contact us at{' '}
        <a href="info@catalystkitchens.org">info@catalystkitchens.org</a> if you
        have any questions or other issues with the survey.
        <br />
        <br />
        NOTE: The language used in the survey often mirrors language from census
        categories and government definitions. If there is preferred language or
        terminology we should use when referring to your program and clients,
        please let us know by emailing{' '}
        <a href="info@catalystkitchens.org">info@catalystkitchens.org</a>. All
        comments are welcome.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-email"
          onChange={(e) =>
            setFormState({ ...formState, emailAddress: e.target.value })
          }
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <h3>Organization Name & Details</h3>
      <Box mb={2}>
        <h4>Share Survey</h4>
        Are you open to sharing your outcomes data with other members? We will
        be preparing a number of reports from this data that will allow members
        to benchmark their performance relative to their peers in the network.
        While we encourage everyone to select the checkbox, if you do not select
        the checkbox we will only include your data in aggregated reporting. It
        may also affect your ability to access the Program Benchmark Report and
        funds raised based on collective impact reports.
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.shareSurvey}
              onChange={(e) =>
                setFormState({ ...formState, shareSurvey: e.target.checked })
              }
            />
          }
          label="Share Survey"
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-organization-name"
          onChange={(e) =>
            setFormState({ ...formState, organizationName: e.target.value })
          }
          label="Organization Name"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-responder-name"
          onChange={(e) =>
            setFormState({ ...formState, responderName: e.target.value })
          }
          label="Responder Name"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-responder-title"
          onChange={(e) =>
            setFormState({ ...formState, responderTitle: e.target.value })
          }
          label="Responder Title"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <h4>Program Costs per Trainee</h4>
        Estimated total cost per individual <b>completing</b> your culinary
        training programs. To calculate this figure divide gross program
        expenses by the number of students completing your program(s). Include
        only those enterprise expenses that have been allocated to training
        costs.
        <br />
        <br />
        <TextField
          id="outlined-program-cost-per-trainee"
          type="number"
          onChange={(e) =>
            setFormState({
              ...formState,
              programCostPerTrainee: Number(e.target.value),
            })
          }
          label="Program Cost Per Trainee"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <h3>Programs: Youth and Young Adults (16-24)</h3>
      <p>
        In this section we will collect outcomes data for foodservice training
        programs specifically serving Youth and Young Adults (typically ages
        16-24).
      </p>
      <Box mb={2}>
        <h4>
          Do you have a program specifically designed for and serving Youth and
          Young Adults?
        </h4>
        Do you have a program specifically designed for and serving Youth and
        Young Adults (typically ages 16-24)? Outcomes from Adult Programs will
        be covered in a separate section to follow. If you only train young
        people aged 18+ as part of a program open to all adults, you should
        answer NO here and report those outcomes in the Adult Programs section.
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.programDesignedForYouthAndAdults}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  programDesignedForYouthAndAdults: e.target.checked,
                })
              }
            />
          }
          label="Has Youth Program"
        />
      </Box>
      {formState.programDesignedForYouthAndAdults && (
        <div id="youthProgramFields">
          <Box mb={2}>
            <h4>Youth: Trained</h4>
            Total # of youth who participated in foodservice job training
            programming in 2023 or during the most recent 12-month period for
            which you have complete data. This is the{' '}
            <b>total number enrolled</b> in all your youth specific programs.
            <br />
            <br />
            <TextField
              id="outlined-youth-trained"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthTrained: Number(e.target.value),
                })
              }
              label="Youth Trained"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Program Retention Rate</h4>
            <b>Percentage</b> of enrolled youth graduating from (completing)
            foodservice job training programs. Use the most recent 12-month
            period for which you have data, and enter the rate at which this
            occurs, i.e. 74 for 74%.
            <br />
            <br />
            <TextField
              id="outlined-youth-program-retention-rate"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramRetentionRate: Number(e.target.value),
                })
              }
              label="Youth Program Retention Rate"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Positive Outcomes (job placement and/or education)</h4>
            The <b>percentage</b> of youth program <b>graduates</b> who find
            employment or are in education or training activities after
            completion of the program. Use the most recent 12-month period for
            which you have data, and enter the rate at which this occurs, i.e.
            74 for 74%.
            <br />
            <br />
            <TextField
              id="outlined-youth-positive-outcomes"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthPositiveOutcomes: Number(e.target.value),
                })
              }
              label="Youth Positive Outcomes"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Wage</h4>
            Average starting hourly wage ($/hour) of trainees gaining employment
            who completed the program. Use the most recent 12-month period for
            which you have data.
            <br />
            <br />
            <TextField
              id="outlined-youth-wage"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthWage: Number(e.target.value),
                })
              }
              label="Youth Wage"
              variant="outlined"
              fullWidth
            />
          </Box>
          <h4>Employment retention: Youth</h4>
          Percent of all Youth Program graduates who found employment and
          remained employed for 3/6/12 months past original job start date. Job
          held at each stage does not need to be with the same employer.
          <br />
          <br />
          Use the average rate for the most recent 12 months of complete data.
          <br />
          <br />
          <b>
            Leave blank if you do not track for the time period in question.
          </b>
          <Box mb={2}>
            <h4>Youth: Job Retention 3 Months</h4>
            Please enter the % of youth program graduates who were still
            employed 3 months after placement.
            <br />
            <br />
            <TextField
              id="outlined-youth-job-retention-3-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetentionThreeMonths: Number(e.target.value),
                })
              }
              label="Youth Job Retention (3 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Job Retention 6 Months</h4>
            Please enter the % of youth program graduates who were still
            employed 6 months after placement.
            <br />
            <br />
            <TextField
              id="outlined-youth-job-retention-6-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetentionSixMonths: Number(e.target.value),
                })
              }
              label="Youth Job Retention (6 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Job Retention 12 Months/1 Year</h4>
            Please enter the % of youth program graduates who were still
            employed 12 months after placement.
            <br />
            <br />
            <TextField
              id="outlined-youth-job-retention-12-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetentionTwelveMonths: Number(e.target.value),
                })
              }
              label="Youth Job Retention (12 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth: Job Retention 2 Years</h4>
            Please enter the % of youth program graduates who were still
            employed 2 years after placement.
            <br />
            <br />
            <TextField
              id="outlined-youth-job-retention-2-years"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetentionTwentyFourMonths: Number(e.target.value),
                })
              }
              label="Youth Job Retention (2 Years)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <h4>PROGRAM STRUCTURE: Youth and Young Adult Programs</h4>
          <Box mb={2}>
            <h4>Youth program (weeks)</h4>
            Please enter the total length of the program in weeks. If you have
            multiple youth programs, please enter number for your
            primary/largest program
            <br />
            <br />
            <TextField
              id="outlined-youth-program-weeks"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramWeeks: Number(e.target.value),
                })
              }
              label="Youth Program Weeks"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <h4>Youth program (hours)</h4>
            Please enter the total length of the program in hours. If you have
            multiple youth programs, please enter hours for your primary/largest
            program
            <br />
            <br />
            <TextField
              id="outlined-youth-program-hours"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramHours: Number(e.target.value),
                })
              }
              label="Youth Program Hours"
              variant="outlined"
              fullWidth
            />
          </Box>
          {/* Youth Enrollment Structure */}
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="youth-enrollment-structure-label">
                Youth Enrollment Structure
              </InputLabel>
              <Select
                labelId="youth-enrollment-structure-label"
                value={formState.youthEnrollmentStructure || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthEnrollmentStructure: e.target
                      .value as YouthEnrollmentStructure,
                  });
                }}
                label="Youth Enrollment Structure"
              >
                <MenuItem value={YouthEnrollmentStructure.Staggered}>
                  Single Cohort admission (training program resets with each new
                  group of students)
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Single}>
                  Single Cohort admission (training program resets with each new
                  group of students)
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Both}>Both</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Youth Compensation */}
          <Box mb={2}>
            <h4>Youth Compensation</h4>
            How do you provide direct financial support to students? If it
            changes throughout your program, please check all that apply.
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="youth-compensation-label">
                Youth Compensation
              </InputLabel>
              <Select
                labelId="youth-compensation-label"
                value={formState.youthCompensation || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    youthCompensation: e.target.value as
                      | 'Hourly'
                      | 'Stipend'
                      | 'None'
                      | undefined,
                  })
                }
                label="Youth Compensation"
              >
                <MenuItem value="Hourly">Hourly - Minimum Wage</MenuItem>
                <MenuItem value="Stipend">
                  Stipend - fixed or variable cash disbursement
                </MenuItem>
                <MenuItem value="None">
                  No Direct Monetary Compensation
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <h4>Youth: Trained definition</h4>
            How do you define <b>enrolled</b> in your youth program? Select the
            option below that best describes your methodology for counting
            number of enrollees.{' '}
            <b>To count as enrolled a student must complete:</b>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="youth-trained-definition-label">
                Youth Trained Definition
              </InputLabel>
              <Select
                labelId="youth-trained-definition-label"
                value={formState.youthTrainedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthTrainedDefinition: e.target
                      .value as keyof (typeof formState)['youthTrainedDefinition'],
                  });
                }}
                label="Youth Trained Definition"
              >
                <MenuItem value="The first day of program">
                  The first day of program
                </MenuItem>
                <MenuItem value="2-4 day provisional period">
                  2-4 day provisional period
                </MenuItem>
                <MenuItem value="One week provisional period">
                  One week provisional period
                </MenuItem>
                <MenuItem value="Two week provisional period">
                  Two week provisional period
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <h4>Youth: Graduated definition</h4>
            How do you define <b>graduated</b> in your youth program? Select the
            option below that best describes your methodology for counting
            number of graduates.{' '}
            <b>To count as graduated a student must complete:</b>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="youth-graduated-definition-label">
                Youth Graduated Definition
              </InputLabel>
              <Select
                labelId="youth-graduated-definition-label"
                value={formState.youthGraduatedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthGraduatedDefinition: e.target
                      .value as keyof (typeof formState)['youthGraduatedDefinition'],
                  });
                }}
                label="Youth Graduated Definition"
              >
                <MenuItem value="All weeks of program">
                  All weeks of program
                </MenuItem>
                <MenuItem value="Early exit for employment allowed">
                  Early exit for employment allowed
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            How do you measure successful youth outcomes? Check all that you
            actively track.
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="measure-youth-outcomes-label">
                Measure Youth Outcomes
              </InputLabel>
              <Select
                labelId="measure-youth-outcomes-label"
                multiple
                value={formState.youthOutcomesMeasure || []}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthOutcomesMeasure: e.target.value as Array<
                      keyof (typeof formState)['youthOutcomesMeasure']
                    >,
                  });
                }}
                renderValue={(selected) => selected.join(', ')}
                label="Measure Youth Outcomes"
              >
                <MenuItem value="High School Graduation">
                  High School Graduation
                </MenuItem>
                <MenuItem value="Return to School">Return to School</MenuItem>
                <MenuItem value="Family Reunification">
                  Family Reunification
                </MenuItem>
                <MenuItem value="Non-Recidivism">Non-Recidivism</MenuItem>
                <MenuItem value="Stable Housing">Stable Housing</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
      <h3>Programs: Adults</h3>
      <p>
        This section is for reporting on Adult Training Programs. Please do not
        include data reported in the previous Youth Outcomes section where you
        may have reported on youth specific training programs.
      </p>
      <Box mb={2}>
        <h4>Do you have a program(s) that serve Adults (18+)?</h4>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.programsThatServeAdults}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  programsThatServeAdults: e.target.checked,
                });
              }}
            />
          }
          label="Adult Program"
        />
      </Box>
      {formState.programsThatServeAdults && (
        <div id="adultProgramFields">
          <h3>PROGRAM OUTCOMES: Programs Serving Adults (18+)</h3>
          <p>
            If you have multiple adult programs, please combine those outcomes
            for the following questions.
          </p>
          <Box mb={2}>
            <h4>Adults: Trained</h4>
            Total # of adults who participated in foodservice job training
            programming during the most recent 12-month period for which you
            have data. This is <b>the total number enrolled</b> in all your
            adult programs.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Trained"
              value={formState.adultsTrained || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsTrained: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adults: Graduated</h4>
            <b>Percentage</b> of enrolled adults graduating from (completing)
            culinary training programs. Use the most recent 12-month period for
            which you have data, and enter the rate at which this occurs, i.e.
            74 for 74%.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Graduated"
              value={formState.adultsGraduated || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsGraduated: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>
              Adults: Positive Outcome (Job Placement or Entrepreneurship)
            </h4>
            The <b>percentage</b> of adult program graduates who find employment
            or started their own business after completion of the program. Use
            the most recent 12-month period for which you have data, and enter
            the rate at which this occurs, i.e. 74 for 74%.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Positive Outcome"
              value={formState.adultPositiveOutcome || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultPositiveOutcome: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adults: Job Placement (graduates)</h4>
            Provide the % of adults that obtained employment{' '}
            <b>following program completion</b>. Please include only trainees
            that completed the program. Use the most recent 12-month period for
            which you have data, and enter the rate at which this occurs, i.e.
            74 for 74%.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Job Placement Graduates"
              value={formState.adultJobPlacement || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultJobPlacement: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adults: Wage</h4>
            Average starting hourly wage ($/hour) of adult program trainees who
            find employment after completing the program. Use the most recent
            12-month period for which you have data.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Wage"
              value={formState.adultWage || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultWage: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <h4>Employment retention: Adults</h4>
          Percent of all Adult Program graduates who found employment and
          remained employed for 3/6/12 months past original job start date.
          <br />
          <br />
          Percent of all Adult Program graduates who found employment and
          remained employed for 3/6/12 months past original job start date.
          <br />
          <br />
          <b>
            Leave blank if you do not track for the time period in question.
          </b>
          <br />
          <br />
          <Box mb={2}>
            <h4>Adult: Job Retention 3 Months</h4>
            Please enter the % of adult program graduates who were still
            employed 3 months after placement.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (3 Months)"
              value={formState.adultJobRetentionThreeMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultJobRetentionThreeMonths: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Retention 6 Months</h4>
            Please enter the % of adult program graduates who were still
            employed 6 months after placement.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (6 Months)"
              value={formState.adultJobRetentionSixMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultJobRetentionSixMonths: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Wage 6 Months</h4>
            What was the average wage ($/hour) of those still employed 6 months
            after placement?
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (6 Months)"
              value={formState.adultWageAtSixMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultWageAtSixMonths: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Retention 12 Months</h4>
            Please enter the % of adult program graduates who were still
            employed 12 months after placement.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (12 Months)"
              value={formState.adultJobRetentionTwelveMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultJobRetentionTwelveMonths: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Wage 12 Months</h4>
            What was the average wage ($/hour) of those still employed 12 months
            after placement?
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (12 Months)"
              value={formState.adultWageAtTwelveMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultWageAtTwelveMonths: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Retention 24 Months</h4>
            Please enter the % of adult program graduates who were still
            employed 24 months after placement.
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (24 Months)"
              value={formState.adultJobRetentionTwentyFourMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultJobRetentionTwentyFourMonths: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <h4>Adult: Job Wage 24 Months</h4>
            What was the average wage ($/hour) of those still employed 24 months
            after placement?
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (24 Months)"
              value={formState.adultWageTwentyFourMonths || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultWageTwentyFourMonths: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <h4>PROGRAM STRUCTURE: Programs Serving Adults (18+)</h4>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adult Program Weeks"
              value={formState.adultProgramWeeks || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultProgramWeeks: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adult Program Hours"
              value={formState.adultProgramHours || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultProgramHours: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adults-enrollment-structure-label">
                Adults Enrollment Structure
              </InputLabel>
              <Select
                labelId="adults-enrollment-structure-label"
                value={formState.adultEnrollmentStructure || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultEnrollmentStructure: e.target.value as
                      | 'Single Cohort'
                      | 'Staggered'
                      | undefined,
                  });
                }}
                label="Adults Enrollment Structure"
              >
                <MenuItem value="Single Cohort">Single Cohort</MenuItem>
                <MenuItem value="Staggered">Staggered</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adults-compensation-label">
                Adults Compensation
              </InputLabel>
              <Select
                labelId="adults-compensation-label"
                value={formState.adultCompensation || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultCompensation: e.target.value as
                      | 'Hourly'
                      | 'Stipend'
                      | 'None',
                  });
                }}
                label="Adults Compensation"
              >
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Stipend">Stipend</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adult-trained-definition-label">
                Adult Trained Definition
              </InputLabel>
              <Select
                labelId="adult-trained-definition-label"
                value={formState.adultTrainedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultTrainedDefinition: e.target.value as
                      | 'The first day of program'
                      | '2-4 day provisional period'
                      | 'One week provisional period'
                      | 'Two week provisional period'
                      | 'Other'
                      | undefined,
                  });
                }}
                label="Adult Trained Definition"
              >
                <MenuItem value="The first day of program">
                  The first day of program
                </MenuItem>
                <MenuItem value="2-4 day provisional period">
                  2-4 day provisional period
                </MenuItem>
                <MenuItem value="One week provisional period">
                  One week provisional period
                </MenuItem>
                <MenuItem value="Two week provisional period">
                  Two week provisional period
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Age"
          value={formState.traineeAge || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineeAge: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Female"
          value={formState.traineePercentFemale || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentFemale: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Male"
          value={formState.traineePercentMale || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentMale: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Non-Binary"
          value={formState.traineePercentNonBinary || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentNonBinary: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Transgender"
          value={formState.traineePercentTransgender || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentTransgender: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent American Indian"
          value={formState.traineePercentAmericanIndian || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentAmericanIndian: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Asian"
          value={formState.traineePercentAsianOrAsianAmerican || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentAsianOrAsianAmerican: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Black"
          value={formState.traineePercentBlackOrAfricanAmerican || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentBlackOrAfricanAmerican: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Latinx"
          value={formState.traineePercentLatinaLatinoLatinx || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentLatinaLatinoLatinx: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Native Hawaiian"
          value={formState.traineePercentNativeHawaiianPacificIslander || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineePercentNativeHawaiianPacificIslander: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Multi-Racial"
          value={formState.traineeMultiracial || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineeMultiracial: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent White"
          value={formState.traineeWhite || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineeWhite: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Other Race"
          value={formState.traineeOtherRace || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineeOtherRace: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Race Unknown"
          value={formState.traineeRaceUnknown || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineeRaceUnknown: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Returning Citizens"
          value={
            formState.barrierReturningCitizensOrFormerlyIncarceratedPersons ||
            ''
          }
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierReturningCitizensOrFormerlyIncarceratedPersons: e.target
                .value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Physical Disability"
          value={formState.barrierPhysicalDisability || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierPhysicalDisability: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barriers for Neurodiverse Individuals"
          value={formState.barrierIntellectualOrDevelopmentalDisability || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierIntellectualOrDevelopmentalDisability: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Unhoused"
          value={formState.barrierUnhoused || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierUnhoused: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Mental Health"
          value={formState.barrierMentalHealth || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierMentalHealth: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier New Americans"
          value={formState.barrierNewAmericans || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierNewAmericans: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier In Recovery"
          value={formState.barrierInRecovery || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierInRecovery: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Veteran"
          value={formState.barrierVeteran || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierVeteran: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>
      {/* wrapAroundHousing?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundLifeSkills?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundCaseManagement?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundJobSearch?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundRecoveryTreatment?:
      | 'Partner agency'
      | 'In-house'
      | 'Not provided';
    wrapAroundMentalHealthServices?:
      | 'Partner agency'
      | 'In-house'
      | 'Not provided'; */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Housing</InputLabel>
          <Select
            name="wrapAroundHousing"
            value={formState.wrapAroundServicesHousing}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesHousing: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Lifeskills</InputLabel>
          <Select
            name="wrapAroundLifeSkills"
            value={
              formState.wrapAroundServicesLifeSkillsOrSocialEmotionalLearning
            }
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesLifeSkillsOrSocialEmotionalLearning: e.target
                  .value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Case Management</InputLabel>
          <Select
            name="wrapAroundCaseManagement"
            value={formState.wrapAroundServicesCaseManagement}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesCaseManagement: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Job Search</InputLabel>
          <Select
            name="wrapAroundJobSearch"
            value={formState.wrapAroundServicesJobSearchAndPlacement}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesJobSearchAndPlacement: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wrap Around Recovery Treatment</InputLabel>
          <Select
            name="wrapAroundRecoveryTreatment"
            value={formState.wrapAroundServicesRecoveryTreatment}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesRecoveryTreatment: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wrap Around Mental Health Services</InputLabel>
          <Select
            name="wrapAroundMentalHealthServices"
            value={formState.wrapAroundServicesMentalHealthServices}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesMentalHealthServices: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Healthcare</InputLabel>
          <Select
            name="wrapAroundHealthcare"
            value={formState.wrapAroundServicesHealthcareAllOther}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesHealthcareAllOther: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Childcare</InputLabel>
          <Select
            name="wrapAroundChildcare"
            value={formState.wrapAroundServicesChildcare}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesChildcare: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Transportation</InputLabel>
          <Select
            name="wrapAroundTransportation"
            value={formState.wrapAroundServicesTransportation}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundServicesTransportation: e.target.value as
                  | 'You mostly facilitate access through partner agency'
                  | 'You mostly provide in-house'
                  | 'Your program does not provide or facilitate access',
              })
            }
          >
            <MenuItem value="You mostly facilitate access through partner agency">
              Partner agency
            </MenuItem>
            <MenuItem value="You mostly provide in-house">In-house</MenuItem>
            <MenuItem value="Your program does not provide or facilitate access">
              Not provided
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Other Wraparound Services"
          value={formState.otherPleaseSpecifyOtherWrapAroundServices}
          onChange={(e) =>
            setFormState({
              ...formState,
              otherPleaseSpecifyOtherWrapAroundServices: e.target.value,
            })
          }
          fullWidth
        />
      </Box>
      {/* Funding Fields */}
      <Box mb={2}>
        <TextField
          label="Public Funding"
          type="number"
          value={formState.fundingPercentFromPublicFunding}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingPercentFromPublicFunding: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Private Funding"
          type="number"
          value={formState.fundingPercentFromPrivateFunding}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingPercentFromPrivateFunding: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Social Enterprise Funding"
          type="number"
          value={formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingPercentFromSocialEnterpriseOrGeneratedRevenue: Number(
                e.target.value,
              ),
            })
          }
          fullWidth
        />
      </Box>
      {/* SNAP E&T and WIOA */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>SNAP E&T</InputLabel>
          <Select
            name="snapET"
            value={formState.SNAPEAndT}
            onChange={(e) =>
              setFormState({
                ...formState,
                SNAPEAndT: e.target.value as 'Yes' | 'No But' | 'No And',
              })
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No But">No But</MenuItem>
            <MenuItem value="No And">No And</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>WIOA</InputLabel>
          <Select
            name="wioa"
            value={formState.WIOA}
            onChange={(e) =>
              setFormState({
                ...formState,
                WIOA: e.target.value as 'Yes' | 'No But' | 'No And' | undefined,
              })
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No But">No But</MenuItem>
            <MenuItem value="No And">No And</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Curriculum */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Curriculum</InputLabel>
          <Select
            name="curriculum"
            value={formState.curriculum}
            onChange={(e) =>
              setFormState({
                ...formState,
                curriculum: e.target.value as 'All' | 'Part' | undefined,
              })
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Part">Part</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Internship/Externship */}
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="internshipOrExternship"
              checked={formState.internshipOrExternship}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  internshipOrExternship: e.target.checked,
                })
              }
            />
          }
          label="Internship or Externship"
        />
      </Box>
      {formState.internshipOrExternship && (
        <div id="internshipOrExternship">
          <Box mb={2}>
            <TextField
              label="Internship Description"
              value={formState.internshipOrExternshipDescription}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  internshipOrExternshipDescription: e.target.value,
                })
              }
              fullWidth
              disabled={!formState.internshipOrExternship}
            />
          </Box>
        </div>
      )}
      {/* Other Fields */}
      <Box mb={2}>
        <TextField
          label="Minimum Wage 2023"
          type="number"
          value={formState.minimumWage}
          onChange={(e) =>
            setFormState({
              ...formState,
              minimumWage: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Job Type in Food Service</InputLabel>
          <Select
            name="jobTypeFoodService"
            value={formState.jobType}
            onChange={(e) =>
              setFormState({
                ...formState,
                jobType: e.target.value as
                  | '1-25%'
                  | '26-50%'
                  | '51-75%'
                  | '76-100%',
              })
            }
          >
            <MenuItem value="1-25%">1-25%</MenuItem>
            <MenuItem value="26-50%">26-50%</MenuItem>
            <MenuItem value="51-75%">51-75%</MenuItem>
            <MenuItem value="76-100%">76-100%</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Alumni Hired By Organization"
          type="number"
          value={formState.alumniHiredByOrg}
          onChange={(e) =>
            setFormState({
              ...formState,
              alumniHiredByOrg: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
