import { ColDef, INumberFilterParams } from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { GroupTableRowType } from '../../../types/groupTableRowType';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import HyperLink from '../LumoAgGrid/CellRenderers/HyperLink';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';
import CustomHeaderComponentWithIcon from '../LumoAgGrid/HeaderComponent/CustomHeaderComponentWithIcon';

export const GroupTableColumns: ColDef<GroupTableRowType>[] = [
  {
    field: 'bookingReference',
    pinned: 'left',
    cellRenderer: HyperLink,
    comparator:
      createComparator<GroupTableRowType['bookingReference']>('label'),
    filterValueGetter: filterValueGetter<GroupTableRowType['bookingReference']>(
      ['label']
    ),
  },
  {
    field: 'sequence',
    headerComponent: CustomHeaderComponentWithIcon,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'org',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<GroupTableRowType['org']>('subtitle'),
    filterValueGetter: filterValueGetter<GroupTableRowType['org']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'primaryTraveler',
    cellRenderer: HyperLink,
    comparator:
      createComparator<GroupTableRowType['primaryTraveler']>('description'),
    filterValueGetter: filterValueGetter<GroupTableRowType['primaryTraveler']>([
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
    filterValueGetter: filterValueGetter<GroupTableRowType['events']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<GroupTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<GroupTableRowType['departs']>([
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
    comparator: createComparator<GroupTableRowType['origin']>('title'),
    filterValueGetter: filterValueGetter<GroupTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<GroupTableRowType['destination']>('title'),
    filterValueGetter: filterValueGetter<GroupTableRowType['destination']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<GroupTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<GroupTableRowType['arrives']>([
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
    filterValueGetter: filterValueGetter<GroupTableRowType['flights']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'hotels',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<GroupTableRowType['hotels']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'transport',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<GroupTableRowType['transport']>([
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
