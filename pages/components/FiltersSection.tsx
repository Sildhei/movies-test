import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { nameSetting, genreSetting } from '../../redux/filters';

export interface GenreProps {
  id: number;
  name: string;
}

const FiltersSection = ({ genresData }: { genresData: { genres: GenreProps[] } }) => {
  const router = useRouter();

  const filters = useSelector(
    (state: {
      filtersSetting: {
        name: string;
        genre: string;
      };
    }) => state.filtersSetting
  );

  const [inputValue, setInputValue] = useState(filters.name);

  const dispatch = useDispatch();

  const handleDeleteSearchInput = () => {
    dispatch(nameSetting(''));
    setInputValue('');
    router.push('/');
  };

  const handleOnClearFilters = () => {
    dispatch(genreSetting(''));
    dispatch(nameSetting(''));
    setInputValue('');
    router.push('/');
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(genreSetting(e.target.value));
    dispatch(nameSetting(''));
    setInputValue('');
    router.push(`/?genre=${e.target.value}`);
  };

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    const delayInputTimeoutId = setTimeout(() => {
      dispatch(nameSetting(inputValue));
      dispatch(genreSetting(''));
      router.push(`/?name=${inputValue}`);
    }, 500);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, router, dispatch]);

  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      my={2}
      fontSize='medium'>
      <h1>Movies List</h1>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 2, sm: 0 }}
        justifyContent='space-between'
        alignItems='center'>
        <Box>Filter by:</Box>
        <TextField
          id={inputValue}
          label='Name'
          size='small'
          sx={{ fontSize: 'small', ml: 2 }}
          value={inputValue}
          onChange={e => handleInput(e)}
          InputProps={{
            endAdornment: inputValue && (
              <IconButton onClick={handleDeleteSearchInput}>
                <ClearIcon fontSize='small' />
              </IconButton>
            ),
          }}
        />
        <FormControl sx={{ ml: 2, width: 150 }}>
          <TextField
            size='small'
            select
            id={filters.genre}
            value={filters.genre}
            label='Genre'
            onChange={e => handleSelect(e)}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {genresData?.genres?.map(genre => (
              <MenuItem value={genre.id} key={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button
          onClick={handleOnClearFilters}
          variant='contained'
          sx={{
            marginLeft: 2,
            bgcolor: red[800],
            '&:hover': {
              bgcolor: red[600],
            },
          }}>
          <Box>Clear</Box>
        </Button>
      </Box>
    </Box>
  );
};

export default FiltersSection;
