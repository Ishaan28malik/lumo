import { Slider } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';

type LabeledSliderProps = {
  value: number;
  onDragEnd: (name: string, newValue: number) => void;
  min: number;
  max: number;
  label: string;
  name: string;
  step?: number;
};

function LabeledSlider({
  value,
  onDragEnd,
  min,
  max,
  label,
  name,
  step = 1,
}: LabeledSliderProps) {
  const [slider, setSlider] = useState(value);

  const onRangeFilterChange = useCallback(
    (e: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        setSlider(newValue);
      }
    },
    []
  );

  const onChangeCommitted = useCallback(
    (
      event: Event | SyntheticEvent<Element, Event>,
      value: number | number[]
    ) => {
      if (typeof value === 'number') onDragEnd(name, value);
    },
    [onDragEnd, name]
  );

  return (
    <div className="tw-w-full tw-max-w-xs">
      <div className="tw-flex tw-w-full tw-justify-between">
        <p className="tw-text-sm tw-font-medium">{label}</p>
        <p className="tw-text-sm tw-font-normal">
          {slider}/ {max}
        </p>
      </div>
      <Slider
        name={name}
        value={slider}
        onChange={onRangeFilterChange}
        max={max}
        min={min}
        step={step}
        onChangeCommitted={onChangeCommitted}
      />
    </div>
  );
}

export default LabeledSlider;
