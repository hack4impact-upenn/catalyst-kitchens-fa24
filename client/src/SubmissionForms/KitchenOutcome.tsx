import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button,
  Box,
  Checkbox,
  Radio,
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
  Grid,
  Snackbar,
} from '@mui/material';
import { number } from 'prop-types';
import { RootState } from '../util/redux/store';
import { getData, postData } from '../util/api';

export default function KitchenOutcome() {
  // Define the form state type
  type FormState = {
    email: string | null;
    year: Date;
    currYear: number;
    orgId: string | null;
    shareSurvey: boolean;
    responderName: string;
    responderTitle: string;
    organizationName: string;
    noMealsServed: number;
    typeOfMealsServed: string[];
    mealFundingPublic: number;
    mealFundingPrivateContracts: number;
    mealFundingPrivateDonations: number;
    mealsMale: number;
    mealsFemale: number;
    mealsNonBinary: number;
    mealsGenderUnknown: number;
    mealsTrangender: number;
    mealsAmericanIndian: number;
    mealsAsian: number;
    mealsBlack: number;
    mealsLatinx: number;
    mealsNativeHawaiian: number;
    mealsMultiRacial: number;
    mealsWhite: number;
    mealsOtherRace: number;
    mealsRaceUnknown: number;
    mealsInfants: number;
    mealsChildren: number;
    mealsAdults: number;
    mealsSeniors: number;
    mealsAgeUnknown: number;
    contractMealRevenue: number;
    costPerMeal: number;
    foodCostPercentage: number;
    mealReimbursement: number;
    retailSocialEnterpriseRevenue: number; // match
    expansionProjectNeeds: [];
    grossRevenueCafe: number;
    grossRevenueRestaurant: number;
    grossRevenueCatering: number;
    grossRevenueFoodTruck: number;
    grossRevenueWholesale: number;
    grossRevenueFoodSubscription: number;
    capitalExpansionProjects: string;
    capitalExpansionProjectNeeds: string[]; // match
    capitalProjectSize: number; // match
    capitalProjectDate: Date; // match
    capitalExpansionMonth: string;
    capitalExpansionYear: number;
  };

  // Define the type for category keys
  type CategoryKey =
    | 'cafe'
    | 'restaurant'
    | 'catering'
    | 'foodTruck'
    | 'wholesale'
    | 'foodSubscription';
  const MEAL_TYPES = [
    'Childcare Meals',
    'School Meals',
    'Soup Kitchen (onsite)',
    'Shelter Meals (offsite)',
    'Meals for Supportive/Transitional Housing',
    'Meals For Seniors',
    'Medically Tailored Meals',
  ];
  const user = useSelector((state: RootState) => state.user);
  const [ageOpen, setAgeOpen] = useState(false);
  const [mealOpen, setMealOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [racialOpen, setRacialOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [yearError, setYearError] = useState('');
  // Initialize formState with the FormState type
  const noFormState: FormState = {
    email: user.email,
    year: new Date(new Date().getFullYear()),
    currYear: new Date().getFullYear(),
    orgId: null,
    shareSurvey: true,
    responderName: '',
    responderTitle: '',
    organizationName: '',
    noMealsServed: 0,
    typeOfMealsServed: [],
    mealFundingPrivateContracts: 0,
    mealFundingPrivateDonations: 0,
    mealFundingPublic: 0,
    mealsMale: 0,
    mealsFemale: 0,
    mealsNonBinary: 0,
    mealsGenderUnknown: 0,
    mealsTrangender: 0,
    mealsAmericanIndian: 0,
    mealsAsian: 0,
    mealsBlack: 0,
    mealsLatinx: 0,
    mealsNativeHawaiian: 0,
    mealsMultiRacial: 0,
    mealsWhite: 0,
    mealsOtherRace: 0,
    mealsRaceUnknown: 0,
    mealsInfants: 0,
    mealsChildren: 0,
    mealsAdults: 0,
    mealsSeniors: 0,
    mealsAgeUnknown: 0,
    contractMealRevenue: 0,
    costPerMeal: 0,
    foodCostPercentage: 0,
    mealReimbursement: 0,
    retailSocialEnterpriseRevenue: 0,
    expansionProjectNeeds: [],
    grossRevenueCafe: 0,
    grossRevenueRestaurant: 0,
    grossRevenueCatering: 0,
    grossRevenueFoodTruck: 0,
    grossRevenueWholesale: 0,
    grossRevenueFoodSubscription: 0,
    capitalExpansionProjects: '',
    capitalExpansionProjectNeeds: [],
    capitalProjectSize: 0,
    capitalProjectDate: new Date(),
    capitalExpansionMonth: '',
    capitalExpansionYear: new Date().getFullYear(),
  };
  const [formState, setFormState] = useState<FormState>(noFormState);
  const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  async function validateInputs() {
    const racialPercentageSum =
      formState.mealsAmericanIndian +
      formState.mealsAsian +
      formState.mealsBlack +
      formState.mealsLatinx +
      formState.mealsNativeHawaiian +
      formState.mealsMultiRacial +
      formState.mealsWhite +
      formState.mealsOtherRace +
      formState.mealsRaceUnknown;
    const genderPercentageSum =
      formState.mealsFemale +
      formState.mealsMale +
      formState.mealsNonBinary +
      formState.mealsTrangender +
      formState.mealsGenderUnknown;
    const mealFundingSum =
      formState.mealFundingPublic +
      formState.mealFundingPrivateContracts +
      formState.mealFundingPrivateDonations;
    const ageGroupSum =
      formState.mealsInfants +
      formState.mealsChildren +
      formState.mealsAdults +
      formState.mealsSeniors +
      formState.mealsAgeUnknown;
    let works = true;

    const year = formState.year.getFullYear();

    if (
      Number.isNaN(year) ||
      year < 2017 ||
      year > new Date().getFullYear() + 5
    ) {
      works = false;
      setYearError('The year is too old or too far in the future.');
      setYearOpen(true);
    } else {
      try {
        console.log('Checking year:', year);
        const response = await getData(
          `kitchen_outcomes/${year - 2}/${formState.orgId}`,
        );
        console.log('Response:', response);
        console.log(response.data != null);
        if (response.data != null && response.data !== '') {
          works = false;
          setYearError('A submission for this year already exists.');
          setYearOpen(true);
        }
      } catch (error) {
        console.error('Error checking year:', error);
      }
    }

    if (racialPercentageSum !== 100) {
      works = false;
      setRacialOpen(true);
    }
    if (genderPercentageSum !== 100) {
      works = false;
      setGenderOpen(true);
    }
    if (mealFundingSum !== 100) {
      works = false;
      setMealOpen(true);
    }
    if (ageGroupSum !== 100) {
      works = false;
      setAgeOpen(true);
    }
    if (!formState.orgId) {
      works = false;
      setOrgOpen(true);
    }
    return works;
  }
  const handleSubmit = async () => {
    if (await validateInputs()) {
      try {
        const response = await postData('kitchen_outcomes/new', formState);
        console.log('Kitchen outcome submitted successfully:', response);
        setFormState(noFormState);
      } catch (error) {
        console.error('Error submitting kitchen outcome:', error);
      }
    }
  };
  useEffect(() => {
    const handleDateChange = () => {
      function findMonthNumerical(month: string) {
        const monthObject = months.find(
          (m) => m.label.toLowerCase() === month.toLowerCase(),
        );
        return monthObject?.value;
      }
      if (formState.capitalExpansionMonth && formState.capitalExpansionYear) {
        const selectedDate = new Date(
          `${formState.capitalExpansionYear}-${formState.capitalExpansionMonth}-01`,
        );
        setFormState({ ...formState, capitalProjectDate: selectedDate });
      }
    };
    handleDateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.capitalExpansionMonth, formState.capitalExpansionYear]);
  useEffect(() => {
    const fetchOrganizationId = async () => {
      if (user.email) {
        try {
          const response = await getData(`auth/organization/${user.email}`);
          if (response.data) {
            const { data } = response;
            setFormState({ ...formState, orgId: data });
          } else {
            console.error('No organization id found for user');
          }
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
          const response = await getData(
            `organization/organization/name/${formState.orgId}`,
          );
          if (response.data) {
            const { data } = response;
            setFormState({
              ...formState,
              organizationName: data.organizationName,
            });
          } else {
            console.error(
              'No Organization Name found for given organization id',
            );
          }
        } catch (error) {
          console.error('Error fetching organization name by ID:', error);
        }
      }
    };
    fetchOrganizationNameById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.orgId]);
  useEffect(() => {
    const setYearValue = () => {
      setFormState({
        ...formState,
        year: new Date(`1/1/${formState.currYear}`),
      });
    };
    setYearValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.currYear]);

  const currYear = new Date().getFullYear();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>
        Submit Kitchen Outcomes for {formState.organizationName}
      </h1>
      <p>
        Welcome to the Kitchen Outcomes Form! Thank you for taking the time to
        provide valuable insights about your organization. This form is designed
        to gather historical data on your food kitchen&apos;s operations,
        enabling us to better understand your achievements, challenges, and
        opportunities for improvement. Your input will help Catalyst Kitchens
        enhance support for member organizations like yours and identify best
        practices to strengthen the impact of food kitchens nationwide.
      </p>
      <h4>Organization and Responder Details</h4>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          onChange={(e) =>
            setFormState({ ...formState, responderName: e.target.value })
          }
          label="Responder's Name"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          onChange={(e) =>
            setFormState({ ...formState, responderTitle: e.target.value })
          }
          label="Responder's Title"
          variant="outlined"
          fullWidth
        />
      </Box>
      <h4>Submission Year</h4>
      <p>
        While it is preferred to submit data for the current calendar year, this
        section of the form allows you to select a different submission year if
        needed.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Year of Submission"
          variant="outlined"
          type="number"
          value={formState.currYear}
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              currYear: Number(e.target.value),
            });
          }}
        />
      </Box>
      <h4>Hunger Relief Impact Funding</h4>
      <p>
        Hunger Relief Meals Served: Total number of meals prepared for low
        income individuals in {formState.currYear} by your organization. Hunger
        Relief Meals are prepared meals: hot, cold, frozen, ready-to-eat or
        reheat. <br /> <br /> They do not include grocery/pantry boxes. Meal
        kits, specific boxed mix of perishable and non-perishable ingredients
        with recipes(e.g. “Blue Apron style”) are included in community meals.
        Include all prepared meals whether sold on contract or funded through
        grants or fundraising.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Hunger Relief Meals Served"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) =>
            setFormState({
              ...formState,
              noMealsServed: Number(e.target.value),
            })
          }
        />
      </Box>

      <p>
        Which types of meals are served through your hunger relief operations?
        Please check all that apply
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Meal Services Provided</FormLabel>
        <FormGroup>
          {MEAL_TYPES.map((mealType) => (
            <FormControlLabel
              key={mealType}
              control={
                <Checkbox
                  checked={formState.typeOfMealsServed.includes(mealType)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormState((prevState) => {
                      const updatedMeals = event.target.checked
                        ? [...prevState.typeOfMealsServed, mealType]
                        : prevState.typeOfMealsServed.filter(
                            (type) => type !== mealType,
                          );
                      return {
                        ...prevState,
                        typeOfMealsServed: updatedMeals,
                      };
                    });
                  }}
                  name={mealType}
                />
              }
              label={mealType}
            />
          ))}
        </FormGroup>
      </FormControl>
      <h4>Contract Meal Revenue</h4>
      <p>
        Total combined gross revenue in {new Date().getFullYear()} from all
        contract meal enterprises. Do not include donated goods or revenue from
        retail food service social enterprises. Retail Social Enterprise data is
        collected later in the survey.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Contract Meal Revenue"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              contractMealRevenue: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Cost per Meal</h4>
      <p>
        What is the average cost to produce a meal (total cost of goods, labor,
        and overhead/total meals produced)?
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Cost per Meal"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              costPerMeal: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Food Cost Percent</h4>
      <p>
        What is the food cost % for your hunger relief meals? Do not include the
        value of donated and recovered food in your food cost calculation.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Food Cost Percent"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              foodCostPercentage: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Meal Reimbursement</h4>
      <p>
        Of meals that you get direct reimbursement for, what is your Average
        Reimbursement per meal? This should be your average rate across all
        contracts, public and private. Estimate is OK.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Meal Reimbursement"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealReimbursement: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Hunger Relief Meal Funding Mix</h4>
      <p>
        Please estimate what percentage of your Hunger Relief Meal Funding comes
        from each of the following categories. This can be a rough estimate, but
        the three numbers should total 100. Public funding includes all
        government grants and contracts. Individual donations and In kind
        contributions should be included in Private Donations.
      </p>

      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from public/gov't contracts & grants"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFundingPublic: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from private contracts"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFundingPrivateContracts: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from private donations & philanthropy"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFundingPrivateDonations: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h3>Hunger Relief Demographics</h3>
      <p>
        Please provide the percentage demographics of communities that your
        Kitchen serves below. Estimates are OK but should add up to 100%.
      </p>
      <h4>Gender</h4>
      <p>
        Please provide an estimate if exact data is not available. Leave blank
        if you do not track. <br />
        NOTE: The language below often mirrors language from census categories
        and government definitions. If there is preferred language or
        terminology we should use when referring to your program and clients,
        please let us know by emailing info@catalystkitchens.org. All comments
        are welcome.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Female"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsFemale: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Male"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsMale: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Non-binary"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsNonBinary: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Gender Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsGenderUnknown: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Transgender"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsGenderUnknown: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Race and Ethnicity</h4>
      <p>
        Please provide estimate if exact data is not available. If you do not
        collect race/ethnicity data, you can leave this section blank.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% American Indian or Alaska Native"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsAmericanIndian: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Asian or Asian American"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsAsian: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Black or African American"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsBlack: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Latina, Latino, or Latinx"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsLatinx: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Native Hawaiian or Pacific Islander"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsNativeHawaiian: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Multiracial"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsMultiRacial: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% White"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsWhite: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Other Race"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsOtherRace: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Race Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsRaceUnknown: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Age Groups</h4>
      <p>
        Please provide estimate if exact data is not available. If you do not
        collect age data, you can leave this section blank.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Infants (0-4)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsInfants: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Children/Youth (5-18)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsChildren: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Adults (19-64)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsAdults: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Seniors (65+)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsSeniors: Number(e.target.value),
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Age Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealsAgeUnknown: Number(e.target.value),
            });
          }}
        />
      </Box>
      <h4>Capital Expansion Projects</h4>
      <p>
        Do you have any capital expansion projects related to your food service
        operations or workforce training program? Select the response that best
        describes the current state of any expansion plan.
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Capital Expansion Project Status
        </FormLabel>
        <RadioGroup
          name="capitalExpansionProject"
          value={formState.capitalExpansionProjects}
          onChange={(e) =>
            setFormState({
              ...formState,
              capitalExpansionProjects: e.target.value,
            })
          }
        >
          <FormControlLabel
            value="We are in early stages of planning a capital expansion"
            control={<Radio />}
            label="We are in early stages of planning a capital expansion"
          />
          <FormControlLabel
            value="We have a capital expansion plan and are fundraising"
            control={<Radio />}
            label="We have a capital expansion plan and are fundraising"
          />
          <FormControlLabel
            value="We have a fully funded capital expansion plan"
            control={<Radio />}
            label="We have a fully funded capital expansion plan"
          />
          <FormControlLabel
            value="We have recently completed or will soon complete the project"
            control={<Radio />}
            label="We have recently completed or will soon complete the project"
          />
          <FormControlLabel
            value="We have no future plans or projects underway"
            control={<Radio />}
            label="We have no future plans or projects underway"
          />
        </RadioGroup>
      </FormControl>

      <h4>Capital Project Size</h4>
      <p>
        What is the size in dollars of the project plan or completed project
        referenced above, regardless of the current state of the project?
        Estimate is OK.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Capital Project Size"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              capitalProjectSize: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Capital Project Date</h4>
      <p>
        What is the projected month and year by which you want to have this
        project completed? Estimate is OK.
      </p>
      <Grid container spacing={2}>
        {/* Month Selector */}
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Month"
            value={formState.capitalExpansionMonth}
            onChange={(e) => {
              setFormState({
                ...formState,
                capitalExpansionMonth: e.target.value,
              });
            }}
          >
            {months.map((m) => (
              <MenuItem key={m.label} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Year Selector */}
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Year"
            value={formState.capitalExpansionYear}
            onChange={(e) => {
              setFormState({
                ...formState,
                capitalExpansionYear: Number(e.target.value),
              });
            }}
            fullWidth
            inputProps={{
              min: 1900, // Optional: Restrict input to realistic years
              max: 2100,
            }}
          />
        </Grid>
      </Grid>

      {/* Display the Selected Date */}
      {formState.capitalProjectDate && (
        <p>
          Selected Date:{' '}
          {formState.capitalProjectDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </p>
      )}
      <div>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">
            Capital Expansion Project Status
          </FormLabel>
          <RadioGroup
            name="capitalExpansionProject"
            value={formState.capitalExpansionProjects}
            onChange={(e) =>
              setFormState({
                ...formState,
                capitalExpansionProjects: e.target.value,
              })
            }
          >
            <FormControlLabel
              value="We are in early stages of planning a capital expansion"
              control={<Radio />}
              label="We are in early stages of planning a capital expansion"
            />
            <FormControlLabel
              value="We have a capital expansion plan and are fundraising"
              control={<Radio />}
              label="We have a capital expansion plan and are fundraising"
            />
            <FormControlLabel
              value="We have a fully funded capital expansion plan"
              control={<Radio />}
              label="We have a fully funded capital expansion plan"
            />
            <FormControlLabel
              value="We have recently completed or will soon complete the project"
              control={<Radio />}
              label="We have recently completed or will soon complete the project"
            />
            <FormControlLabel
              value="We have no future plans or projects underway"
              control={<Radio />}
              label="We have no future plans or projects underway"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <h4>Capital Expansion Project Needs</h4>
      <p>
        What support do you need in planning or executing your capital expansion
        project? Check all that apply.
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Select the forms of support you need
        </FormLabel>
        <FormGroup>
          {[
            { label: 'How do we even start?', value: 'How do we even start?' },
            {
              label: 'Planning cost expenses',
              value: 'Planning cost expenses',
            },
            {
              label: 'Creating fundraising strategy',
              value: 'Creating fundraising strategy',
            },
            { label: 'Construction costs', value: 'Construction costs' },
            {
              label: 'Equipment (heavy or small)',
              value: 'Equipment (heavy or small)',
            },
            { label: 'Operating expenses', value: 'Operating expenses' },
            { label: 'Other', value: 'Other' },
          ].map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={formState.capitalExpansionProjectNeeds.includes(
                    option.value,
                  )}
                  onChange={(e) => {
                    const { capitalExpansionProjectNeeds } = formState;
                    const updateNeeds = e.target.checked
                      ? [...capitalExpansionProjectNeeds, option.value]
                      : capitalExpansionProjectNeeds.filter(
                          (need: any) => need !== option.value,
                        );
                    setFormState({
                      ...formState,
                      capitalExpansionProjectNeeds: updateNeeds,
                    });
                  }}
                  name={option.value}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </FormControl>

      <h2>Retail Social Enterprise Outcomes</h2>
      <Box p={2}>
        <Typography variant="body1" gutterBottom>
          In the following sections, we will ask you to please share data about
          your retail food service enterprises. You will need to know the gross
          annual revenue from each of your food enterprises. The types of
          enterprise are grouped into the following categories. If one of your
          enterprise types is not represented below, please include it in the
          most relevant available category.
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>CAFE</strong> -- Food prepared on site with counter
              service; a limited number of items are made to order. Food may be
              consumed on or off premises.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>RESTAURANT</strong> -- Food prepared onsite with most
              items prepared to order and predominantly intended for on-premise
              consumption. Orders typically taken at the table though not
              required.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>CATERING</strong> -- On or offsite catering; DO NOT report
              catering data which are part of a café or restaurant and included
              in totals above.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>FOOD TRUCK</strong> -- Retail or free meal service
              prepared and served from a mobile kitchen.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>CONSUMER PACKAGED GOODS</strong> -- Prepared and/or
              packaged food and beverages sold to third-party resellers or
              direct to public. Include ready-to-eat foods and products can be
              branded or not branded.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>FOOD OR MEAL SUBSCRIPTION SERVICES</strong> -- Prepared
              and/or packaged meals sold at retail prices to individuals or
              families at regular intervals such as weekly or monthly pickups or
              deliveries (e.g., in the style of Blue Apron or other analogous
              services).
            </Typography>
          </li>
        </ol>
      </Box>

      <h4>Retail Social Enterprise Revenue</h4>
      <p>
        Total combined gross revenue in {formState.currYear} from all
        foodservice social enterprises, excluding contract hunger relief
      </p>
      <Box mb={2}>
        <TextField
          id="retail-social-enterprise-revenue"
          onChange={(e) =>
            setFormState({
              ...formState,
              retailSocialEnterpriseRevenue: Number(e.target.value),
            })
          }
          label="Gross Revenue from All Retail Social Enterprises"
          variant="outlined"
          fullWidth
          required
        />
      </Box>

      {[
        {
          label: 'Cafe',
          description:
            'Estimate on revenue generated from food prepared on site with counter service; a limited number of items are made to order. Food may be consumed on or off premises.',
          stateKey: 'grossRevenueCafe',
        },
        {
          label: 'Restaurant',
          description:
            'Estimate on revenue generated from food prepared onsite with most items prepared to order and predominantly intended for on-premise consumption. Orders typically taken at the table though not required.',
          stateKey: 'grossRevenueRestaurant',
        },
        {
          label: 'Catering',
          description:
            'Estimate on revenue generated from on or offsite catering; DO NOT report catering data which are part of a café or restaurant and included in totals above.',
          stateKey: 'grossRevenueCatering',
        },
        {
          label: 'Food Truck',
          description:
            'Estimate on revenue generated from retail or free meal service prepared and served from a mobile kitchen.',
          stateKey: 'grossRevenueFoodTruck',
        },
        {
          label: 'Consumer Packaged Goods',
          description:
            'Estimate on revenue generated from prepared and/or packaged food and beverages sold to third-party resellers or direct to public. Include ready-to-eat foods and products that can be branded or not branded.',
          stateKey: 'grossRevenueWholesale',
        },
        {
          label: 'Food or Meal Subscription Services',
          description:
            'Estimate on revenue generated from prepared and/or packaged meals sold at retail prices to individuals or families at regular intervals such as weekly or monthly pickups or deliveries (e.g., in the style of Blue Apron or other analogous services).',
          stateKey: 'grossRevenueFoodSubscription',
        },
      ].map(({ label, description, stateKey }) => (
        <div key={stateKey}>
          <h5>{label}</h5>
          <p>{description}</p>
          <Box mb={2}>
            <TextField
              id={`outlined-${stateKey}`}
              label={`Gross Revenue (${label})`}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => {
                setFormState({
                  ...formState,
                  [stateKey]: Number(e.target.value),
                });
              }}
            />
          </Box>
        </div>
      ))}
      {racialOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setRacialOpen(false);
          }}
        >
          The percentages under the Hunger Relief Demographics Race and
          Ethnicity category do not add up to 100!
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {ageOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setAgeOpen(false);
          }}
        >
          The percentages under the Age Groups category do not add up to 100!
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {genderOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setGenderOpen(false);
          }}
        >
          The percentages under the Hunger Relief Demographics Gender category
          do not add up to 100!
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {mealOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setMealOpen(false);
          }}
        >
          The percentages under the Hunger Relief Meal Funding Mix category do
          not add up to 100!
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {orgOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setOrgOpen(false);
          }}
        >
          User is not associated with an organization. Cannot submit form at
          this time. Please contact Catalyst Kitchens to be assigned to an
          organization.
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {yearOpen ? (
        <Alert
          severity="warning"
          onClose={() => {
            setYearOpen(false);
          }}
        >
          {yearError}
        </Alert>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: '32px',
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: '#2C2C2C',
            color: '#F5F5F5',
            width: '100%',
          }}
          onClick={handleSubmit}
        >
          Submit Kitchen Data
        </Button>
      </div>
    </div>
  );
}
