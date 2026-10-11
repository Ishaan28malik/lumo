import {
  ColDef,
  ICellRendererParams,
  INumberFilterParams,
} from 'ag-grid-community';

import '../../../styles/delayLegend.css';
import { QueueTableRowType } from '../../../types/queuesTableRowType';
import { dateFilterComparator } from '../../../utils/agGrid/dateFilterComparator';
import { filterValueGetter } from '../../../utils/agGrid/filterValueGetter';
import { createComparator } from '../../../utils/agGrid/sortingComparator';
import { getAvgRiskScoreClass, getDelayClass } from '../../../utils/colors';
import RedFlagIcon from '../IconWrapper/RedFlagIcon';
import ConditionalIconRenderer from '../LumoAgGrid/CellRenderers/ConditionalIconRenderer';
import HyperLink from '../LumoAgGrid/CellRenderers/HyperLink';
import MarkAsReadCheckbox from '../LumoAgGrid/CellRenderers/MarkAsReadCheckbox';
import TitleSubtitle from '../LumoAgGrid/CellRenderers/TitleSubtitle';
import CustomHeaderComponentWithIcon from '../LumoAgGrid/HeaderComponent/CustomHeaderComponentWithIcon';

export const QueueTableColumns: ColDef<QueueTableRowType>[] = [
  {
    field: 'read',
    pinned: 'left',
    headerName: 'Mark as read',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<QueueTableRowType>) => {
      if (!params.data) {
        return null;
      }
      const isRead = params.data.select;
      // ToDo we will remove this once original data , since we don't have the access to uid directly
      const messageId =
        params.data.bookingReference.href.split('/').pop() ?? 'unknown-id';

      const handleStatusChange = (messageId: string, newStatus: boolean) => {
        params.node.setDataValue('select', newStatus);
      };

      return (
        <MarkAsReadCheckbox
          messageId={messageId}
          initialRead={isRead}
          onStatusChange={handleStatusChange}
        />
      );
    },
    filter: false,
  },
  {
    field: 'bookingReference',
    cellRenderer: HyperLink,
    pinned: 'left',
    comparator:
      createComparator<QueueTableRowType['bookingReference']>('label'),
    filterValueGetter: filterValueGetter<QueueTableRowType['bookingReference']>(
      ['label']
    ),
    type: 'leftAligned',
  },
  {
    field: 'sequence',
    headerComponent: CustomHeaderComponentWithIcon,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'org',
    cellRenderer: TitleSubtitle,
    comparator: createComparator<QueueTableRowType['org']>('subtitle'),
    filterValueGetter: filterValueGetter<QueueTableRowType['org']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'primaryTraveler',
    cellRenderer: HyperLink,
    comparator:
      createComparator<QueueTableRowType['primaryTraveler']>('description'),
    filterValueGetter: filterValueGetter<QueueTableRowType['primaryTraveler']>([
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
    filterValueGetter: filterValueGetter<QueueTableRowType['events']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'group',
    cellRenderer: HyperLink,
    comparator: createComparator<QueueTableRowType['group']>('description'),
    filterValueGetter: filterValueGetter<QueueTableRowType['group']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'departs',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<QueueTableRowType['departs']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<QueueTableRowType['departs']>([
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
    comparator: createComparator<QueueTableRowType['origin']>('title'),
    filterValueGetter: filterValueGetter<QueueTableRowType['origin']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'destination',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<QueueTableRowType['destination']>('title'),
    filterValueGetter: filterValueGetter<QueueTableRowType['destination']>([
      'title',
      'subtitle',
    ]),
  },
  {
    field: 'arrives',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    comparator: createComparator<QueueTableRowType['arrives']>(
      'fullDateTime',
      'date'
    ),
    filter: 'agDateColumnFilter',
    filterValueGetter: filterValueGetter<QueueTableRowType['arrives']>([
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
    filterValueGetter: filterValueGetter<QueueTableRowType['flights']>([
      'label',
      'description',
    ]),
  },
  {
    field: 'alertType',
    headerName: 'Alert Type',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
  },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'contact',
    headerName: 'Contact',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },

    cellStyle: { textAlign: 'right' },
  },
  {
    field: 'channel',
    headerName: 'Channel',
    cellRenderer: TitleSubtitle,
    cellRendererParams: { isTitleBold: true },
  },
  {
    field: 'summary',
    headerName: 'Summary',
    cellRenderer: TitleSubtitle,
    type: 'leftAligned',
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
    maxWidth: 150,
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
    maxWidth: 150,
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
