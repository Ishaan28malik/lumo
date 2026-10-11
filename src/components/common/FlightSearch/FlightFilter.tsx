import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Autocomplete,
  Button,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';

import { useAirlinesDetails } from '../../../api/useAirlinesDetails';
import { useAirportDetails } from '../../../api/useAirportDetails';
import { useDestinationDetails } from '../../../api/useDestinationDetails';
import { YEAR_MONTH_DAY_FORMAT } from '../../../constants/dateFormats';
import { FlightSearchFilter } from '../../../types/flightSearchTable';
import AeroRenderOptionContent from './AeroRenderOptionContent';
import DestinationRenderOptionContent from './DestinationRenderOptionContent';

type FlightFilterProps = {
  filter: FlightSearchFilter;
  onFilterChange: ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean | Dayjs;
  }) => void;
  refetch: () => void;
};

const FlightFilter: React.FC<FlightFilterProps> = ({
  filter,
  onFilterChange,
  refetch,
}) => {
  //autocomplete input state
  const [inputValues, setInputValues] = useState({
    airline: '',
    airport: '',
    destination: '',
  });

  // state to control the open/close behavior of the dropdowns
  const [dropdownOpen, setDropdownOpen] = useState({
    airline: false,
    airport: false,
    destination: false,
  });
  const [localDeparture, setLocalDeparture] = useState<Dayjs | null>(
    filter.departure
  );
  const [localFilter, setLocalFilter] = useState<FlightSearchFilter>(filter);
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = event?.target?.name;
      const value =
        event?.target?.type === 'checkbox'
          ? (event as React.ChangeEvent<HTMLInputElement>)?.target?.checked
          : event?.target?.value;

      setLocalFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));

      //make api call on toggle switch
      if (
        name === 'include_nearby_origin' ||
        name === 'include_nearby_destination'
      ) {
        // Only make api call if there is a departure date
        if (localDeparture) {
          onFilterChange({ name, value });
        } else {
          setShowWarning(true);
        }
      }
    },
    [localDeparture, onFilterChange]
  );

  // Date Picker handler
  const handleDatePickerChange = useCallback((value: Dayjs | null) => {
    setLocalDeparture(value);
  }, []);

  // Search button handler
  const handleSearch = () => {
    if (!localDeparture) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);

    const filterFields = {
      departure: localDeparture,
      airline: localFilter.airline,
      origin: localFilter.origin,
      flightno: localFilter.flightno,
      destination: localFilter.destination,
      include_nearby_origin: localFilter.include_nearby_origin,
      include_nearby_destination: localFilter.include_nearby_destination,
    };
    //Looping through fields and update only if a value exists
    Object.entries(filterFields).forEach(([name, value]) => {
      if (value) {
        onFilterChange({ name, value });
      }
    });

    refetch();
  };

  //handle autocomplete input change
  const handleAutocompleteInputChange = useCallback(
    (field: keyof typeof inputValues) =>
      (_: React.SyntheticEvent, value: string) => {
        setInputValues((prev) => ({ ...prev, [field]: value }));
        setDropdownOpen((prev) => ({ ...prev, [field]: value.length >= 1 }));
      },
    []
  );

  // Autocomplete onChange handler to update filter state
  const handleAutocompleteChange = (
    name: string,
    newValue: string | { code?: string; iata?: string } | null
  ) => {
    const value =
      typeof newValue === 'string'
        ? newValue
        : newValue?.code || newValue?.iata || '';

    setLocalFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));

    onFilterChange({ name, value });
  };

  //fetch airport, airlines, destination results
  const { data: airportResults } = useAirportDetails();
  const { data: airlinesResults } = useAirlinesDetails();
  const { data: destinationResults } = useDestinationDetails();

  const airportOptions = airportResults?.data ?? [];
  const airlinesOptions = airlinesResults?.data ?? [];
  const destinationOptions = destinationResults?.data ?? [];

  return (
    <div className="tw-mb-6 tw-flex tw-h-64 tw-w-full tw-gap-5 tw-rounded-md tw-border tw-px-4 tw-py-10 tw-shadow-lg">
      <div className="tw-flex tw-h-full tw-flex-1 tw-flex-col tw-justify-between tw-px-4">
        <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
          <div>
            <h5 className="tw-mb-2 tw-text-lg">Departure</h5>
            <DatePicker
              format={YEAR_MONTH_DAY_FORMAT}
              value={localDeparture}
              onChange={handleDatePickerChange}
              slotProps={{ textField: { size: 'small' } }}
              className="tw-w-full"
            />
            {showWarning && (
              <Typography variant="body2" color="error" className="tw-mt-2">
                Please select a departure date.
              </Typography>
            )}
          </div>
          <div>
            <h5 className="tw-mb-2 tw-text-lg">Airline</h5>

            <Autocomplete
              forcePopupIcon={false} //remove dropdown icon
              inputValue={inputValues.airline}
              onInputChange={handleAutocompleteInputChange('airline')}
              open={dropdownOpen.airline}
              onClose={() =>
                setDropdownOpen((prev) => ({ ...prev, airline: false }))
              }
              value={airlinesOptions?.find(
                (option) => option.code === localFilter.airline
              )}
              onChange={(_, newValue) =>
                handleAutocompleteChange('airline', newValue)
              }
              size="small"
              freeSolo
              options={airlinesOptions}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              renderOption={(props, option) => (
                <li {...props}>
                  <AeroRenderOptionContent option={option} />
                </li>
              )}
              ListboxProps={{
                style: {
                  maxHeight: '160px',
                  overflowY: 'auto',
                },
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']":
                      {
                        paddingRight: '2px',

                        '& .MuiAutocomplete-endAdornment': {
                          display: 'none',
                        },

                        '& .MuiSvgIcon-root': {
                          order: 3,
                        },
                      },
                  }}
                  placeholder="Airline"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="tw-flex tw-h-full tw-flex-1 tw-flex-col tw-justify-between tw-px-4">
        <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
          <div>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
              <h5 className="tw-mb-2 tw-text-lg">Origin</h5>
              <div className="tw-flex tw-items-center">
                <h5 className="tw-text-sm">Nearby Airports</h5>
                <Switch
                  checked={localFilter?.include_nearby_origin}
                  disabled={!localFilter.origin}
                  name="include_nearby_origin"
                  onChange={handleInputChange}
                  className="tw-ml-2"
                />
              </div>
            </div>

            <Autocomplete
              inputValue={inputValues.airport}
              onInputChange={handleAutocompleteInputChange('airport')}
              open={dropdownOpen.airport}
              onClose={() =>
                setDropdownOpen((prev) => ({ ...prev, airport: false }))
              }
              value={airportOptions?.find(
                (option) => option.code === localFilter.origin
              )}
              onChange={(_, newValue) => {
                handleAutocompleteChange('origin', newValue);
              }}
              size="small"
              freeSolo
              options={airportOptions}
              getOptionLabel={(option) =>
                typeof option === 'string'
                  ? option
                  : `${option.name} (${option.code})`
              }
              renderOption={(props, option) => (
                <li {...props}>
                  <AeroRenderOptionContent option={option} />
                </li>
              )}
              ListboxProps={{
                style: {
                  maxHeight: '160px',
                  overflowY: 'auto',
                },
              }}
              renderInput={(params) => (
                <TextField
                  //cannot use disableclearable property ro hide the deafult mui clearbutton as results only in clear the textfield but not the state.
                  // rearranging the order of mui clear button(as it always shown in the end) and location icon and hiding the clear button.
                  sx={{
                    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']":
                      {
                        paddingRight: '2px',

                        '& .MuiAutocomplete-endAdornment': {
                          display: 'none',
                        },

                        '& .MuiSvgIcon-root': {
                          order: 3,
                        },
                      },
                  }}
                  placeholder="Origin location"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                      <>
                        <InputAdornment position="end" className="tw-pr-2">
                          <LocationOnIcon />
                        </InputAdornment>
                        {/* mui clear button needs to be mentioned to hide it, else there will be conflicting css with locationIcon, resulting in whitespace on the end  */}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div>
            <h5 className="tw-mb-2 tw-text-lg">Flight Number</h5>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Flight Number"
              name="flightno"
              value={localFilter?.flightno}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
        </div>
      </div>

      <div className="tw-flex tw-h-full tw-flex-1 tw-flex-col tw-justify-between tw-px-4">
        <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
          <div>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
              <h5 className="tw-mb-2 tw-text-lg">Destination</h5>
              <div className="tw-flex tw-items-center">
                <h5 className="tw-text-sm">Nearby Airports</h5>
                <Switch
                  checked={localFilter?.include_nearby_destination}
                  disabled={!localFilter.destination}
                  name="include_nearby_destination"
                  onChange={handleInputChange}
                  className="tw-ml-2"
                />
              </div>
            </div>

            <Autocomplete
              inputValue={inputValues.destination}
              onInputChange={handleAutocompleteInputChange('destination')}
              open={dropdownOpen.destination}
              onClose={() =>
                setDropdownOpen((prev) => ({ ...prev, destination: false }))
              }
              value={destinationOptions?.find(
                (option) => option.iata === localFilter.destination
              )}
              onChange={(_, newValue) =>
                handleAutocompleteChange('destination', newValue)
              }
              size="small"
              freeSolo
              options={destinationOptions}
              getOptionLabel={(option) =>
                typeof option === 'string'
                  ? option
                  : `${option.name} (${option.iata})`
              }
              renderOption={(props, option) => (
                <li {...props}>
                  <DestinationRenderOptionContent option={option} />
                </li>
              )}
              ListboxProps={{
                style: {
                  maxHeight: '160px',
                  overflowY: 'auto',
                },
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']":
                      {
                        paddingRight: '2px',

                        '& .MuiAutocomplete-endAdornment': {
                          display: 'none',
                        },

                        '& .MuiSvgIcon-root': {
                          order: 3,
                        },
                      },
                  }}
                  placeholder="Destination location"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',

                    endAdornment: (
                      <>
                        <InputAdornment position="end" className="tw-pr-2">
                          <LocationOnIcon />
                        </InputAdornment>
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            className="tw-mt-4 tw-h-10 tw-rounded-md tw-bg-blue-500 tw-text-white"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightFilter;
