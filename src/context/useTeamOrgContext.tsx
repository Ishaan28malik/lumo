import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

interface TeamOrgState {
  selectedTeam: string;
  selectedOrg: string;
}

interface Action {
  type: 'SET_TEAM' | 'SET_ORG';
  payload: string;
}

const initialState: TeamOrgState = {
  selectedTeam: '',
  selectedOrg: '',
};

// Context to store selected team and org ids
const TeamOrgContext = createContext<{
  state: TeamOrgState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const teamOrgReducer = (state: TeamOrgState, action: Action): TeamOrgState => {
  switch (action.type) {
    case 'SET_TEAM':
      return { ...state, selectedTeam: action.payload };
    case 'SET_ORG':
      return { ...state, selectedOrg: action.payload };
    default:
      return state;
  }
};

export const TeamOrgProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(teamOrgReducer, initialState);

  return (
    <TeamOrgContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamOrgContext.Provider>
  );
};

// Custom hook
export const useTeamOrgContext = () => useContext(TeamOrgContext);
