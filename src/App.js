import { useEffect, useState } from 'react';
import './App.css';
import Favorite from './Favorite';
import axios from 'axios'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


function App(props) {
  const savedFavories = localStorage.getItem('favories')
  const [currentActivity, setCurrentActivity] = useState({});
  const [showFavorite, setShowFavorite] = useState(false);

  const [activity, setActivity] = useState({
    title: '',
    type: '',
    key: 1000000,
    minPrice: 0,
    maxPrice: 1,
    favorite: false
  });

  const [favActivities, setFavActivities] = useState([]);

  const [newActivity, setNewActivity] = useState(false);

  const types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]


  const getActivity = () => {
    axios.get(`http://www.boredapi.com/api/activity?type=${activity
      .type}&?minprice=${activity.minPrice}&maxprice=${activity.maxPrice}`)
      .then(response => {
        setCurrentActivity(response.data)
        localStorage.setItem("Activity", response.data)
      })
      .catch(err => console.log(err))
  }
  const getRandomActivity = (e) => {
    e.preventDefault();
    setNewActivity(!newActivity)
  }

  const getActivityType = (e) => {
    setActivity({
      ...activity,
      type: e.currentTarget.value
    })
  }

  const getPriceRange = (e) => {
    e.preventDefault();

    setActivity({
      ...activity,
      minPrice: e.currentTarget.min.value,
      maxPrice: e.currentTarget.max.value
    })
  }

  const limitPriceRange = (e) => {
    return e.target.value < 0
      ? e.target.value = 0
      : e.target.value > 1 ? e.target.value = 1 : e.target.value
  }

  const addToFav = (e) => {
    e.preventDefault();
    const found = favActivities.find(e => e.activity === currentActivity.activity)
    if (!found) {
      setFavActivities([...favActivities, currentActivity])
    }
    localStorage.setItem("favories", JSON.stringify(...favActivities, currentActivity))
  }
  useEffect(() => {
    if (savedFavories) {
      setFavActivities([JSON.parse(savedFavories)])
    }
    getActivity();
  }, [newActivity, activity]);

  return (
    <div className='container'>

      <h1>Find an activity!</h1>
      <div className='activity'>
        <h3>{currentActivity.activity}
          <button onClick={(e) => addToFav(e)}>♥</button>
        </h3>
        <button className='btn' onClick={(e) => getRandomActivity(e)}>Find another activity</button>
      </div>
      <div className='activity-type'>
        <h1>Select an activity type</h1>
        <select onChange={(e) => getActivityType(e)}>
          {types.map((e, i) => {
            return <option key={i}>{e}</option>
          })}
        </select>
      </div>
      <form onSubmit={getPriceRange} className='activity-price-range'>
        <h1>Select a price range</h1>
        <div className='input-wrap'>
          <input placeholder='Minimum Price' step={0.05} onChange={(e) => limitPriceRange(e)} defaultValue={0} type='number' name="min" />
          <input placeholder='Maximum Price' step={0.05} onChange={(e) => limitPriceRange(e)} defaultValue={1} type='number' name="max" />
          <button type='submit'>Select a price range</button>
        </div>
      </form>

      <button style={{ marginTop: '20vh' }} className='btn' onClick={() => setShowFavorite(!showFavorite)}>Show My Favorites</button>
      {showFavorite ?
        <Favorite setFavActivities={setFavActivities} favActivities={favActivities} types={types} /> : ""}
    </div>
  )
}

export default App;
