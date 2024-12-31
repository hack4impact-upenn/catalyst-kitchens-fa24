import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
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
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postData } from '../util/api';
import { RootState } from '../util/redux/store';

export default function ProgramOutcome() {
  const PROGRAM_CERTIFICATIONS = [
    'ACF Quality/Approved Program',
    'DOL approved apprenticeship',
    'DOL approved pre-apprenticeship',
    'State Association apprenticeship',
    'State Association pre-apprenticeship',
    'Local or State Dept. of Education or Community College',
    'Other',
  ];

  const PARTICIPANT_CERTIFICATIONS = [
    'Basic Food Safety (eg ServSafe Handler or similar)',
    'Advanced Food Safety (eg ServSafe Manager or similar)',
    'Credit toward Comm College',
    'ACF Certification (eg Fundamental Cook)',
    'NRA (eg Pro Start)',
    'AHLEI (eg Kitchen Cook, Guest Service Gold, Certified Guest Service Professional, etc.)',
    'Nutrition',
    'Allergen',
    'Customer Services',
    'Alcohol Services',
    'Non-foodservice certification (including CLA/CLT, CDL, NSC, etc)',
    'Other',
  ];

  const JOB_CATEGORIES = [
    'Food Service: Restaurant, Cafe',
    'Food Service: Institutional (Senior Living, Corporate Dining, etc.)',
    'Food Service: Grocery',
    'Customer Service and Retail',
    'Transportation & Warehousing',
    'Healthcare & Social Assistance',
    'Safety & Maintenance',
    'Construction',
    'Other',
  ];

  const user = useSelector((state: RootState) => state.user);
  enum YouthEnrollmentStructure {
    Staggered = 'Staggered',
    Single = 'Single',
    Other = 'Other',
  }
  type FormState = {
    emailAddress: string;
    orgId: string;
    year: Date;
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
    youthCompensation?: 'HourlyMin' | 'HourlyAboveMin' | 'Stipend' | 'None';
    youthTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period'
      | 'Other';
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
    adultEnrollmentStructure?: 'Single Cohort' | 'Staggered' | 'Other';
    adultCompensation?: 'HourlyMin' | 'HourlyAboveMin' | 'Stipend' | 'None';
    adultTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period'
      | 'Other';
    adultGraduatedDefinition?:
      | 'All weeks of program'
      | 'Early exit for employment allowed'
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
    SNAPEAndT?: 'Yes' | 'NoButInterested' | 'NoNotInterested' | 'NoRejected';
    WIOA?: 'Yes' | 'NoButInterested' | 'NoNotInterested' | 'NoRejected';
    curriculum?: 'All' | 'Part' | 'None';
    programCertifications: string[];
    otherProgramCertifications?: string;
    participantCertifications: string[];
    otherParticipantCertifications?: string;
    internshipOrExternship?: boolean;
    internshipOrExternshipDescription?: string;
    minimumWage?: number;
    jobType?: '1-25%' | '26-50%' | '51-75%' | '76-100%' | 'Not Tracked';
    jobCategory: string[];
    alumniHiredByOrg?: number;
  };
  const noState: FormState = {
    emailAddress: '',
    orgId: '',
    year: new Date(new Date().getFullYear()),
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
    adultGraduatedDefinition: undefined,
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
    programCertifications: [],
    otherProgramCertifications: '',
    participantCertifications: [],
    otherParticipantCertifications: '',
    internshipOrExternship: false,
    internshipOrExternshipDescription: '',
    minimumWage: undefined,
    jobType: undefined,
    jobCategory: [],
    alumniHiredByOrg: undefined,
  };
  const [formState, setFormState] = React.useState<FormState>(noState);
  useEffect(() => {
    const fetchOrganizationId = async () => {
      if (user.email) {
        try {
          axios
            .get(`http://localhost:4000/api/auth/organization/${user.email}`)
            .then((response) => {
              const { data } = response;
              setFormState({
                ...formState,
                orgId: data,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error('Error fetching organization ID:', error);
        }
      }
    };
    fetchOrganizationId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);
  useEffect(() => {
    const fetchOrganizationNameById = async () => {
      if (formState.orgId) {
        try {
          axios
            .get(
              `http://localhost:4000/api/organization/organization/name/${formState.orgId}`,
            )
            .then((response) => {
              const { data } = response;
              setFormState({
                ...formState,
                organizationName: data.organizationName,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error('Error fetching organization name by ID:', error);
        }
      }
    };
    fetchOrganizationNameById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.orgId]);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const validateInputs = () => {
    console.log('Validating inputs');
    let hasError = false;
    const allErrorMessages: string[] = [];
    if (
      formState.programCostPerTrainee !== undefined &&
      formState.programCostPerTrainee < 0
    ) {
      allErrorMessages.push(
        'Program Cost per Trainee must be a positive number.',
      );
      hasError = true;
    }
    if (
      formState.youthTrained !== undefined &&
      (formState.youthTrained < 0 || !Number.isInteger(formState.youthTrained))
    ) {
      allErrorMessages.push('Youth Trained must be a positive integer.');
      hasError = true;
    }
    if (
      formState.youthProgramRetentionRate !== undefined &&
      (formState.youthProgramRetentionRate < 0 ||
        formState.youthProgramRetentionRate > 100)
    ) {
      allErrorMessages.push(
        'Youth Program Retention Rate must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.youthPositiveOutcomes !== undefined &&
      (formState.youthPositiveOutcomes < 0 ||
        formState.youthPositiveOutcomes > 100)
    ) {
      allErrorMessages.push(
        'Youth Positive Outcomes must be between 0 and 100.',
      );
      hasError = true;
    }
    if (formState.youthWage !== undefined && formState.youthWage < 0) {
      allErrorMessages.push('Youth Wage must be a positive number.');
      hasError = true;
    }
    if (
      formState.youthJobRetentionThreeMonths !== undefined &&
      (formState.youthJobRetentionThreeMonths < 0 ||
        formState.youthJobRetentionThreeMonths > 100)
    ) {
      allErrorMessages.push(
        'Youth Job Retention at Three Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.youthJobRetentionSixMonths !== undefined &&
      (formState.youthJobRetentionSixMonths < 0 ||
        formState.youthJobRetentionSixMonths > 100)
    ) {
      allErrorMessages.push(
        'Youth Job Retention at Six Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.youthJobRetentionTwelveMonths !== undefined &&
      (formState.youthJobRetentionTwelveMonths < 0 ||
        formState.youthJobRetentionTwelveMonths > 100)
    ) {
      allErrorMessages.push(
        'Youth Job Retention at Twelve Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.youthJobRetentionTwentyFourMonths !== undefined &&
      (formState.youthJobRetentionTwentyFourMonths < 0 ||
        formState.youthJobRetentionTwentyFourMonths > 100)
    ) {
      allErrorMessages.push(
        'Youth Job Retention at Twenty Four Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.youthProgramWeeks !== undefined &&
      formState.youthProgramWeeks < 0
    ) {
      allErrorMessages.push('Youth Program Weeks must be a positive number.');
      hasError = true;
    }
    if (
      formState.youthProgramHours !== undefined &&
      formState.youthProgramHours < 0
    ) {
      allErrorMessages.push('Youth Program Hours must be a positive number.');
      hasError = true;
    }
    if (
      formState.adultsTrained !== undefined &&
      (formState.adultsTrained < 0 ||
        !Number.isInteger(formState.adultsTrained))
    ) {
      allErrorMessages.push('Adults Trained must be a positive integer.');
      hasError = true;
    }
    if (
      formState.adultsGraduated !== undefined &&
      (formState.adultsGraduated < 0 || formState.adultsGraduated > 100)
    ) {
      allErrorMessages.push('Adults Graduated must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.adultPositiveOutcome !== undefined &&
      (formState.adultPositiveOutcome < 0 ||
        formState.adultPositiveOutcome > 100)
    ) {
      allErrorMessages.push(
        'Adult Positive Outcomes must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.adultJobPlacement !== undefined &&
      (formState.adultJobPlacement < 0 || formState.adultJobPlacement > 100)
    ) {
      allErrorMessages.push('Adult Job Placement must be between 0 and 100.');
      hasError = true;
    }
    if (formState.adultWage !== undefined && formState.adultWage < 0) {
      allErrorMessages.push('Adult Wage must be a positive number.');
      hasError = true;
    }
    if (
      formState.adultJobRetentionThreeMonths !== undefined &&
      (formState.adultJobRetentionThreeMonths < 0 ||
        formState.adultJobRetentionThreeMonths > 100)
    ) {
      allErrorMessages.push(
        'Adult Job Retention at Three Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.adultJobRetentionSixMonths !== undefined &&
      (formState.adultJobRetentionSixMonths < 0 ||
        formState.adultJobRetentionSixMonths > 100)
    ) {
      allErrorMessages.push(
        'Adult Job Retention at Six Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.adultWageAtSixMonths !== undefined &&
      formState.adultWageAtSixMonths < 0
    ) {
      allErrorMessages.push(
        'Adult Wage at Six Months must be a positive number.',
      );
      hasError = true;
    }
    if (
      formState.adultJobRetentionTwelveMonths !== undefined &&
      (formState.adultJobRetentionTwelveMonths < 0 ||
        formState.adultJobRetentionTwelveMonths > 100)
    ) {
      allErrorMessages.push(
        'Adult Job Retention at Twelve Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.adultWageAtTwelveMonths !== undefined &&
      formState.adultWageAtTwelveMonths < 0
    ) {
      allErrorMessages.push(
        'Adult Wage at Twelve Months must be a positive number.',
      );
      hasError = true;
    }
    if (
      formState.adultJobRetentionTwentyFourMonths !== undefined &&
      (formState.adultJobRetentionTwentyFourMonths < 0 ||
        formState.adultJobRetentionTwentyFourMonths > 100)
    ) {
      allErrorMessages.push(
        'Adult Job Retention at Twenty Four Months must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.adultWageTwentyFourMonths !== undefined &&
      formState.adultWageTwentyFourMonths < 0
    ) {
      allErrorMessages.push(
        'Adult Wage at Twenty Four Months must be a positive number.',
      );
      hasError = true;
    }
    if (
      formState.adultProgramWeeks !== undefined &&
      formState.adultProgramWeeks < 0
    ) {
      allErrorMessages.push('Adult Program Weeks must be a positive number.');
      hasError = true;
    }
    if (
      formState.adultProgramHours !== undefined &&
      formState.adultProgramHours < 0
    ) {
      allErrorMessages.push('Adult Program Hours must be a positive number.');
      hasError = true;
    }
    if (
      formState.traineeAge !== undefined &&
      (formState.traineeAge < 0 || formState.traineeAge > 100)
    ) {
      allErrorMessages.push('Trainee Age must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.traineePercentFemale !== undefined &&
      (formState.traineePercentFemale < 0 ||
        formState.traineePercentFemale > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Female must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentMale !== undefined &&
      (formState.traineePercentMale < 0 || formState.traineePercentMale > 100)
    ) {
      allErrorMessages.push('Trainee Percent Male must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.traineePercentNonBinary !== undefined &&
      (formState.traineePercentNonBinary < 0 ||
        formState.traineePercentNonBinary > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Non-Binary must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentFemale !== undefined &&
      formState.traineePercentMale !== undefined &&
      formState.traineePercentNonBinary !== undefined &&
      formState.traineePercentFemale +
        formState.traineePercentMale +
        formState.traineePercentNonBinary !==
        100
    ) {
      allErrorMessages.push(
        'The sum of Trainee Percent Female, Trainee Percent Male, and Trainee Percent Non-Binary must must be 100',
      );
      hasError = true;
    }
    if (
      formState.traineePercentTransgender !== undefined &&
      (formState.traineePercentTransgender < 0 ||
        formState.traineePercentTransgender > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Transgender must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentAmericanIndian !== undefined &&
      (formState.traineePercentAmericanIndian < 0 ||
        formState.traineePercentAmericanIndian > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent American Indian must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentAsianOrAsianAmerican !== undefined &&
      (formState.traineePercentAsianOrAsianAmerican < 0 ||
        formState.traineePercentAsianOrAsianAmerican > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Asian or Asian American must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentBlackOrAfricanAmerican !== undefined &&
      (formState.traineePercentBlackOrAfricanAmerican < 0 ||
        formState.traineePercentBlackOrAfricanAmerican > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Black or African American must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentLatinaLatinoLatinx !== undefined &&
      (formState.traineePercentLatinaLatinoLatinx < 0 ||
        formState.traineePercentLatinaLatinoLatinx > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Latina, Latino, or Latinx must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentNativeHawaiianPacificIslander !== undefined &&
      (formState.traineePercentNativeHawaiianPacificIslander < 0 ||
        formState.traineePercentNativeHawaiianPacificIslander > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Native Hawaiian or Pacific Islander must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineeMultiracial !== undefined &&
      (formState.traineeMultiracial < 0 || formState.traineeMultiracial > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Multiracial must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineeWhite !== undefined &&
      (formState.traineeWhite < 0 || formState.traineeWhite > 100)
    ) {
      allErrorMessages.push('Trainee Percent White must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.traineeOtherRace !== undefined &&
      (formState.traineeOtherRace < 0 || formState.traineeOtherRace > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Other Race must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineeRaceUnknown !== undefined &&
      (formState.traineeRaceUnknown < 0 || formState.traineeRaceUnknown > 100)
    ) {
      allErrorMessages.push(
        'Trainee Percent Race Unknown must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.traineePercentAmericanIndian !== undefined &&
      formState.traineePercentBlackOrAfricanAmerican !== undefined &&
      formState.traineePercentAsianOrAsianAmerican !== undefined &&
      formState.traineePercentLatinaLatinoLatinx !== undefined &&
      formState.traineePercentNativeHawaiianPacificIslander !== undefined &&
      formState.traineeMultiracial !== undefined &&
      formState.traineeWhite !== undefined &&
      formState.traineeOtherRace !== undefined &&
      formState.traineeRaceUnknown !== undefined &&
      formState.traineePercentAmericanIndian +
        formState.traineePercentBlackOrAfricanAmerican +
        formState.traineePercentAsianOrAsianAmerican +
        formState.traineePercentLatinaLatinoLatinx +
        formState.traineePercentNativeHawaiianPacificIslander +
        formState.traineeMultiracial +
        formState.traineeWhite +
        formState.traineeOtherRace +
        formState.traineeRaceUnknown !==
        100
    ) {
      allErrorMessages.push(
        'The sum of Trainee Percent American Indian, Trainee Percent Black or African American, Trainee Percent Asian or Asian American, Trainee Percent Latina, Latino, or Latinx, Trainee Percent Native Hawaiian or Pacific Islander, Trainee Percent Multiracial, Trainee Percent White, Trainee Percent Other Race, and Trainee Percent Race Unknown must be 100',
      );
      hasError = true;
    }

    if (
      formState.barrierReturningCitizensOrFormerlyIncarceratedPersons !==
        undefined &&
      (formState.barrierReturningCitizensOrFormerlyIncarceratedPersons < 0 ||
        formState.barrierReturningCitizensOrFormerlyIncarceratedPersons > 100)
    ) {
      allErrorMessages.push(
        'Barrier Returning Citizens must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.barrierPhysicalDisability !== undefined &&
      (formState.barrierPhysicalDisability < 0 ||
        formState.barrierPhysicalDisability > 100)
    ) {
      allErrorMessages.push(
        'Barrier Physical Disability must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.barrierIntellectualOrDevelopmentalDisability !== undefined &&
      (formState.barrierIntellectualOrDevelopmentalDisability < 0 ||
        formState.barrierIntellectualOrDevelopmentalDisability > 100)
    ) {
      allErrorMessages.push(
        'Barrier Intellectual or Developmental Disability must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.barrierUnhoused !== undefined &&
      (formState.barrierUnhoused < 0 || formState.barrierUnhoused > 100)
    ) {
      allErrorMessages.push('Barrier Unhoused must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.barrierMentalHealth !== undefined &&
      (formState.barrierMentalHealth < 0 || formState.barrierMentalHealth > 100)
    ) {
      allErrorMessages.push('Barrier Mental Health must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.barrierNewAmericans !== undefined &&
      (formState.barrierNewAmericans < 0 || formState.barrierNewAmericans > 100)
    ) {
      allErrorMessages.push('Barrier New Americans must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.barrierInRecovery !== undefined &&
      (formState.barrierInRecovery < 0 || formState.barrierInRecovery > 100)
    ) {
      allErrorMessages.push('Barrier In Recovery must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.barrierVeteran !== undefined &&
      (formState.barrierVeteran < 0 || formState.barrierVeteran > 100)
    ) {
      allErrorMessages.push('Barrier Veteran must be between 0 and 100.');
      hasError = true;
    }
    if (
      formState.fundingPercentFromPublicFunding !== undefined &&
      (formState.fundingPercentFromPublicFunding < 0 ||
        formState.fundingPercentFromPublicFunding > 100)
    ) {
      allErrorMessages.push(
        'Funding Percent from Public Funding must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.fundingPercentFromPrivateFunding !== undefined &&
      (formState.fundingPercentFromPrivateFunding < 0 ||
        formState.fundingPercentFromPrivateFunding > 100)
    ) {
      allErrorMessages.push(
        'Funding Percent from Private Funding must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue !==
        undefined &&
      (formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue < 0 ||
        formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue > 100)
    ) {
      allErrorMessages.push(
        'Funding Percent from Social Enterprise or Generated Revenue must be between 0 and 100.',
      );
      hasError = true;
    }
    if (
      formState.fundingPercentFromPublicFunding !== undefined &&
      formState.fundingPercentFromPrivateFunding !== undefined &&
      formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue !==
        undefined &&
      formState.fundingPercentFromPublicFunding +
        formState.fundingPercentFromPrivateFunding +
        formState.fundingPercentFromSocialEnterpriseOrGeneratedRevenue !==
        100
    ) {
      allErrorMessages.push(
        'The sum of Funding Percent from Public Funding, Funding Percent from Private Funding, and Funding Percent from Social Enterprise or Generated Revenue must be 100',
      );
      hasError = true;
    }
    if (formState.minimumWage !== undefined && formState.minimumWage < 0) {
      allErrorMessages.push('Minimum Wage must be a positive number.');
      hasError = true;
    }
    if (
      formState.alumniHiredByOrg !== undefined &&
      (formState.alumniHiredByOrg < 0 ||
        !Number.isInteger(formState.alumniHiredByOrg))
    ) {
      allErrorMessages.push(
        'Alumni Hired by Organization must be a positive integer.',
      );
      hasError = true;
    }

    if (!formState.orgId) {
      hasError = true;
    }

    if (hasError) {
      console.log('Validation failed: Displaying error messages.');
      setErrorOpen(true);
      setErrorMessages(allErrorMessages);
      return false;
    }

    return true;
  };
  const handleSubmit = async () => {
    console.log('handling submit');
    if (validateInputs()) {
      try {
        const formData = {
          ...formState,
          youthOutcomesMeasure:
            formState.youthOutcomesMeasure?.join(', ') || '',
        };
        const response = await postData('program_outcomes/new', formData);
        console.log('Program outcome submitted successfully:', response);
        setFormState(noState);
        // Handle success (e.g., show a success message, reset form, etc.)
      } catch (error) {
        console.error('Error submitting program outcome:', error);
        // Handle error (e.g., show an error message)
      }
    } else {
      console.error('Validation failed.');
      // Handle validation failure (e.g., show a validation error message)
      if (errorMessages.length === 0) {
        setErrorOpen(true);
        setErrorMessages(['Please fill out all required fields.']);
      }
    }
  };

  const currYear = new Date().getFullYear();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Submit Program Outcomes for {formState.organizationName}</h1>
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
          <Link to="/kitchen-outcomes">Kitchen Outcomes Survey</Link>.
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
        <b>Calendar year data for {currYear} is preferred but not required</b>
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
      <h3>Organization Details</h3>
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
            programming in {currYear} or during the most recent 12-month period
            for which you have complete data. This is the{' '}
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
                  Staggered Cohort admission (multiple, overlapping cohorts
                  enrolled)
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Single}>
                  Single Cohort admission (training program resets with each new
                  group of students)
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Other}>
                  Other
                </MenuItem>
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
                      | 'HourlyMin'
                      | 'HourlyAboveMin'
                      | 'Stipend'
                      | 'None'
                      | undefined,
                  })
                }
                label="Youth Compensation"
              >
                <MenuItem value="HourlyMin">Hourly - Minimum Wage</MenuItem>
                <MenuItem value="HourlyAboveMin">
                  Hourly - Above Minimum Wage
                </MenuItem>
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
                <MenuItem value="Other">Other</MenuItem>
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
          <h4>Adult program (weeks)</h4>
          Please enter the total length of the program in weeks. If you have
          multiple adult programs, please enter number for your primary/largest
          program
          <br />
          <br />
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
          <h4>Adult program (hours)</h4>
          Please enter the total length of the program in hours. If you have
          multiple adult programs, please enter number for your primary/largest
          program
          <br />
          <br />
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
          <h4>Adults: Enrollment Structure</h4>
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
                      | 'Other',
                  });
                }}
                label="Adults Enrollment Structure"
              >
                <MenuItem value="Single Cohort">
                  Single Cohort admission (training program resets with each new
                  group of students)
                </MenuItem>
                <MenuItem value="Staggered">
                  Staggered Cohort admission (multiple, overlapping cohorts
                  enrolled)
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <h4>Adults: Compensation</h4>
          How do you provide direct financial support to students? If it changes
          throughout your program, please check all that apply.
          <br />
          <br />
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
                      | 'HourlyMin'
                      | 'HourlyAboveMin'
                      | 'Stipend'
                      | 'None',
                  });
                }}
                label="Adults Compensation"
              >
                <MenuItem value="HourlyMin">Hourly - Minimum Wage</MenuItem>
                <MenuItem value="HourlyAboveMin">
                  Hourly - Above Minimum Wage
                </MenuItem>
                <MenuItem value="Stipend">
                  Stipend - fixed or variable cash disbursements
                </MenuItem>
                <MenuItem value="None">No Monetary Compensation</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <h4>Adult: Trained Definition</h4>
          How do you define <b>enrolled</b> in your adult program? Select the
          option below that best describes your methodology for counting number
          of enrollees. <b>To count as enrolled a student must complete:</b>
          <br />
          <br />
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
          <Box mb={2}>
            <h4>Adult: Graduated definition</h4>
            How do you define <b>graduated</b> in your adult program? Select the
            option below that best describes your methodology for counting
            number of graduates.{' '}
            <b>To count as graduated a student must complete:</b>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="adult-graduated-definition-label">
                Adult Graduated Definition
              </InputLabel>
              <Select
                labelId="adult-graduated-definition-label"
                value={formState.adultGraduatedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultGraduatedDefinition: e.target
                      .value as keyof (typeof formState)['adultGraduatedDefinition'],
                  });
                }}
                label="Adult Graduated Definition"
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
        </div>
      )}
      <h3>Trainee Demographics & Wrap Around Services</h3>
      <p>
        In the section, provide combined data for all your training programs.
      </p>
      <h4>Trainee Demographics Part I</h4>
      <p>
        Please provide an estimate if exact data is not available. Leave blank
        if you do not track.
      </p>
      <p>
        NOTE: The language below often mirrors language from census categories
        and government definitions. If there is preferred language or
        terminology we should use when referring to your program and clients,
        please let us know by emailing{' '}
        <a href="info@catalystkitchens.org">info@catalystkitchens.org</a>. All
        comments are welcome.
      </p>
      <h4>Trainees: Age</h4>
      <p>
        Percentage of all individuals trained who were between 16-24 years old
        (includes all culinary training programs).
      </p>
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
      <h4>Trainees: % Female</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as female?
      </p>
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
      <h4>Trainees: % Male</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as male?
      </p>
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
      <h4>Trainees: % Non-binary</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as
        non-binary (genderqueer, gender neutral, gender fluid, or different
        non-binary gender)?
      </p>
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
      <h4>Trainees: % Transgender</h4>
      <p>
        SEPARATE from the previous three questions on gender identity, what{' '}
        <b>percentage</b> of trainees in all programs identify as transgender?
      </p>
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
      <h4>Trainee Demographics Part II</h4>
      <p>
        Please provide estimate if exact data is not available. If you do not
        collect race/ethnicity data please leave blank.
      </p>
      <h4>Trainees: % American Indian</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as American
        Indian, Alaska Native, or Indigenous?
      </p>
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
      <h4>Trainees: % Asian or Asian American</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as Asian or
        Asian American?
      </p>
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
      <h4>Trainees: % Black or African American</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as Black or
        African American?
      </p>
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
      <h4>Trainees: % Latina, Latino, Latinx</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as Latina,
        Latino, Latinx?
      </p>
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
      <h4>Trainees: % Native Hawaiian/Pacific Islander</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as Native
        Hawaiian or Pacific Islander?
      </p>
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
      <h4>Trainees: % Multi-racial</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as two or
        more races or ethnicities?
      </p>
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
      <h4>Trainees: % White</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as White?
      </p>
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
      <h4>Trainees: % Other Race</h4>
      <p>
        What <b>percentage</b> of trainees in all programs identify as a race or
        ethnicity not listed here?
      </p>
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
      <h4>Trainees: % Race Unknown</h4>
      <p>
        What <b>percentage</b> of trainees in all programs do you not have
        race/ethnicity data for?
      </p>
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
      <h4>Barriers Experienced by Trainees</h4>
      <p>
        Enter % students experiencing any of the barriers below. Ex: 70%
        homeless, 40% reentry, 25% in recovery, etc. Does not need to add up to
        100% as trainees may experience multiple barriers. Approximate
        percentages are OK.
      </p>
      <p>
        NOTE: The language below often mirrors language from census categories
        and government definitions. If there is preferred language or
        terminology we should use when referring to your program and clients,
        please let us know by emailing{' '}
        <a href="info@catalystkitchens.org">info@catalystkitchens.org</a>. All
        comments are welcome.
      </p>
      <h4>Barrier: Returning Citizens/Formerly Incarcerated Persons</h4>
      <p>
        <b>Percentage</b> of trainee population who have been recently released
        from incarceration, are on probation, have a criminal record, or are
        otherwise justice involved.
      </p>
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
      <h4>Barrier: Physical Disability</h4>
      <p>
        <b>Percentage</b> of trainee population who have physical disabilities.
      </p>
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
      <h4>Barrier: Neurodiversity</h4>
      <p>
        <b>Percentage</b> of trainee population who are neurodiverse.
      </p>
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
      <h4>Barrier: Unhoused</h4>
      <p>
        <b>Percentage</b> of trainee population who are unhoused at time of
        enrollment, are in transitional housing, or housing insecure.
      </p>
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
      <h4>Barrier: Mental Health</h4>
      <p>
        <b>Percentage</b> of trainee population who have a mental/psychological
        disorder.
      </p>
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
      <h4>Barrier: New Americans</h4>
      <p>
        <b>Percentage</b> of trainee population who are recent immigrants or
        refugees.
      </p>
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
      <h4>Barrier: In Recovery</h4>
      <p>
        <b>Percentage</b> of trainee population who are in recovery or have a
        history of substance abuse.
      </p>
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
      <h4>Barrier: Veteran</h4>
      <p>
        <b>Percentage</b> of trainee population who are veterans.
      </p>
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
      <h4>WRAP AROUND SERVICES</h4>
      <p>
        This section asks about which wrap around services your organization
        either provides in house or facilitates access to.
      </p>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Housing</InputLabel>
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
          <InputLabel>Life Skills / SocialEmotional Learning</InputLabel>
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
          <InputLabel>Case Management</InputLabel>
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
          <InputLabel>Job Search & Placement</InputLabel>
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
          <InputLabel>Recovery Treatment</InputLabel>
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
          <InputLabel>Mental Health Services</InputLabel>
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
          <InputLabel>Healthcare (all other)</InputLabel>
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
          <InputLabel>Childcare</InputLabel>
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
          <InputLabel>Transportation</InputLabel>
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
      <p>
        Other: Please specify other wrap around services your program provides
        or facilitates access to
      </p>
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
      <h3>Training Program Funding</h3>
      <h4>Funding Mix for Programs</h4>
      <p>
        Please estimate what percentage of your <b>Training Program Funding</b>{' '}
        comes from each of the following categories. These can be rough
        estimates, but the three numbers should total 100.
      </p>
      <p>
        <b>Public Funding</b> includes all government funding (except as noted
        below for social enterprise).
      </p>
      <p>
        <b>Private Funding</b> includes individual donations and in kind
        contributions.
      </p>
      <p>
        <b>Social Enterprise and Generated Revenues</b> are the gross
        contributions to budget from work completed by your kitchens and
        foodservice operations, and includes contracts with public agencies that
        pay per meal or are for a fixed amount for period of meal coverage.
        Please exclude revenues from operations that have no involvement with
        the training program or graduates.
      </p>
      <Box mb={2}>
        <TextField
          label="Funding: % from public funding"
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
          label="Funding: % from private funding"
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
          label="Funding: % from social enterprise or generated revenue"
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
      <h4>FUNDING SOURCES</h4>
      <h4>SNAP E&T</h4>
      <p>Do you currently receive SNAP E&T funds?</p>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>SNAP E&T</InputLabel>
          <Select
            name="snapET"
            value={formState.SNAPEAndT}
            onChange={(e) =>
              setFormState({
                ...formState,
                SNAPEAndT: e.target.value as
                  | 'Yes'
                  | 'NoButInterested'
                  | 'NoNotInterested'
                  | 'NoRejected',
              })
            }
          >
            <MenuItem value="Yes">Yes, we receive SNAP E&T funds</MenuItem>
            <MenuItem value="NoButInterested">
              No, but we would like to be able to access SNAP E&T funding
            </MenuItem>
            <MenuItem value="NoNotInterested">
              No, and we have do not have interest in the funding
            </MenuItem>
            <MenuItem value="NoRejected">
              No, and we have applied and been rejected in the past
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <h4>WIOA</h4>
      <p>Do you currently receive WIOA funds?</p>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>WIOA</InputLabel>
          <Select
            name="wioa"
            value={formState.WIOA}
            onChange={(e) =>
              setFormState({
                ...formState,
                WIOA: e.target.value as
                  | 'Yes'
                  | 'NoButInterested'
                  | 'NoNotInterested'
                  | 'NoRejected',
              })
            }
          >
            <MenuItem value="Yes">Yes, we receive WIOA funds</MenuItem>
            <MenuItem value="NoButInterested">
              No, but we would like to be able to access WIOA funding
            </MenuItem>
            <MenuItem value="NoNotInterested">
              No, and we have do not have interest in the funding
            </MenuItem>
            <MenuItem value="NoRejected">
              No, and we have applied and been rejected in the past
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Curriculum */}
      <h3>General Program Questions</h3>
      <h4>Curriculum</h4>
      <p>
        How much of your program includes written, organized curriculum that
        guides teaching and learning?
      </p>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Curriculum</InputLabel>
          <Select
            name="curriculum"
            value={formState.curriculum}
            onChange={(e) =>
              setFormState({
                ...formState,
                curriculum: e.target.value as 'All' | 'Part' | 'None',
              })
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Part">Part</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <h4>Program Certifications</h4>
      <p>
        What certifications does your culinary program(s) currently hold? Check
        all that apply. These are certifications that your program holds.
        Individual certifications for students are listed in the following
        question
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Check All That Apply.</FormLabel>
        <FormGroup>
          {PROGRAM_CERTIFICATIONS.map((certification) => (
            <FormControlLabel
              key={certification}
              control={
                <Checkbox
                  checked={formState.programCertifications.includes(
                    certification,
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState((prevState) => {
                      const updatedCertifications = event.target.checked
                        ? [...prevState.programCertifications, certification]
                        : prevState.programCertifications.filter(
                            (type) => type !== certification,
                          );
                      return {
                        ...prevState,
                        programCertifications: updatedCertifications,
                      };
                    });
                  }}
                  name={certification}
                />
              }
              label={certification}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Box mb={2}>
        <h4>Other Program Certifications</h4>
        <p>
          If you checked &quot;Other&quot; above, list any additional Program
          Certifications here.{' '}
          <b>Please separate multiple items with a semicolon.</b>
        </p>
        <TextField
          id="outlined-other-program-certifications"
          onChange={(e) =>
            setFormState({
              ...formState,
              otherProgramCertifications: e.target.value,
            })
          }
          label="Other Program Certifications"
          variant="outlined"
          fullWidth
        />
      </Box>

      <h4>Participant Certifications</h4>
      <p>
        What certifications do you offer program participants? Check all that
        apply.{' '}
        <b>
          Select the options below that are closest to your participant
          certifications.
        </b>{' '}
        If necessary, you may list additional items in the next question.
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Check All That Apply.</FormLabel>
        <FormGroup>
          {PARTICIPANT_CERTIFICATIONS.map((certification) => (
            <FormControlLabel
              key={certification}
              control={
                <Checkbox
                  checked={formState.participantCertifications.includes(
                    certification,
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState((prevState) => {
                      const updatedCertifications = event.target.checked
                        ? [
                            ...prevState.participantCertifications,
                            certification,
                          ]
                        : prevState.participantCertifications.filter(
                            (type) => type !== certification,
                          );
                      return {
                        ...prevState,
                        participantCertifications: updatedCertifications,
                      };
                    });
                  }}
                  name={certification}
                />
              }
              label={certification}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Box mb={2}>
        <h4>Other Participant Certifications</h4>
        <p>
          If you offer any certification opportunities for students that are not
          listed above, please add those here.{' '}
          <b>Please separate multiple items with a semicolon.</b>
        </p>
        <TextField
          id="outlined-other-participant-certifications"
          onChange={(e) =>
            setFormState({
              ...formState,
              otherParticipantCertifications: e.target.value,
            })
          }
          label="Other Participant Certifications"
          variant="outlined"
          fullWidth
        />
      </Box>

      {/* Internship/Externship */}
      <h4>Internship or Externship</h4>
      <p>
        Do you offer an internship or externship opportunity to any of your
        trainees either before or after program completion that is either
        offsite with a business partner or onsite in one of your kitchens or
        enterprises?
      </p>
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
          <h4>Internship or Externship Description</h4>
          <p>
            Please describe in 1-2 sentences your internship or externship. If
            possible, include where it happens, how long it lasts, and if it is
            supported by wages or a stipend. While these are not standard
            definitions, an internship is on the job, practical experience
            usually lasting several weeks or longer, while an externship is
            shorter and more limited (job shadowing).
          </p>
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
      <h4>Minimum Wage in Currnet Year</h4>
      <p>
        What was your local minimum wage for most of {currYear}? If your city,
        county, and/or state minimum wages are different, please list the one
        that reflects where most of your graduates are placed in jobs. If your
        local minimum wage has different tiers (i.e. by size of employer), list
        the highest rate.
      </p>
      <Box mb={2}>
        <TextField
          label="Minimum Wage Current Year"
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
      <h4>Job Type: Food Service?</h4>
      <p>
        What % of first job placements for your training programs are in food
        service positions? Food service jobs are loosely defined as working in a
        kitchen.
      </p>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Job Type in Food Service</InputLabel>
          <Select
            name="jobType"
            value={formState.jobType}
            onChange={(e) =>
              setFormState({
                ...formState,
                jobType: e.target.value as
                  | '1-25%'
                  | '26-50%'
                  | '51-75%'
                  | '76-100%'
                  | 'Not Tracked',
              })
            }
          >
            <MenuItem value="1-25%">1-25%</MenuItem>
            <MenuItem value="26-50%">26-50%</MenuItem>
            <MenuItem value="51-75%">51-75%</MenuItem>
            <MenuItem value="76-100%">76-100%</MenuItem>
            <MenuItem value="Not Tracked">Do not track job type</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <h4>Job Category</h4>
      <p>
        What job categories are you placing graduates into? Select all that
        apply. &quot;Food Service&quot; positions refer to jobs in kitchens,
        involved in food prep/production. &quot;Customer Service&quot; can be in
        food service but not in food production (FOH or retail sales).
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Check All That Apply.</FormLabel>
        <FormGroup>
          {JOB_CATEGORIES.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={formState.jobCategory.includes(category)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState((prevState) => {
                      const updatedCategories = event.target.checked
                        ? [...prevState.jobCategory, category]
                        : prevState.jobCategory.filter(
                            (type) => type !== category,
                          );
                      return {
                        ...prevState,
                        jobCategory: updatedCategories,
                      };
                    });
                  }}
                  name={category}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </FormControl>
      <h4>Alumni Hired by Org</h4>
      <p>
        The number of alumni of your training programs that worked for your
        organization in {currYear}? Approximate number is OK.
      </p>
      <p>
        This number should refer to hires, whether full time or part time, in
        roles that are permanent at the organization. These roles should not be
        dependent on status as a student or graduate, e.g. students who are paid
        during the program, temporary hires post-program, or
        apprenticeships/transitional hires only supported by programmatic
        funding.
      </p>
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
      {errorOpen && (
        <Alert
          severity="warning"
          onClose={() => setErrorOpen(false)}
          style={{ marginBottom: '1rem' }}
        >
          {errorMessages.map((message) => (
            <div key={message}>{message}</div>
          ))}
        </Alert>
      )}
      <Box mt={3}>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#2C2C2C',
            color: '#F5F5F5',
            width: '100%',
          }}
          onClick={handleSubmit}
        >
          Submit Program Data
        </Button>
      </Box>
    </div>
  );
}
