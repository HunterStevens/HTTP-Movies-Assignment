import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import MovieList from './MovieList';


const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
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
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res);
            //props.setMovie(res.data);
            props.history.push(`/movies-list/${movie.id}`);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleChange = event =>{
        event.persist();

        let value = event.target.value;
        if (event.target.name === 'metascore') {
          value = parseInt(value, 1);
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
                <input  type="text" className="update-input" name="title" value={movie.title} onChange={handleChange} placeholder="Title" required/>
                
                <input className="update-input" type="text" name="director" value={movie.director} onChange={handleChange} placeholder="Director" required/>
                
                <input className="update-input" type="number" name="metascore" value={movie.metascore} onChange={handleChange} placeholder="Metascore" required/>
                
                <input className="update-input" name="stars" type="text" value={movie.stars} onChange={handleChange} placeholder="Actors"/>
                
                <button>Save Update</button>
            </form>
        </div>
    )
}

// const UpdateMovie = props => {
//     // console.log('props coming in to updateMovie', props)
//     const initialMovie = {
//         id: '', 
//         title: '', 
//         director: '', 
//         metascore: '', 
//         stars: props.movies.stars
//     }
//     const [movie, setMovie] = useState(initialMovie)
//     useEffect(() => {
//         const movieToEdit = props.movies.find(m => `${m.id}` === props.match.params.id )
//         if (movieToEdit) {
//             setMovie(movieToEdit)
//         }
//     }, [props.movies, props.match.params.id] )
//     if (!props.movies.length || !movie) {
//         return <h2>Loading Movie Data</h2>
//     }
//     const handleChanges = e => {
//         e.persist();
//         let value = e.target.value;
//         if(e.target.name === 'stars') {
//             let starsArr = value.split(',')
//             setMovie({...movie, [e.target.name]: starsArr})
//         } else {
//             setMovie({...movie, [e.target.name]: value})
//         }
//     }
//     const submitHandler = e => {
//         e.preventDefault();
//         axios
//             .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
//             .then(res => {
//                 // console.log('res from submithandler', res)
//                 setMovie(res.data)
//                 props.history.push(`/`)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }