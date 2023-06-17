import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const App = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://backend-container/api/foods');
        setFoods(response.data);
      } catch (error) { 
        console.error(error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Food Delivery App</h1>
      <ul>
        {foods && foods.map((food) => (
          <li key={food._id}>
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Price: ${food.price}</p>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default App;
