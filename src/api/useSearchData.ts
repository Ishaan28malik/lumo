import { useQuery } from '@tanstack/react-query';

import { searchApiUrl } from '../constants/apiUrls';
import { SearchData, SearchQueryParams } from '../types/searchData';
import api from './api';

const useSearchData = ({ org, team, searchText }: SearchQueryParams) => {
  return useQuery({
    queryKey: ['search', org, team, searchText],
    queryFn: () =>
      api.get<SearchData>(
        `${searchApiUrl}?org=${org}&team=${team}&search_text=${searchText}`
      ),
    enabled: !!searchText,
  });
};

export default useSearchData;
