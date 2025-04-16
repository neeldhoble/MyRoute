import React, { useState, useEffect } from 'react';
import { FaLeaf, FaTrophy, FaMedal, FaCrown, FaUserAlt } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';

// Simulated users for the leaderboard
const simulatedUsers = [
  { id: 1, name: 'EcoRider', evRides: 85, co2Saved: 212.5, points: 2550 },
  { id: 2, name: 'GreenCommuter', evRides: 72, co2Saved: 180, points: 2160 },
  { id: 3, name: 'EVChampion', evRides: 68, co2Saved: 170, points: 2040 },
  { id: 4, name: 'BikeHero', evRides: 55, co2Saved: 165, points: 1980 },
  { id: 5, name: 'ZeroEmission', evRides: 45, co2Saved: 135, points: 1620 },
];

const Game = () => {
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('ecoGameStats');
    return saved ? JSON.parse(saved) : {
      totalRides: 0,
      evRides: 0,
      bikeRides: 0,
      points: 0,
      level: 1,
      co2Saved: 0
    };
  });


  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('ecoLeaderboard');
    return saved ? JSON.parse(saved) : simulatedUsers;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('ecoUserName') || '';
  });

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      color: 'rgb(168,213,226)',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(168,213,226,0.3)',
      textAlign: 'center'
    },


    leaderboard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '1rem',
      marginTop: '2rem',
      boxShadow: '0 2px 8px rgba(168,213,226,0.3)'
    },
    leaderboardItem: (isUser) => ({
      display: 'grid',
      gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr',
      padding: '0.8rem',
      borderRadius: '8px',
      marginBottom: '0.5rem',
      backgroundColor: isUser ? 'rgba(168,213,226,0.2)' : 'transparent',
      alignItems: 'center'
    }),
    userNameInput: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid rgb(168,213,226)',
      marginRight: '1rem',
      width: '200px'
    },
    progress: (width) => ({
      backgroundColor: 'rgb(168,213,226)',
      height: '100%',
      borderRadius: '10px',
      // width: ${width}%,
      width: `${width}%`,

      transition: 'width 0.5s ease'
    })
  };


  useEffect(() => {
    localStorage.setItem('ecoGameStats', JSON.stringify(userStats));
    
    // Update leaderboard with user's stats
    if (userName) {
      const updatedLeaderboard = [...leaderboard.filter(user => user.id !== 'currentUser')];
      if (userStats.evRides > 0 || userStats.points > 0) {
        updatedLeaderboard.push({
          id: 'currentUser',
          name: userName,
          evRides: userStats.evRides,
          co2Saved: userStats.co2Saved,
          points: userStats.points
        });
      }
      
      // Sort leaderboard by EV rides and CO2 saved
      updatedLeaderboard.sort((a, b) => {
        if (b.evRides !== a.evRides) return b.evRides - a.evRides;
        return b.co2Saved - a.co2Saved;
      });
      
      setLeaderboard(updatedLeaderboard);
      localStorage.setItem('ecoLeaderboard', JSON.stringify(updatedLeaderboard));
    }
  }, [userStats, userName]);

  useEffect(() => {
    localStorage.setItem('ecoUserName', userName);
  }, [userName]);




  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Eco-Friendly Travel Game</h1>
      
      {!userName && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Enter your name"
            style={styles.userNameInput}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      )}

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <FaTrophy style={{ color: 'gold', fontSize: '2rem' }} />
          <h3>Level {userStats.level}</h3>
          <p>{userStats.points} Points</p>
        </div>
        <div style={styles.statCard}>
          <FaLeaf style={{ color: 'green', fontSize: '2rem' }} />
          <h3>{userStats.co2Saved.toFixed(1)} kg</h3>
          <p>CO2 Saved</p>
        </div>
        <div style={styles.statCard}>
          <FaMedal style={{ color: 'rgb(168,213,226)', fontSize: '2rem' }} />
          <h3>{userStats.evRides}</h3>
          <p>EV Rides</p>
        </div>
      </div>



      {/* Leaderboard Section */}
      <div style={styles.leaderboard}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MdLeaderboard /> EV Champions Leaderboard
        </h2>
        
        {/* Leaderboard Header */}
        <div style={{ ...styles.leaderboardItem(false), fontWeight: 'bold', marginBottom: '1rem' }}>
          <div>Rank</div>
          <div>Name</div>
          <div>EV Rides</div>
          <div>CO₂ Saved</div>
          <div>Points</div>
        </div>

        {/* Leaderboard Items */}
        {leaderboard.map((user, index) => (
          <div key={user.id} style={styles.leaderboardItem(user.id === 'currentUser')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {index === 0 ? <FaCrown style={{ color: 'gold' }} /> : index + 1}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user.id === 'currentUser' ? <FaUserAlt color="rgb(168,213,226)" /> : null}
              {user.name}
            </div>
            <div>{user.evRides}</div>
            <div>{user.co2Saved.toFixed(1)} kg</div>
            <div>{user.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
