import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tab,
  Tabs,
  Container,
} from '@mui/material';
import Loader from '../components/Loader';
import Message from '../components/Message';
import MatchCard from '../components/MatchCard';
import { listTopMatches } from '../actions/matchActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [sport, setSport] = React.useState('all');
  const [period, setPeriod] = React.useState('all');
  
  const matchTopRated = useSelector((state) => state.matchTopRated);
  const { loading, error, matches } = matchTopRated;
  
  useEffect(() => {
    dispatch(listTopMatches(sport, period));
  }, [dispatch, sport, period]);
  
  const handleSportChange = (event, newValue) => {
    setSport(newValue);
  };
  
  const handlePeriodChange = (event, newValue) => {
    setPeriod(newValue);
  };
  
  return (
    <>
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, backgroundImage: 'linear-gradient(to right, #1a237e, #3949ab)' }}>
        <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 2 }}>
          Bienvenue sur Sportboxd
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
          Notez, commentez et découvrez les meilleurs moments sportifs
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/matches"
          size="large"
          sx={{ borderRadius: 4 }}
        >
          Explorer les matchs
        </Button>
      </Paper>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Matchs les mieux notés
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={sport}
            onChange={handleSportChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Tous les sports" value="all" />
            <Tab label="Football" value="football" />
            <Tab label="Basketball" value="basketball" />
            <Tab label="Tennis" value="tennis" />
          </Tabs>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={period}
            onChange={handlePeriodChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Tout temps" value="all" />
            <Tab label="Cette semaine" value="week" />
            <Tab label="Ce mois" value="month" />
            <Tab label="Cette année" value="year" />
          </Tabs>
        </Box>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <Grid container spacing={3}>
            {matches.map((match) => (
              <Grid item key={match._id} xs={12} sm={6} md={4} lg={3}>
                <MatchCard match={match} />
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/matches"
            size="large"
          >
            Voir plus de matchs
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="/images/football.jpg"
              alt="Football"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Football
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Suivez et notez les matchs des plus grandes compétitions de football à travers le monde.
              </Typography>
              <Button
                variant="text"
                color="primary"
                component={RouterLink}
                to="/matches/football"
                sx={{ mt: 2 }}
              >
                Explorer
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="/images/basketball.jpg"
              alt="Basketball"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Basketball
              </Typography>
              <Typography variant="body2" color="text.secondary">
                NBA, Euroleague, championnats nationaux - tous les matchs de basket qui vous passionnent.
              </Typography>
              <Button
                variant="text"
                color="primary"
                component={RouterLink}
                to="/matches/basketball"
                sx={{ mt: 2 }}
              >
                Explorer
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="/images/tennis.jpg"
              alt="Tennis"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tennis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grand Chelem, Masters, tournois ATP et WTA - suivez les plus grands événements du tennis.
              </Typography>
              <Button
                variant="text"
                color="primary"
                component={RouterLink}
                to="/matches/tennis"
                sx={{ mt: 2 }}
              >
                Explorer
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeScreen;