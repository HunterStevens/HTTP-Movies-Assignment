import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const UpdateMovie = props =>{

    const makeUpdate= event =>{

    }

    return(
        <div className="movie-card">
            <form onSubmit={makeUpdate}>
                <input type="text" placeholder="Title"/>
                <input type="text" placeholder="Director"/>
                <input type="text" placeholder="Metascore"/>
                <input type="text" placeholder="Actors"/>
                <button>Save Update</button>
            </form>
        </div>
    )
}