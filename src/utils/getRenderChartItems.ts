export const getRenderChartItem = (
  item: number,
  index?: number,
  renderLi?: (props: {
    key: number | undefined;
    className: string;
  }) => JSX.Element | null,
  delayCountRef?: React.MutableRefObject<number>
) => {
  if (item !== undefined) {
    const key = index;
    if (item < 30) {
      return renderLi?.({
        key,
        className: 'less-30 chart-elem clr1',
      });
    } else if (item < 60) {
      if (delayCountRef) delayCountRef.current++;
      return renderLi?.({
        key,
        className: 'less-60 chart-elem clr2',
      });
    } else if (item < 120) {
      if (delayCountRef) delayCountRef.current++;
      return renderLi?.({
        key,
        className: 'less-120 chart-elem clr3',
      });
    } else if (item < 10000) {
      if (delayCountRef) delayCountRef.current++;
      return renderLi?.({
        key,
        className: 'high-120 chart-elem clr4',
      });
    } else if (item === 10002) {
      return renderLi?.({
        key,
        className: 'no-data chart-elem clr5',
      });
    } else {
      return renderLi?.({
        key,
        className: 'no-data chart-elem clr5',
      });
    }
  } else {
    return null;
  }
};
