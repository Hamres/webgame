import React from 'react';
import style from './Card.module.css'
import {Link} from "react-router-dom";


const Card = ({name, rating, poster, releaseDate, slug}) => {

  return (
      <div className={style.cardContainer}>
        <div className={style.mainCard}>
          <div className={style.cardImg}>
            <img className={style.poster} src={poster} alt=""/>
          </div>
          <div className={style.cardDesc}>
            <div className={style.rating}>{rating}</div>
              <div className={style.name}>
                <Link to={`/game/${slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <span className={style.nameSpan}>{name}</span>
                </Link>
              </div>
            <div className={style.releaseDate}>Release date: {releaseDate}</div>
          </div>
        </div>
      </div>
  );
};

export default Card;