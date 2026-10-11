import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlightIcon from '@mui/icons-material/Flight';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import {
  Autocomplete,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useSearchData from '../../../api/useSearchData';
import { useUserInfo } from '../../../api/useUserInfo';
import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import { getFromLocal, setToLocal } from '../../../utils/localStore-util';
import { GENERIC_ERROR_MESSAGE } from '../../../utils/messages';
import CustomLoader from '../Loader/CustomLoader';
import AutocompleteRenderOptionContent from '../Search/AutocompleteRenderOptionContent';

const navLinks = [
  {
    id: 'home',
    label: 'Home',
    linkUrl: '/',
    icon: <HomeRoundedIcon fontSize="small" />,
  },
  {
    id: 'flights-search',
    label: 'Flights Search',
    linkUrl: '/flights/search',
    icon: <FlightIcon fontSize="small" />,
  },
  {
    id: 'queues',
    label: 'Queues',
    linkUrl: '/queues',
    icon: <ListAltIcon fontSize="small" />,
  },
];

const Header = () => {
  const { state, dispatch } = useTeamOrgContext();
  const { selectedTeam, selectedOrg } = state;
  const { data, isPending, error } = useUserInfo();
  const userData = data?.data;
  const location = useLocation();

  const [openLogout, setOpenLogout] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const logoutMenuRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  // Fetch results based on org, team, and search input
  const searchParams = useMemo(
    () => ({
      org: selectedOrg,
      team: selectedTeam,
      searchText: inputValue,
    }),
    [selectedOrg, selectedTeam, inputValue]
  );

  const { data: searchResults } = useSearchData(searchParams);

  const searchOptions = searchResults?.data ?? [];

  // Function to handle input change in the search box
  const handleInputChange = useCallback(
    (event: React.SyntheticEvent, value: string) => {
      setInputValue(value);
    },
    []
  );

  useEffect(() => {
    if (userData) {
      const storedTeamUid = getFromLocal('selectedTeamUid');
      const storedOrgPath = getFromLocal('selectedOrgPath');

      const initialTeamUid = storedTeamUid || userData.teams[0].uid;
      const initialTeam = userData.teams?.find(
        (team) => team.uid === initialTeamUid
      );

      const initialOrgPath =
        initialTeam && initialTeam.orgs && initialTeam.orgs.length > 0
          ? storedOrgPath || initialTeam.orgs[0]?.path
          : '';

      dispatch({ type: 'SET_TEAM', payload: initialTeamUid });
      dispatch({ type: 'SET_ORG', payload: initialOrgPath });
    }
  }, [userData, dispatch]);

  const handleTeamChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newTeamUid = event.target.value;
      dispatch({ type: 'SET_TEAM', payload: newTeamUid });
      setToLocal('selectedTeamUid', newTeamUid);

      const newTeam = userData?.teams?.find((team) => team.uid === newTeamUid);

      if (newTeam && newTeam.orgs && newTeam.orgs.length > 0) {
        const newOrgPath = newTeam.orgs[0]?.path || '';
        dispatch({ type: 'SET_ORG', payload: newOrgPath });
        setToLocal('selectedOrgPath', newOrgPath);
      } else {
        dispatch({ type: 'SET_ORG', payload: '' });
        setToLocal('selectedOrgPath', '');
      }
      setInputValue('');
    },
    [userData, dispatch]
  );

  const handleOrgChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newOrgPath = event.target.value;
      dispatch({ type: 'SET_ORG', payload: newOrgPath });
      setToLocal('selectedOrgPath', newOrgPath);
      setInputValue('');
    },
    [dispatch]
  );

  const currentTeam = useMemo(
    () => userData?.teams?.find((team) => team.uid === selectedTeam),
    [selectedTeam, userData]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (
        logoutMenuRef.current &&
        !logoutMenuRef.current.contains(event.target as Node) &&
        !target.closest('button')
      ) {
        setOpenLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLogoutDropdown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setOpenLogout((prev) => !prev);
    },
    []
  );

  useEffect(() => {
    setOpenLogout(false);
    setInputValue(''); // Reset inputValue when navigating to a different page
  }, [location.pathname]);

  // Toggle view for "View All" and "View Less"
  const toggleGroupView = useCallback((category: string) => {
    setExpandedGroups((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  }, []);

  return (
    <div className="tw-relative tw-mx-4 tw-my-2 tw-flex tw-items-start tw-justify-between tw-rounded-md tw-bg-white tw-px-2 tw-py-4">
      {/* Org Name and Logo */}
      {userData ? (
        <div className="tw-flex tw-w-full tw-items-center tw-justify-between">
          <div className="tw-flex tw-justify-center tw-bg-gray-300 tw-p-2 tw-text-2xl tw-font-bold">
            <img
              src={currentTeam?.home.customization.logo}
              height={100}
              width={100}
              style={{ height: '30px' }}
              alt="logo"
            />
          </div>

          {/* Nav Links */}
          <div className="tw-flex tw-items-center tw-text-sm">
            <Tabs
              value={location.pathname}
              centered
              className="tw-flex tw-items-center"
            >
              {navLinks.map((navLink) => (
                <Link to={navLink.linkUrl} key={navLink.id}>
                  <Tab
                    sx={{
                      color: currentTeam?.home.customization.primary,
                      padding: '8px',
                      marginRight: '4px',
                      backgroundColor:
                        location.pathname === navLink.linkUrl ? '#cecece' : '',
                      minHeight: '20px',
                      borderRadius: '8px',
                      ':hover': { backgroundColor: '#cecece' },
                    }}
                    disableRipple
                    label={navLink.label}
                  ></Tab>
                </Link>
              ))}
            </Tabs>
          </div>

          {/* Search */}
          <div className="tw-flex tw-space-x-2">
            <div className="tw-mb-2">
              <Autocomplete
                inputValue={inputValue}
                onInputChange={handleInputChange}
                size="small"
                sx={{ width: 406 }}
                freeSolo
                disableClearable
                options={searchOptions}
                groupBy={(option) => option.category || 'Others'}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.name
                }
                renderGroup={(params) => (
                  <div key={params.key}>
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <li className="tw-ml-4 tw-pt-2 tw-text-lg tw-font-bold">
                        {params.group}
                      </li>
                      <button
                        className="tw-rounded tw-bg-gray-100 tw-px-1 tw-py-0.5 tw-text-xs tw-text-blue-500"
                        onClick={() => toggleGroupView(params.group)}
                      >
                        {expandedGroups.includes(params.group)
                          ? 'View Less'
                          : 'View All'}
                      </button>
                    </div>
                    {expandedGroups.includes(params.group)
                      ? params.children
                      : Array.isArray(params.children)
                        ? params.children.slice(0, 3)
                        : params.children}
                  </div>
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.uid}>
                    <AutocompleteRenderOptionContent option={option} />
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    placeholder="Search"
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchSharpIcon sx={{ transform: 'scaleX(-1)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            {/* Org and Team dropdowns */}
            <div className="tw-flex tw-justify-start tw-space-x-2">
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="team-select-label">Team</InputLabel>
                <Select
                  labelId="team-select-label"
                  value={selectedTeam}
                  onChange={handleTeamChange}
                  sx={{ width: 200 }}
                  label="Team"
                >
                  {userData?.teams.map((team) => (
                    <MenuItem key={team.uid} value={team.uid}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }} size="small">
                {!currentTeam?.orgs || currentTeam.orgs.length === 0 ? (
                  ''
                ) : (
                  <InputLabel id="team-select-label">Org</InputLabel>
                )}
                <Select
                  labelId="org-select-label"
                  value={selectedOrg || ''}
                  onChange={handleOrgChange}
                  sx={{ width: 200 }}
                  disabled={!currentTeam?.orgs || currentTeam.orgs.length === 0}
                  displayEmpty
                  label={
                    !currentTeam?.orgs || currentTeam.orgs.length === 0
                      ? ''
                      : 'Org'
                  }
                >
                  {currentTeam?.orgs && currentTeam.orgs.length > 0 ? (
                    currentTeam.orgs.map((org) => (
                      <MenuItem key={org.path} value={org.path}>
                        {org.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Orgs Available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* User details */}
          <div>
            <div>
              <AccountCircleSharpIcon
                sx={{ marginLeft: '10px', color: 'green' }}
                fontSize="large"
              />
              <button onClick={toggleLogoutDropdown}>
                <ArrowDropDownIcon />
              </button>
            </div>

            {/* Logout dropdown */}
            {openLogout && (
              <div
                ref={logoutMenuRef}
                className="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-rounded-lg tw-border tw-bg-white tw-px-3 tw-py-1 tw-shadow-sm"
              >
                <div className="tw-py-2">
                  <div className="tw-text-sm tw-font-bold">
                    {userData?.preferred_name}
                  </div>

                  <div className="tw-text-xs tw-text-gray-500">
                    {userData?.email}
                  </div>
                </div>

                <Divider />
                <div className="tw-flex tw-items-center tw-py-2">
                  <LogoutIcon fontSize="small" className="tw-mr-2" />
                  <button
                    onClick={() => {
                      setOpenLogout(false);
                      // TODO: Implement logout functionality
                    }}
                    className="tw-text-sm tw-text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : isPending ? (
        <CustomLoader />
      ) : null}

      {error ? (
        <div className="tw-w-full tw-text-center tw-text-base tw-text-red-600">
          {GENERIC_ERROR_MESSAGE}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
