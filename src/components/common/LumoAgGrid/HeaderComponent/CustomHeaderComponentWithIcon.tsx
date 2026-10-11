import { ColumnEvent, SortDirection } from 'ag-grid-community';
import { CustomHeaderProps } from 'ag-grid-react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type CustomHeaderComponentWithIconProps = CustomHeaderProps & {
  Icon: React.ElementType | React.ComponentType;
};

function CustomHeaderComponentWithIcon({
  Icon,
  column,
  enableSorting,
  progressSort,
  showColumnMenu,
  displayName,
  enableFilterButton,
}: CustomHeaderComponentWithIconProps) {
  const [sort, setSort] = useState<SortDirection | undefined>();
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const filterBtn = useRef(null);

  const onSortChanged = useCallback(() => {
    const sort = column?.getSort();
    setSort(sort!);
  }, [setSort, column]);

  const onActiveFilter = useCallback(
    (props: ColumnEvent<'filterActiveChanged'>) => {
      const isActive = props.column?.isFilterActive();
      setFilterActive(isActive!);
    },
    [setFilterActive]
  );

  useEffect(() => {
    column.addEventListener('sortChanged', onSortChanged);
    column.addEventListener('filterActiveChanged', onActiveFilter);
    onSortChanged();

    return () => {
      column.removeEventListener('sortChanged', onSortChanged);
      column.addEventListener('filterActiveChanged', onActiveFilter);
    };
  }, [onSortChanged, column, onActiveFilter]);

  const changeSort = useCallback(() => {
    if (!enableSorting) return;

    progressSort();
  }, [enableSorting, progressSort]);

  const filterBtnClicked = useCallback(() => {
    showColumnMenu(filterBtn.current!);
  }, [showColumnMenu]);

  return (
    <div className="ag-cell-label-container">
      {enableFilterButton && (
        <span
          ref={filterBtn}
          data-ref="eFilterButton"
          className={clsx(
            'ag-header-icon ag-header-cell-filter-button ag-filter',
            {
              'ag-filter-active': filterActive,
            }
          )}
          aria-hidden="true"
          onClick={filterBtnClicked}
        >
          <span className="ag-icon ag-icon-filter" role="presentation"></span>
        </span>
      )}
      <button
        className={clsx(
          `ag-header-cell-label tw-flex tw-h-full tw-w-full tw-flex-col tw-justify-between tw-text-left`,
          {
            'tw-cursor-default': !enableSorting,
          }
        )}
        onClick={changeSort}
      >
        {Icon ? <Icon /> : null}
        <div className="tw-flex tw-w-full tw-pt-1">
          <span className="ag-header-cell-text tw-text-xs" title={displayName}>
            {displayName}
          </span>

          <span
            className="ag-sort-indicator-container"
            data-ref="eSortIndicator"
          >
            <span
              data-ref="eSortAsc"
              className={clsx('ag-sort-indicator-icon ag-sort-ascending-icon', {
                'ag-hidden': sort !== 'asc',
              })}
              aria-hidden="true"
            >
              <span className="ag-icon ag-icon-asc" role="presentation"></span>
            </span>
            <span
              data-ref="eSortDesc"
              className={clsx(
                'ag-sort-indicator-icon ag-sort-descending-icon',
                {
                  'ag-hidden': sort !== 'desc',
                }
              )}
              aria-hidden="true"
            >
              <span className="ag-icon ag-icon-desc" role="presentation"></span>
            </span>
          </span>
        </div>
      </button>
    </div>
  );
}

export default CustomHeaderComponentWithIcon;
