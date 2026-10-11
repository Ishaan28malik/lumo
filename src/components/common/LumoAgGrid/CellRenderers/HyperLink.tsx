import { Link } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

type HyperLinkProps = ICellRendererParams & {
  value: LinkItem[] | LinkItem;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export type LinkItem = {
  label: string;
  href: string;
  description?: string;
};

const LinkItemComponent: React.FC<{ item: LinkItem; target: string }> = ({
  item,
  target,
}) => {
  const { label, href, description } = item;
  return (
    <div className="tw-mb-2.5 tw-mt-1 tw-text-left tw-leading-5 last:tw-mb-1">
      <Link
        target={target}
        className="tw-text-current tw-underline"
        href={href}
      >
        {label}
      </Link>
      {description && <p className="tw-text-xs">{description}</p>}
    </div>
  );
};

const HyperLink: React.FC<HyperLinkProps> = ({ value, target = '_self' }) => {
  return (
    <div className="">
      {Array.isArray(value) ? (
        value.map((item, idx) => (
          <LinkItemComponent key={idx} item={item} target={target} />
        ))
      ) : (
        <LinkItemComponent item={value} target={target} />
      )}
    </div>
  );
};

export default HyperLink;
