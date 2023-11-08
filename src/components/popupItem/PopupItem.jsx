import React from 'react';
import style from './PopupItem.module.css'
import {Link} from "react-router-dom";


const PopupItem = ({name, image, slug}) => {

  return (
    <div className={style.popupItem}>
      <div className={style.popupImageContainer}>
        <Link to={`game/${slug}`}>
          <img className={style.popupImage} src={image} alt=""/>
        </Link>
      </div>
        <div className={style.popupName}>
          <Link to={`game/${slug}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <span className={style.spanPopup}>{name}</span>
          </Link>
        </div>
    </div>
  );
};

export default PopupItem;