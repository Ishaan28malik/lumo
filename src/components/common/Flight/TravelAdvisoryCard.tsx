import {
  Link as MUILink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { TravelAdvisory } from '../../../types/booking';

type TravelAdvisoryCardProps = {
  travelAdvisory: TravelAdvisory[];
};
type LinkTo =
  | string
  | {
      pathname: string;
      state?: { row: TravelAdvisory };
    };

function TravelAdvisoryCard({ travelAdvisory }: TravelAdvisoryCardProps) {
  return (
    <TableContainer className="tw-rounded tw-border tw-border-gray-200 tw-px-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="!tw-pb-0 !tw-font-bold">Summary</TableCell>
            <TableCell className="!tw-pb-0 !tw-font-bold">
              Advisory type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {travelAdvisory?.map((row) => {
            const isWaiver = row?.type === 'waiver';
            const to: LinkTo = isWaiver
              ? { pathname: `/waiver/${row.id}`, state: { row } }
              : row?.url;
            const target = isWaiver ? '_self' : '_blank';
            return (
              <TableRow
                key={row?.id}
                className="even:tw-bg-customGray [&>td]:tw-border-0"
              >
                <TableCell component="td" scope="row">
                  <MUILink
                    component={RouterLink}
                    to={to}
                    state={isWaiver ? { row } : undefined}
                    target={target}
                  >
                    {row?.advisory}
                  </MUILink>
                </TableCell>
                <TableCell className="tw-capitalize">{row?.type}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TravelAdvisoryCard;
