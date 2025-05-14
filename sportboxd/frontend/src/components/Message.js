import React from 'react';
import { Alert } from '@mui/material';

const Message = ({ severity = 'info', children }) => {
  return <Alert severity={severity} sx={{ my: 2 }}>{children}</Alert>;
};

export default Message;