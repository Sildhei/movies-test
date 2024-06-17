import Image from 'next/image';
import { Box, Card } from '@mui/material';
import { grey, yellow, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GradeIcon from '@mui/icons-material/Grade';
import { MovieProps } from '@/interfaces';

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        '&:hover': {
          cursor: 'pointer',
          boxShadow: `0px 0px 10px ${
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
          }`,
          transition: 'box-shadow 0.2s ease',
        },
      }}>
      {movie && (
        <Box height='280px' bgcolor={theme.palette.mode === 'dark' ? grey[900] : grey[300]}>
          <div style={{ position: 'relative', width:'100%', height:'180px' }}>
            <Image
              src={movie.poster_path ? `${process.env.NEXT_PUBLIC_BASE_URL}${movie.poster_path}` : '/no-image.jpg'}
              alt='movie-poster'
              fill
              loading='lazy'
              sizes='(min-width: 100px) 100vw'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <Box p={1} pt={2} display='flex' flexDirection='column' justifyContent='space-between' height='100px'>
            <Box
              textAlign='center'
              fontWeight='bold'
              fontSize='14px'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}>
              {movie.title}
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' fontSize='12px'>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <CalendarMonthIcon fontSize='small' style={{ color: red[800] }} />
                <Box ml={1}> {movie.release_date ? movie.release_date.slice(0, 4) : '-'}</Box>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <GradeIcon fontSize='small' style={{ color: yellow[700] }} />
                <Box ml={1}> {movie.vote_average}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default MovieCard;
