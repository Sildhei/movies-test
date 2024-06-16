import { Box, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Link from 'next/link';

const NavBar = ({ colorMode }: { colorMode: { toggleColorMode: () => void } }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 2,
          borderBottom: 1,
          borderColor: 'gray',
        }}>
        <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box display='flex' alignItems='center' gap={1}>
            <LiveTvIcon fontSize='large' />
            <Box fontSize='large' fontWeight='bold'>
              Movies Test
            </Box>
          </Box>
        </Link>
        <Box display='flex' alignItems='center'>
          <Brightness5Icon />
          <Switch onClick={colorMode.toggleColorMode} />
          <DarkModeIcon />
        </Box>
        {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
          {theme.palette.mode === 'dark' ? 'dark' : 'light'}
        </IconButton> */}
      </Box>
    </div>
  );
};

export default NavBar;
