import { Box } from '@mui/material';
import React from 'react';
import { ReactNode } from 'react';

const Container = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <Box px={{ xs: 2, sm: 8, md: 10 }}>{children}</Box>;
};

export default Container;
