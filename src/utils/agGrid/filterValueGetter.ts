import { ValueGetterParams } from 'ag-grid-community';

type ElementType<T> = T extends (infer U)[] ? U : T;

function filterValueGetter<T>(keys: (keyof ElementType<T>)[]) {
  return (props: ValueGetterParams): string => {
    const joinKeys = (item: ElementType<T>) =>
      keys.map((key) => item[key] ?? '').join(' ');

    const value = props.getValue(props.column.getColId());

    if (Array.isArray(value)) {
      return value.map(joinKeys).join(' ');
    }
    return joinKeys(value);
  };
}

export { filterValueGetter };
