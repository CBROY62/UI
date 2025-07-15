import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fetchapis-2.onrender.com/api/data')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div className="container">
      <h1 className="heading">User Cards</h1>
      {error && <div className="error">{error}</div>}
      <div className="card-container">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            className="card"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
