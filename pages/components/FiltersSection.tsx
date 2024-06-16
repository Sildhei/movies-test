import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

export interface GenreProps {
  id: number;
  name: string;
}

const FiltersSection = ({ genresData }: { genresData: { genres: GenreProps[] } }) => {
  const [genre, setGenre] = useState();

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' my={2} fontSize='medium'>
      <h1>Movies List</h1>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>Filter by:</Box>
        <TextField id='outlined-search' label='Name' type='search' size='small' sx={{ fontSize: 'small', ml: 2 }} />
        <FormControl sx={{ ml: 2, width: 150 }} size='small'>
          <InputLabel id='demo-select-small-label'>Genre</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={genre}
            label='Genre'
            onChange={e => console.log('e')}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {genresData.genres.map(genre => (
              <MenuItem value={genre.id} key={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default FiltersSection;
