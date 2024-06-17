import { ReactNode } from 'react';
import { Box } from '@mui/material';

const Container = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <Box px={{ xs: 2, sm: 8, md: 10 }}>{children}</Box>;
};

export default Container;
