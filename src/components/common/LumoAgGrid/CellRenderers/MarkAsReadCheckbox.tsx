import { Checkbox } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import useUpdateMessageStatus from '../../../../api/useUpdateMessageStatus';

interface MarkAsReadCheckboxProps {
  messageId: string;
  initialRead: boolean;
  onStatusChange?: (messageId: string, isRead: boolean) => void;
}

function MarkAsReadCheckbox({
  messageId,
  initialRead,
  onStatusChange,
}: MarkAsReadCheckboxProps) {
  const [read, setRead] = useState(initialRead);
  const { mutate: updateMessageStatus } = useUpdateMessageStatus();

  const markAsRead = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e?.target?.checked;
      setRead(isChecked);

      const params = { messageId, isRead: isChecked };

      // Call the hook with the params object
      updateMessageStatus(params, {
        onSuccess: () => {
          if (onStatusChange) {
            onStatusChange(messageId, isChecked);
          }
        },
        onError: (error) => {
          console.error('Error updating message read status:', error);
        },
      });
    },
    [messageId, onStatusChange, updateMessageStatus]
  );

  useEffect(() => {
    setRead(initialRead);
  }, [initialRead]);

  return <Checkbox checked={read} onChange={markAsRead} />;
}

export default MarkAsReadCheckbox;
