import { Tab, Tabs } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useRef, useState } from 'react';

import { useSummaryStats } from '../../../api/useSummaryStats';
import { tabConfig } from '../../../constants/summaryGroupTabList';
import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import LumoAgGrid from '../LumoAgGrid/Index';
import { SummaryStatsTableColumns } from './SummaryStatsColumns';

type SummaryStatsTableProps = {
  minHeight?: number;
  maxHeight?: number;
};

function SummaryStatsTable({
  minHeight = 200,
  maxHeight = 250,
}: SummaryStatsTableProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  const params = useMemo(() => {
    if (!selectedOrg || !selectedTeam) {
      return null;
    }
    return {
      org: selectedOrg,
      team: selectedTeam,
      groupBy: tabConfig[selectedTab].value,
    };
  }, [selectedOrg, selectedTeam, selectedTab]);

  const { data: summaryStatsResponse, isLoading } = useSummaryStats({
    params: params!,
  });

  const filteredData = useMemo(() => {
    if (!summaryStatsResponse) return [];
    const data = summaryStatsResponse.data;
    if (!Array.isArray(data)) {
      return [data];
    }
    return data;
  }, [summaryStatsResponse]);

  const columns = useMemo<ColDef[]>(
    () => SummaryStatsTableColumns[selectedTab],
    [selectedTab]
  );

  const gridRef = useRef<AgGridReact>(null);

  // ToDo remove this once we have the actual data from the API
  const gridRows =
    selectedOrg === '.apple.inc' &&
    selectedTeam === 'fa2f9d1e-2218-4107-bfd3-d1e8dd5ee091'
      ? []
      : filteredData;

  return (
    <div className="tw-w-3/5 tw-rounded-md tw-border tw-py-2">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="summary-tabs"
        sx={{ display: 'flex', marginLeft: '0.75em' }}
      >
        {tabConfig.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              textTransform: 'none',
              marginX: 1,
              minWidth: 'auto',
              padding: '0px',
            }}
          />
        ))}
      </Tabs>
      <div className="tw-px-5 tw-py-2 tw-text-left">
        <LumoAgGrid
          columns={columns}
          rows={gridRows}
          isLoading={isLoading}
          autoSizeStrategy={{ type: 'fitCellContents' }}
          gridRef={gridRef}
          maxHeight={maxHeight}
          minHeight={minHeight}
        />
      </div>
    </div>
  );
}

export default SummaryStatsTable;
