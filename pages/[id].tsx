import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import Container from './components/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { grey, red } from '@mui/material/colors';

export interface MovieDetailsProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MovieDetails({ movieDetails }: { movieDetails: MovieDetailsProps }) {
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

  return (
    <Container>
      <Link href='/' style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
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
        <Box display='flex' height='600px' bgcolor={theme.palette.mode === 'dark' ? grey[900] : grey[300]} width='100%'>
          <Box position='relative' width='40%' height='600px'>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${movieDetails.poster_path}`}
              alt='movie-poster'
              fill
              loading='lazy'
              sizes='(min-width: 100px) 100vw'
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box p={2} height='100%' width='60%'>
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
            </List>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params as { id: string };
  console.log('id', id);

  try {
    const moviesRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      props: {
        movieDetails: moviesRes.data,
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
