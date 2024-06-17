import Link from 'next/link';
import { Box, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import LiveTvIcon from '@mui/icons-material/LiveTv';

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
            <div style={{ width: 32, height: 32 }}>
              <LiveTvIcon fontSize='large' />
            </div>

            <Box fontSize='large' fontWeight='bold'>
              Movies Test
            </Box>
          </Box>
        </Link>
        <Box display='flex' alignItems='center'>
          <div style={{ width: 32, height: 32 }}>
            <Brightness5Icon />
          </div>
          <Switch onClick={colorMode.toggleColorMode} />
          <div style={{ width: 32, height: 32 }}>
            <DarkModeIcon />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default NavBar;
