import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel,
  Checkbox,
  Rating as MuiRating,
  Paper
} from '@mui/material';

const ReviewForm = ({ submitHandler, initialValues = {} }) => {
  const [rating, setRating] = useState(initialValues.rating || 0);
  const [title, setTitle] = useState(initialValues.title || '');
  const [text, setText] = useState(initialValues.text || '');
  const [containsSpoilers, setContainsSpoilers] = useState(initialValues.containsSpoilers || false);
  
  const [detailedRatings, setDetailedRatings] = useState({
    excitement: initialValues.detailedRatings?.excitement || 0,
    quality: initialValues.detailedRatings?.quality || 0,
    importance: initialValues.detailedRatings?.importance || 0,
  });
  
  const handleDetailedRatingChange = (category, value) => {
    setDetailedRatings({
      ...detailedRatings,
      [category]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({
      rating,
      title,
      text,
      detailedRatings,
      containsSpoilers,
    });
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {initialValues.rating ? 'Modifier votre avis' : 'Donner votre avis'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Note globale</Typography>
          <MuiRating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            precision={0.5}
            size="large"
          />
        </Box>
        
        <TextField
          label="Titre de l'avis"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        
        <TextField
          label="Votre avis"
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notes détaillées (optionnel)
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Intensité</Typography>
          <MuiRating
            name="excitement"
            value={detailedRatings.excitement}
            onChange={(event, newValue) => {
              handleDetailedRatingChange('excitement', newValue);
            }}
            precision={0.5}
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Qualité technique</Typography>
          <MuiRating
            name="quality"
            value={detailedRatings.quality}
            onChange={(event, newValue) => {
              handleDetailedRatingChange('quality', newValue);
            }}
            precision={0.5}
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Importance</Typography>
          <MuiRating
            name="importance"
            value={detailedRatings.importance}
            onChange={(event, newValue) => {
              handleDetailedRatingChange('importance', newValue);
            }}
            precision={0.5}
          />
        </Box>
        
        <FormControlLabel
          control={
            <Checkbox
              checked={containsSpoilers}
              onChange={(e) => setContainsSpoilers(e.target.checked)}
              name="containsSpoilers"
            />
          }
          label="Cet avis contient des spoilers"
          sx={{ mb: 3 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!rating || !text}
        >
          {initialValues.rating ? 'Mettre à jour' : 'Publier'}
        </Button>
      </form>
    </Paper>
  );
};

export default ReviewForm;