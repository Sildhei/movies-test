import { useSelector } from 'react-redux';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Box, Card, List, ListItem } from '@mui/material';
import { MovieDetailsProps, MovieProps } from '@/interfaces';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey, red } from '@mui/material/colors';
import Container from './components/Container';

export default function MovieDetails({
  movieDetails,
  similarMovies,
}: {
  movieDetails: MovieDetailsProps;
  similarMovies: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
}) {
  const formatCurrency = (amount: number) => {
    const parsed = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return parsed.replace(/,/g, '.');
  };

  const theme = useTheme();

  const filters = useSelector(
    (state: {
      filtersSetting: {
        name: string;
        genre: string;
      };
    }) => state.filtersSetting
  );

  return (
    <Container>
      <Link
        href={`/?name=${filters.name}&genre=${filters.genre}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
        <Box
          display='flex'
          alignItems='center'
          sx={{
            '&:hover': {
              cursor: 'pointer',
              color: `${red[800]}`,
              transition: 'box-shadow 0.2s ease',
            },
          }}>
          <ArrowBackIcon />
          <p>Go Back</p>
        </Box>
      </Link>

      <Card
        sx={{
          marginBottom: 5,
          '&:hover': {
            boxShadow: `0px 0px 10px ${
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
            }`,
            transition: 'box-shadow 0.2s ease',
          },
        }}>
        {movieDetails && (
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            height={{ xs: 'full', md: '600px' }}
            bgcolor={theme.palette.mode === 'dark' ? grey[900] : grey[300]}
            width='100%'>
            <Box position='relative' width={{ xs: '100%', md: '40%' }} height={{ xs: '400px', md: '600px' }}>
              <Image
                src={
                  movieDetails.poster_path
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}${movieDetails.poster_path}`
                    : '/no-image.jpg'
                }
                alt='movie-poster'
                fill
                loading='lazy'
                sizes='(min-width: 100px) 100vw'
                style={{
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box p={2} height='100%' width={{ xs: '100%', md: '60%' }} overflow='scroll'>
              <Box fontWeight='bold' fontSize='24px'>
                <h3 style={{ margin: 0 }}>{movieDetails.title}</h3>
              </Box>
              <List>
                <ListItem>{movieDetails.overview}</ListItem>
                <ListItem>Country: {movieDetails.origin_country}</ListItem>
                <ListItem>Release Date: {movieDetails.release_date}</ListItem>
                <ListItem>Budget: {formatCurrency(movieDetails.budget)}</ListItem>
                <ListItem>Revenue: {formatCurrency(movieDetails.revenue)}</ListItem>
                <ListItem>Rating: {movieDetails.vote_average}</ListItem>
                <ListItem>Vote Count: {movieDetails.vote_count}</ListItem>
                <ListItem>Status: {movieDetails.status}</ListItem>
                <ListItem>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</ListItem>
                <ListItem>
                  Similar:
                  <Box display='flex' flexWrap='wrap'>
                    {similarMovies.results.slice(0, 3).map((movie, index) => (
                      <Box key={movie.id}>
                        <Link
                          href={`/${movie.id}`}
                          style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                          <Box
                            paddingLeft='4px'
                            sx={{
                              '&:hover': {
                                cursor: 'pointer',
                                color: `${red[800]}`,
                                transition: 'box-shadow 0.2s ease',
                              },
                            }}>
                            {movie.title}
                          </Box>
                        </Link>
                        {index < similarMovies.results.slice(0, 3).length - 1 && ','}
                      </Box>
                    ))}
                  </Box>
                </ListItem>
              </List>
            </Box>
          </Box>
        )}
      </Card>
    </Container>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params as { id: string };

  try {
    const moviesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const similarRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      props: {
        movieDetails: moviesRes.data,
        similarMovies: similarRes.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data.',
      },
    };
  }
};
