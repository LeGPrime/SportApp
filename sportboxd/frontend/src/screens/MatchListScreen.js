import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listMatches } from '../actions/matchActions';

const MatchCard = ({ match }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      overflow: 'hidden',
      marginBottom: '1rem'
    }}>
      <div style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#f8f9fa'
      }}>
        <div>
          <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
          <p>{new Date(match.date).toLocaleDateString()} - {match.league.name}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {match.score.home} - {match.score.away}
          </div>
          <div style={{ 
            color: 'white', 
            background: '#28a745', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px',
            display: 'inline-block',
            marginTop: '0.5rem'
          }}>
            {match.stats.averageRating.toFixed(1)} ★
          </div>
        </div>
      </div>
      <div style={{ padding: '1rem' }}>
        <p>{match.venue.name}, {match.venue.city}</p>
        <Link 
          to={`/match/${match._id}`}
          style={{ 
            display: 'inline-block',
            color: '#007bff',
            textDecoration: 'none',
            marginTop: '0.5rem'
          }}
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  );
};

const MatchListScreen = () => {
  const { keyword, sport } = useParams();
  
  const dispatch = useDispatch();
  
  const matchList = useSelector((state) => state.matchList);
  const { loading, error, matches = [] } = matchList;
  
  useEffect(() => {
    dispatch(listMatches(keyword));
  }, [dispatch, keyword]);
  
  return (
    <div>
      <h1>{sport ? `Matchs de ${sport}` : 'Tous les matchs'}</h1>
      
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          {matches.length === 0 ? (
            <p>Aucun match trouvé</p>
          ) : (
            <div>
              {matches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MatchListScreen;