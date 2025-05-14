import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Rating = ({ value, text, color = "#f8e825" }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box key={star} sx={{ color }}>
          {value >= star ? (
            <StarIcon />
          ) : value >= star - 0.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </Box>
      ))}
      {text && <Box component="span" sx={{ ml: 1 }}>{text}</Box>}
    </Box>
  );
};

export default Rating;