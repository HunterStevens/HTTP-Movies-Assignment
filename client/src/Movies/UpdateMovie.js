// useEffect(() =>{
//     axios.get(`http://localhost:5000/api/movies/${id}`)
//     .then(res =>{
//         console.log(res);
//         setMovie(res.data);
       
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// },[id])
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";



const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

export const UpdateMovie = props =>{
    const [movie, setMovie] = useState(initialMovie);
    const{id} = useParams();
    const {push} = useHistory();

    useEffect(() => {
                const movieToEdit = props.movies.find(m => `${m.id}` === id )
                if (movieToEdit) {
                    setMovie(movieToEdit)
                }
            }, [props.movies, id] )

    const makeUpdate = event =>{
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res);
           setMovie(res.data);
           props.getMovieList();
            push(`/`);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleChange = event =>{
        event.persist();

        let value = event.target.value;
        if (event.target.name === 'metascore') {
          value = parseInt(value, 10);
        }
        if(event.target.name === 'stars'){
            value = value.split(',');
        }
        setMovie({
            ...movie,
            [event.target.name]:value
        })
    }

    return(
        <div className="movie-card">
            <form className="update-form" onSubmit={makeUpdate}>
                <input  type="text" className="update-input" name="title" value={movie.title} onChange={handleChange} placeholder="Title"/>
                
                <input className="update-input" type="text" name="director" value={movie.director} onChange={handleChange} placeholder="Director"/>
                
                <input className="update-input" type="number" name="metascore" value={movie.metascore} onChange={handleChange} placeholder="Metascore"/>
                
                <input className="update-input" name="stars" type="text" value={movie.stars} onChange={handleChange} placeholder="Actors"/>
                
                <button>Save Update</button>
            </form>
        </div>
    )
}

