import React from 'react';


function GenreTickbox(props) {
    console.log(props.genres)

    function isChecked(genreId) {
        return !!props.checkedGenres.filter(id => {
          return  genreId === id; 
        }).length 
    }


    return props.genres.map(genre => {
        return (
            <div key={genre.id}>
                <label className="pointer checkbox-label">
                    <input
                        className="pointer" 
                        type="checkbox" 
                        value={genre.name} 
                        checked={isChecked(genre.id)} 
                        onChange={() => {props.check(genre.id,isChecked(genre.id))}}  />
                    <span>{genre.name}</span>
                </label>
            </div>
            
        )
    })
    }


export default GenreTickbox;