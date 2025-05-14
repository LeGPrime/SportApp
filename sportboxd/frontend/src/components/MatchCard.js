import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import Rating from './Rating';

const MatchCard = ({ match }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {new Date(match.date).toLocaleDateString()} - {match.league?.name}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {match.score?.home ?? '?'} - {match.score?.away ?? '?'}
            </Typography>
            {match.stats?.averageRating > 0 && (
              <Chip 
                label={`${match.stats.averageRating.toFixed(1)} ★`} 
                color="success" 
                size="small" 
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          {match.venue?.name && `${match.venue.name}${match.venue.city ? `, ${match.venue.city}` : ''}`}
        </Typography>
        
        <Button 
          component={Link} 
          to={`/match/${match._id}`} 
          variant="outlined" 
          size="small" 
          color="primary"
        >
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchCard;