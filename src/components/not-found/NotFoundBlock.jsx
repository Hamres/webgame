import React from 'react';
import style from './NotFoundBlock.module.css'
import {Link} from "react-router-dom";

const NotFoundBlock = () => {
  return (
    <div className={style.wrapper} >
      <div className={style.errorContainer}>
        <div className={style.mainError}>
          <div className={style.error404}>
            <h1 style={{color: "white"}}>404</h1>
          </div>
          <div >
        <span className={style.errorText} >
          Whoops!
          <br/>
          We couldn't find that page.</span>
          </div>
          <div style={{paddingTop: '50px'}}>
            <Link to={'/'}>
              <button className={style.errorButton}>Main page</button>
            </Link>
          </div>
        </div>
      </div>
        </div>


  );
};

export default NotFoundBlock;