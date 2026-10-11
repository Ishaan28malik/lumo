import { ColDef, INumberFilterParams } from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { TripTableRowType } from '../../../types/tripsTableRowType';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import HyperLink from '../LumoAgGrid/CellRenderers/HyperLink';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';

export const TripTableColumns: ColDef<TripTableRowType>[] = [
  {
    field: 'bookingReference',
    pinned: 'left',
    cellRenderer: HyperLink,
    comparator: createComparator<TripTableRowType['bookingReference']>('label'),
    filterValueGetter: filterValueGetter<TripTableRowType['bookingReference']>([
      'label',
    ]),
  },
  {
    field: 'sequence',
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'org',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<TripTableRowType['org']>('subtitle'),
    filterValueGetter: filterValueGetter<TripTableRowType['org']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'primaryTraveler',
    cellRenderer: HyperLink,
    comparator:
      createComparator<TripTableRowType['primaryTraveler']>('description'),
    filterValueGetter: filterValueGetter<TripTableRowType['primaryTraveler']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'travelers',
    maxWidth: 104,
    filter: 'agNumberColumnFilter',

    cellStyle: { textAlign: 'right' },
  },
  {
    field: 'events',
    sortable: false,
    cellRenderer: HyperLink,
    filterValueGetter: filterValueGetter<TripTableRowType['events']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'group',
    cellRenderer: HyperLink,
    comparator: createComparator<TripTableRowType['group']>('description'),
    filterValueGetter: filterValueGetter<TripTableRowType['group']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TripTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<TripTableRowType['departs']>([
      'fullDateTime',
    ]),
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'origin',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TripTableRowType['origin']>('title'),
    filterValueGetter: filterValueGetter<TripTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TripTableRowType['destination']>('title'),
    filterValueGetter: filterValueGetter<TripTableRowType['destination']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TripTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<TripTableRowType['arrives']>([
      'title',
    ]),
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'stops',
    maxWidth: 104,
    filter: 'agNumberColumnFilter',

    cellStyle: { textAlign: 'right' },
  },
  {
    field: 'flights',
    sortable: false,
    cellRenderer: HyperLink,
    filterValueGetter: filterValueGetter<TripTableRowType['flights']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'hotels',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<TripTableRowType['hotels']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'transport',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<TripTableRowType['transport']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'cancelled',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 120,

    cellStyle: { textAlign: 'center' },
    type: 'centerAligned',
  },
  {
    field: 'delay',
    maxWidth: 120,
    cellClass: (params) => getDelayClass(params.value),
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
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
  },
  {
    field: 'misconnect',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'avgRiskScore',
    maxWidth: 120,
    cellClass: (params) => getAvgRiskScoreClass(params.value),
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
  },
  {
    field: 'waiver',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 120,
    type: 'centerAligned',
    cellStyle: { textAlign: 'center' },
  },
];
