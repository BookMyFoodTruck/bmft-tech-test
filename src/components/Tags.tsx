import React from 'react';
import { NextPage } from 'next';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';

interface Film {
  title: string;
}
interface Props {
  placeholder: string;
  TagsValue?: Film[];
  setTagsValue: any;
  control?: any;
}

const Tags: NextPage<Props> = ({
  placeholder,
  TagsValue,
  setTagsValue,
  control,
}) => {
  const onDelete = (title: string) => () => {
    if (TagsValue) {
      const updatedTags = TagsValue.filter(v => v.title !== title);
      setTagsValue(updatedTags);
    }
  };

  const tagsStyle = {
    '& .css-1h51icj-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':
      { padding: '1px 4px 1px 5px' },
    '& .css-18nc3u2 .MuiOutlinedInput-root .MuiAutocomplete-input': {
      padding: '1px 4px 1px 5px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      borderColor: '#CCCCCC',
    },
    '& .MuiButtonBase-root': { maxWidth: 90 },
    width: '100%',
    '& .css-1a323qw': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      marginTop: '16px',
      padding: '0px 2px',
    },
  };

  return (
    <Box sx={tagsStyle} className='focus:border-0 rounded-xl'>
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            freeSolo
            options={top100Films}
            defaultValue={[top100Films[13]]}
            getOptionLabel={(option: string | Film) =>
              typeof option === 'string' ? option : option.title
            }
            value={TagsValue}
            onChange={(e, newValue: readonly (string | Film)[]) => {
              // Convert the array of strings back to an array of Film objects
              const selectedFilms: Film[] = newValue.map(option =>
                typeof option === 'string'
                  ? top100Films.find(film => film.title === option) || {
                      title: option,
                    }
                  : option,
              );
              // Limit the number of tags to 5
              const limitedTags = selectedFilms.slice(0, 5);
              field.onChange(limitedTags);
              // Set the state with the limited tags
              setTagsValue(limitedTags);
            }}
            renderTags={() => null}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder={placeholder}
              />
            )}
          />
        )}
        name='tags'
        control={control}
      />
      <Box
        mt={3}
        sx={{
          '& > :not(:last-child)': { mr: 1 },
          '& > *': { mr: 1 },
        }}
      >
        {TagsValue?.map(v => (
          <Chip
            sx={{
              borderRadius: '10px',
              height: 40,
              backgroundColor: '#FEEBC1',
              color: '#F3963B',
              fontSize: '16px',
            }}
            key={v.title}
            label={v.title}
            onDelete={onDelete(v.title)}
          />
        ))}
      </Box>
    </Box>
  );
};
export default Tags;
const top100Films: Film[] = [
  { title: 'The Shawshank Redemption' },
  { title: 'The Godfather' },
  { title: 'The Godfather: Part II' },
  { title: 'The Dark Knight' },
  { title: '12 Angry Men' },
  { title: "Schindler's List" },
  { title: 'Pulp Fiction' },
  { title: 'The Lord of the Rings: The Return of the King' },
  { title: 'The Good, the Bad and the Ugly' },
  { title: 'Fight Club' },
  { title: 'The Lord of the Rings: The Fellowship of the Ring' },
  { title: 'Star Wars: Episode V - The Empire Strikes Back' },
  { title: 'Forrest Gump' },
  { title: 'Inception' },
  { title: 'The Lord of the Rings: The Two Towers' },
  { title: "One Flew Over the Cuckoo's Nest" },
  { title: 'Goodfellas' },
  { title: 'The Matrix' },
  { title: 'Seven Samurai' },
];
