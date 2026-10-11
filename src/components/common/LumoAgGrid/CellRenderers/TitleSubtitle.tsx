import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';

type TitleSubtitleProps = ICellRendererParams & {
  value: TitleSubtitleData[] | TitleSubtitleData;
  isTitleBold?: boolean;
  isTextCenter?: boolean;
};

export type TitleSubtitleData = { title: string; subtitle?: string };

const TitleSubtitleItem: React.FC<{
  item: TitleSubtitleData;
  isTitleBold: boolean;
  isTextCenter: boolean;
}> = ({ item, isTitleBold, isTextCenter }) => {
  return (
    <div
      className={`tw-leading-5 ${
        isTextCenter ? 'tw-text-center' : 'tw-text-left'
      }`}
    >
      <p className={clsx({ 'tw-font-medium': isTitleBold })}>{item.title}</p>
      <p className="tw-text-xs">{item.subtitle}</p>
    </div>
  );
};

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  value,
  isTitleBold = false,
  isTextCenter = false,
}) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2.5">
      {Array.isArray(value) ? (
        value.map((item, idx) => (
          <TitleSubtitleItem
            key={idx}
            item={item}
            isTitleBold={isTitleBold}
            isTextCenter={isTextCenter}
          />
        ))
      ) : (
        <TitleSubtitleItem
          item={value}
          isTitleBold={isTitleBold}
          isTextCenter={isTextCenter}
        />
      )}
    </div>
  );
};

export default TitleSubtitle;
