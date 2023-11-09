import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import style from '../pagesStyles/FullGame.module.css'
import axios from "axios";
import IsLoading from "../isLoading/IsLoading";
import Carousel from "../carousel/Carousel";
const apiKey = '055a54d5b13c494b9b21cf79283af24f'


const FullGame = () => {
  const [game, setGame] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [maxLimit, setMaxLimit] = useState(false)
  const {slug} = useParams()


  useEffect(() => {
    async function fetchGame() {
      try {
        const res = axios.get(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`)
          .then(res => {
            setGame(res.data)
          })
      } catch (e) {
        console.log(e)
      }
    }
    fetchGame()
  }, [])


  if (!game) {
    return <div className={style.loader}><IsLoading/></div>
  }

  const limit = 450

  function readMore () {
    setIsOpen(!isOpen)
    setMaxLimit(!maxLimit)
  }

  function truncate(str, maxLimit) {
    if (game.description_raw.length > maxLimit) {
      return str.slice(0, maxLimit - 3) + '...';
    } else {
      return str
    }
  }

  return (
    <div className={style.wrapper} style={{
      backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),
      url(${game.background_image})`,
      backgroundSize: 'cover'
    }}>
      <div className={style.container}>
        <div className={style.titleContainer}>
          <div className={style.buttonHome}>
            <Link to='/'>
              <button className={style.thisButton}>
                &#8678;
              </button>
            </Link>
          </div>
          <div className={style.gameTitleContainer}>
            <h1 className={style.title}>
              {game.name}
            </h1>
          </div>
        </div>
        <div className={style.about}>About</div>

        {
          game.description.length > limit
            ?
            <div className={style.description}><span>{truncate(game.description_raw, maxLimit ? '9999' : '450')} </span>
              <button className={style.readMore} onClick={() => readMore()}>{isOpen ? 'Read less' : 'Read more'}</button>
            </div>
            : <div className={style.description}>{game.description_raw}</div>
        }

        <div className={style.gameMeta}>
          <div className={style.rating}>
            <div className={style.gameMetaTitle}>Metascore</div>
            <div className={style.gameMetaRating}>{game.metacritic}</div>
          </div>
          <div className={style.releaseDate}>
            <div className={style.gameMetaTitle}>Release date</div>
            <div className={style.gameMetaRelease}>{game.released}</div>
          </div>
          <div className={style.website}>
            <div className={style.gameMetaTitle}>Website</div>
            <Link to={`${game.website}`} target="_blank" style={{textDecoration: 'none'}}>
              <span className={style.gameMetaWebsite}>{game.website}</span>
            </Link>
          </div>
        </div>
        <div className={style.screenshots}>
          <div className={`${style.screen} ${style.screen1}`}>
            <Carousel/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullGame;

