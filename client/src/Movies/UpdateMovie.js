import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";


const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:''
}

export const UpdateMovie = props =>{
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();
    const {push} = useHistory();

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res =>{
            console.log(res);
            setMovie(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    },[id])

    const makeUpdate = event =>{

    }

    const handleChange = event =>{
        event.preventDefault();

        setMovie({
            ...movie,
            [event.target.name]:event.target.value
        })
    }

    return(
        <div className="movie-card">
            <form className="update-form" onSubmit={makeUpdate}>
                <input className="update-input" type="text" value={movie.title} onChange={handleChange} placeholder="Title"/>
                
                <input className="update-input" type="text" value={movie.director} onChange={handleChange} placeholder="Director"/>
                
                <input className="update-input" type="number" value={movie.metascore} onChange={handleChange} placeholder="Metascore"/>
                
                <input className="update-input" type="text" value={movie.stars} onChange={handleChange} placeholder="Actors"/>
                
                <button>Save Update</button>
            </form>
        </div>
    )
}