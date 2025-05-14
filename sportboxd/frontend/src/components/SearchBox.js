import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/matches');
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher un match..."
        inputProps={{ 'aria-label': 'rechercher un match' }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="rechercher">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;