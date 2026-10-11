import { ColDef, INumberFilterParams } from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { TravelerTableRowType } from '../../../types/travelerTableRowType';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import HyperLink from '../LumoAgGrid/CellRenderers/HyperLink';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';
import CustomHeaderComponentWithIcon from '../LumoAgGrid/HeaderComponent/CustomHeaderComponentWithIcon';

export const TravelerTableColumns: ColDef<TravelerTableRowType>[] = [
  {
    field: 'bookingReference',
    pinned: 'left',
    cellRenderer: HyperLink,
    comparator:
      createComparator<TravelerTableRowType['bookingReference']>('label'),
    filterValueGetter: filterValueGetter<
      TravelerTableRowType['bookingReference']
    >(['label']),
  },
  {
    field: 'sequence',
    headerComponent: CustomHeaderComponentWithIcon,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'org',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<TravelerTableRowType['org']>('subtitle'),
    filterValueGetter: filterValueGetter<TravelerTableRowType['org']>([
      'title',
      'subtitle',
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
    filterValueGetter: filterValueGetter<TravelerTableRowType['events']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'group',
    cellRenderer: HyperLink,
    comparator: createComparator<TravelerTableRowType['group']>('description'),
    filterValueGetter: filterValueGetter<TravelerTableRowType['group']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TravelerTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<TravelerTableRowType['departs']>([
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
    comparator: createComparator<TravelerTableRowType['origin']>('title'),
    filterValueGetter: filterValueGetter<TravelerTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TravelerTableRowType['destination']>('title'),
    filterValueGetter: filterValueGetter<TravelerTableRowType['destination']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<TravelerTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<TravelerTableRowType['arrives']>([
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
    filterValueGetter: filterValueGetter<TravelerTableRowType['flights']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'hotels',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<TravelerTableRowType['hotels']>([
      'title',
      'subtitle',
    ]),
    type: 'leftAligned',
  },
  {
    field: 'transport',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<TravelerTableRowType['transport']>([
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
  },
  {
    field: 'delay',
    maxWidth: 120,
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
    cellStyle: { textAlign: 'center' },
  },
];
