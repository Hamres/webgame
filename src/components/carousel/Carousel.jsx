import React, {Children, cloneElement, useEffect, useState} from 'react';
import style from './Carousel.module.css'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import axios from "axios";
import {useParams} from "react-router-dom";
const apiKey = '055a54d5b13c494b9b21cf79283af24f'


const PAGE_WIDTH = 480

const Carousel = ({children}) => {
  const [pages, setPages] = useState([])
  const [offset, setOffset] = useState(0)
  const {slug} = useParams()


  useEffect(() => {
    async function fetchScreen() {
      try {
        const resp = axios.get(`https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`)
          .then(resp => {
            setPages(resp.data.results)
          })
      } catch (e) {
        console.log(e)
      }
    }
  fetchScreen()
}, [])



  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH
      return Math.min(newOffset, 0)
    })
  }

  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  useEffect(() => {
    setPages(
      Children.map(children, child => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: `${PAGE_WIDTH}px`,
            minWidth: `${PAGE_WIDTH}px`,
          }
        })
      })
    )
  }, [])

  return (
    <div className={style.mainContainer}>
      <FaChevronLeft className={style.arrow} onClick={handleLeftArrowClick}/>
      <div className={style.window}>
        <div
          className={style.allItemsContainer}
          style={{transform: `translateX(${offset}px)`}}
        >
          { pages &&
            pages.map((obj) => (
              <img key={obj.image} src={obj.image} alt="screen"/>
            ))
          }
        </div>
      </div>
      <FaChevronRight className={style.arrow} onClick={handleRightArrowClick}/>
    </div>
  );
};

export default Carousel;
