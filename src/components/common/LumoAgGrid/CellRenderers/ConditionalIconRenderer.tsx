import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

type ConditionalIconProps = ICellRendererParams & {
  value: boolean;
  Icon: React.ElementType;
};

function ConditionalIconRenderer({ value, Icon }: ConditionalIconProps) {
  if (!value) return null;
  return <Icon />;
}

export default ConditionalIconRenderer;
