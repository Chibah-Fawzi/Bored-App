import React, { useState } from 'react'
import './App.css';

export default function Favorite(query) {
    const { favActivities, types, setFavActivities } = query

    const [searchedData, setSearchedData] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const searchFav = (event) => {
        let value = event.currentTarget.value
        value === "" ? setSearchedData("") :
            setSearchedData(favActivities.find(e => e.activity.toLowerCase().match(value.toLowerCase())))
    }

    const filterFav = (event) => {
        let filter = favActivities.filter(e => e.type === event.currentTarget.value)
        setFilteredData(filter)
        console.log(filter);
    }

    const removeFav = (activity) => {
        console.log(activity);
        setFavActivities(favActivities.filter((e) => e.activity !== activity))
    }
    return (
        <div className='container'>
            <h1>Favorites</h1>
            <div className='input-wrap'>
                <input placeholder='Search your activities' onChange={e => searchFav(e)} type="search" />
                <select onChange={e => filterFav(e)}>
                    {types.map((e, i) => {
                        return <option key={i}>{e}</option>
                    })}
                </select>
            </div>

            <h1>Favorite activities</h1>
            <ul>
                {
                    favActivities === [] ? <li>No favorite activities</li> :
                        filteredData === [] ? filteredData.map(e => <li>{e.activity}</li>) :
                            searchedData !== "" ? <li>{searchedData}</li> :
                                favActivities.map((e, i) => {
                                    return <li>{e?.activity} <button className='btn' id="delete" onClick={() => removeFav(favActivities[i].activity)}>Remove</button></li>
                                })
                }
            </ul>
        </div>

    )
}
