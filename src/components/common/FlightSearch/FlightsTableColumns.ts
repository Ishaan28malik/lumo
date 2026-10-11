import { ColDef, INumberFilterParams } from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { FlightSearchTableRowType } from '../../../types/flightSearchTable';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';

export const FlightsTableColumns: ColDef<FlightSearchTableRowType>[] = [
  {
    field: 'airline',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<FlightSearchTableRowType['airline']>('title'),
    cellStyle: { cursor: 'pointer' },
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['airline']>([
      'title',
    ]),
    flex: 1,
  },
  {
    field: 'flightNo',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<FlightSearchTableRowType['flightNo']>('title'),
    cellStyle: { cursor: 'pointer' },
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['flightNo']>([
      'title',
    ]),
    maxWidth: 150,
    flex: 0.5,
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<FlightSearchTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    cellStyle: { cursor: 'pointer' },
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['departs']>([
      'fullDateTime',
    ]),
    filterParams: {
      comparator: dateFilterComparator,
    },
    flex: 1,
  },
  {
    field: 'origin',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<FlightSearchTableRowType['origin']>('title'),
    cellStyle: { cursor: 'pointer' },
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
    flex: 1,
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator:
      createComparator<FlightSearchTableRowType['destination']>('title'),
    cellStyle: { cursor: 'pointer' },
    filterValueGetter: filterValueGetter<
      FlightSearchTableRowType['destination']
    >(['title', 'subtitle']),
    flex: 1,
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<FlightSearchTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    cellStyle: { cursor: 'pointer' },
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['arrives']>([
      'title',
    ]),
    filterParams: {
      comparator: dateFilterComparator,
    },
    flex: 1,
  },
  {
    field: 'status',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<FlightSearchTableRowType['status']>('title'),
    filterValueGetter: filterValueGetter<FlightSearchTableRowType['status']>([
      'title',
    ]),
    maxWidth: 120,
    flex: 0.7,
  },
  {
    field: 'cancelled',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'delay',
    maxWidth: 100,
    cellClass: (params) => getDelayClass(params.value),
    filter: 'agNumberColumnFilter',
    filterParams: {
      filterOptions: [
        'equals',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
      ],
    } as INumberFilterParams,
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
    flex: 0.5,
  },
  {
    field: 'misconnect',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 120,
    cellStyle: { textAlign: 'center' },
    flex: 0.6,
  },
  {
    field: 'avgRiskScore',
    maxWidth: 120,
    cellClass: (params) => getAvgRiskScoreClass(params.value),
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
    flex: 0.5,
  },
  {
    field: 'waiver',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 100,
    cellStyle: { textAlign: 'center' },
    flex: 0.7,
  },
];
