import React from 'react';
import style from './NotFound.style.css'

const NotFound = () => {
  return (
    <div className={style.pageError}>
      <div className={style.errorContainer}>
        <div className={style.error404}>
          <h1 style={{color: "white"}}>404</h1>
        </div>
        <div >
          <span className={style.errorText} >
            Whoops!
            <br/>
            We couldn't find that page.</span>
        </div>
        <div className={style.errorButton}>
          <button>Main page</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;