import { ColDef, INumberFilterParams } from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { WaiverTableRowType } from '../../../types/waiverTableRowType';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import HyperLink from '../LumoAgGrid/CellRenderers/HyperLink';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';
import CustomHeaderComponentWithIcon from '../LumoAgGrid/HeaderComponent/CustomHeaderComponentWithIcon';

export const WaiverTableColumns: ColDef<WaiverTableRowType>[] = [
  {
    field: 'bookingReference',
    pinned: 'left',
    cellRenderer: HyperLink,
    comparator:
      createComparator<WaiverTableRowType['bookingReference']>('label'),
    filterValueGetter: filterValueGetter<
      WaiverTableRowType['bookingReference']
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
    comparator: createComparator<WaiverTableRowType['org']>('subtitle'),
    filterValueGetter: filterValueGetter<WaiverTableRowType['org']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'primaryTraveler',
    cellRenderer: HyperLink,
    comparator:
      createComparator<WaiverTableRowType['primaryTraveler']>('description'),
    filterValueGetter: filterValueGetter<WaiverTableRowType['primaryTraveler']>(
      ['label', 'description']
    ),
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
    filterValueGetter: filterValueGetter<WaiverTableRowType['events']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'group',
    cellRenderer: HyperLink,
    comparator: createComparator<WaiverTableRowType['group']>('description'),
    filterValueGetter: filterValueGetter<WaiverTableRowType['group']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<WaiverTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<WaiverTableRowType['departs']>([
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
    comparator: createComparator<WaiverTableRowType['origin']>('title'),
    filterValueGetter: filterValueGetter<WaiverTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<WaiverTableRowType['destination']>('title'),
    filterValueGetter: filterValueGetter<WaiverTableRowType['destination']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<WaiverTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<WaiverTableRowType['arrives']>([
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
    filterValueGetter: filterValueGetter<WaiverTableRowType['flights']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'hotels',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<WaiverTableRowType['hotels']>([
      'title',
      'subtitle',
    ]),
    type: 'leftAligned',
  },
  {
    field: 'transport',
    sortable: false,
    cellRenderer: TitleSubtitle,
    filterValueGetter: filterValueGetter<WaiverTableRowType['transport']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'cancelled',
    cellRenderer: ConditionalIconRenderer,
    cellRendererParams: { Icon: RedFlagIcon },
    maxWidth: 120,
    cellStyle: { textAlign: 'center', fontWeight: 'bold' },
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
];
