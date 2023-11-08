import React, {useEffect, useState} from 'react';
import style from './Carousel.module.css'


const Carousel = ({children}) => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    setPages()
  }, [])

  return (
    <div className={style.mainContainer}>
      <div className={style.window}>
        <div className={style.allItemsContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carousel;