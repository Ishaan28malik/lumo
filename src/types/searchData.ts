export type ItemDetails = {
  category: string;
  uid: string;
  name: string;
  baseUrl: string;
  icon: string;
};

export type SearchData = ItemDetails[];

export type SearchQueryParams = {
  org: string;
  team: string;
  searchText: string;
};
