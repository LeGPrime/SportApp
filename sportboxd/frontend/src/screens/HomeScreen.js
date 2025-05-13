import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div>
      <section style={{ padding: '3rem 1rem', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px', marginBottom: '2rem' }}>
        <h1>Bienvenue sur Sportboxd</h1>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          Notez, commentez et découvrez les meilleurs moments sportifs
        </p>
        <Link to="/matches" style={{ 
          display: 'inline-block', 
          background: '#007bff', 
          color: 'white', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px', 
          textDecoration: 'none',
          marginTop: '1rem'
        }}>
          Explorer les matchs
        </Link>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '150px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Image Football</span>
          </div>
          <div style={{ padding: '1rem' }}>
            <h3>Football</h3>
            <p>Découvrez les matchs de football les plus populaires.</p>
          </div>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '150px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Image Basketball</span>
          </div>
          <div style={{ padding: '1rem' }}>
            <h3>Basketball</h3>
            <p>Explorez les matchs de basketball les mieux notés.</p>
          </div>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '150px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Image Tennis</span>
          </div>
          <div style={{ padding: '1rem' }}>
            <h3>Tennis</h3>
            <p>Suivez les meilleurs matchs de tennis de l'année.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;