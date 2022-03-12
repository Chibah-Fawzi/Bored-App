import React, { useState } from 'react'

export default function Favorite(query) {
    const { favActivities, types } = query

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


    return (
        <div>
            <h1>Favorites</h1>
            <input onChange={e => searchFav(e)} type="search" />
            <select onChange={e => filterFav(e)}>
                {types.map((e, i) => {
                    return <option key={i}>{e}</option>
                })}
            </select>

            <ul>
                {filteredData === [] ? filteredData.map(e => <li>{e.activity}</li>) :
                    searchedData !== "" ? <li>{searchedData} <button>Remove</button></li> :
                        favActivities.map(e => {
                            return <li>{e.activity} <button>Remove</button></li>
                        })
                }
            </ul>
        </div>
    )
}
