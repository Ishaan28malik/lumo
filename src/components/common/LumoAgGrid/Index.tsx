import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  RowClickedEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Ref, useCallback, useEffect, useMemo, useState } from 'react';

import CustomLoadingCellRenderer from './CellRenderers/CustomLoadingCellRenderer';
import CustomDateComponent from './CustomDateComponent';
import CustomHeaderComponentWithIcon from './HeaderComponent/CustomHeaderComponentWithIcon';

type LumoAgGridProps<T> = {
  columns: ColDef<T>[];
  rows: T[];
  gridRef?: Ref<AgGridReact<T>>;
  onGridReady?: (event: GridReadyEvent<T>) => void;
  height?: number;
  maxHeight?: number;
  minHeight?: number;
  defaultColDef?: ColDef<T>;
  showQuickFilter?: boolean;
  autoSizeStrategy?:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy;
  onRowClicked?: (e: RowClickedEvent<T>) => void;
  isLoading?: boolean;
};

function LumoAgGrid<T>({
  columns,
  rows,
  gridRef,
  onGridReady,
  height = 500,
  maxHeight,
  minHeight,
  defaultColDef = {
    filter: true,
    autoHeaderHeight: true,
    floatingFilter: false,
    autoHeight: true,
  },
  autoSizeStrategy = { type: 'fitCellContents' },
  onRowClicked,
  isLoading = false,
}: LumoAgGridProps<T>) {
  const components = useMemo(
    () => ({
      agColumnHeader: CustomHeaderComponentWithIcon,
      agDateInput: CustomDateComponent,
    }),
    []
  );

  const rowHeight = 85;
  const [hideScrollbar, setHideScrollbar] = useState(false);

  const calculatedHeight = Math.max(
    Math.min((rows?.length || 0) * rowHeight, maxHeight ?? height),
    minHeight ?? 0
  );

  // Handle scroll hiding logic
  const handleHideScrollbar = useCallback(
    (api: { getDisplayedRowCount: () => number }) => {
      const gridHeight = api.getDisplayedRowCount() * rowHeight;
      setHideScrollbar(gridHeight <= (maxHeight ?? height));
    },
    [height, maxHeight, rowHeight]
  );

  useEffect(() => {
    if (
      gridRef &&
      'current' in gridRef &&
      gridRef.current &&
      gridRef.current.api
    ) {
      const api = gridRef.current.api;

      if (isLoading) {
        api.showLoadingOverlay();
      } else {
        api.hideOverlay();
      }

      handleHideScrollbar(api); // Hide scrollbar after first render
    }
  }, [isLoading, gridRef, handleHideScrollbar]);

  // Use the onFirstDataRendered event to handle the visibility of the scrollbar
  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent) => {
      handleHideScrollbar(params.api); // Ensure the scrollbar is recalculated after data is loaded
    },
    [handleHideScrollbar]
  );

  return (
    <div
      className={`ag-theme-alpine p-3 w-full ${
        hideScrollbar ? 'ag-body-vertical-scroll-hidden' : ''
      }`}
      style={{ height: calculatedHeight, maxHeight }}
    >
      <AgGridReact<T>
        ref={gridRef}
        defaultColDef={defaultColDef}
        loadingOverlayComponent={CustomLoadingCellRenderer}
        rowData={rows}
        columnDefs={columns}
        onGridReady={onGridReady}
        onFirstDataRendered={onFirstDataRendered} // Ensure data is fully loaded
        components={components}
        autoSizeStrategy={autoSizeStrategy}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

export default LumoAgGrid;
