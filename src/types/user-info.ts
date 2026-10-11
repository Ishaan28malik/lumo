type Team = {
  uid: string;
  name: string;
  home: {
    path: string;
    customization: {
      logo: string;
      primary: string;
    };
  };
  orgs: {
    path: string;
    name: string;
  }[];
};

export type UserInfo = {
  uid: string;
  name: string;
  preferred_name: string;
  email: string;
  teams: Team[];
};
