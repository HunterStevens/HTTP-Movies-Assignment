import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
      console.log(res);

      props.setMovieList(res.data)
      push(`/`);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <br/>
      <button className = "update-button" onClick={() => push(`/update-movie/${params.id}`)}>
        Update
      </button>
      <button className = "delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
