import React from 'react';
import style from './Sort.module.css'
import SortCard from "./SortCard";

const Sort = ({ platformSelect, onChangePlatform}) => {

  return (
    <div className={style.sort}>

      {/*<form>*/}
      {/*  <select*/}
      {/*    className={style.platformSelect}*/}
      {/*    value={platformSelect}*/}
      {/*    onChange={event => onChangePlatform(event.target.value)}*/}
      {/*  >*/}
      {/*    {*/}
      {/*      options.map((option) =>*/}
      {/*        <option key={option.platformSelect} value={option.platformSelect}>*/}
      {/*          {option.name2}*/}
      {/*        </option>*/}
      {/*      )*/}
      {/*    }*/}
      {/*  </select>*/}
      {/*</form>*/}
      {/*<div>*/}
      {/*  <form>*/}
      {/*    /!*<label htmlFor=""></label>*!/*/}
      {/*    <select className={style.platformSelect}>*/}
      {/*      <option value="">Platforms</option>*/}
      {/*      <option value="">PC</option>*/}
      {/*      <option value="">PlayStation 4</option>*/}
      {/*      <option value="">Xbox One</option>*/}
      {/*      <option value="">Nintendo Switch</option>*/}
      {/*      <option value="">iOS</option>*/}
      {/*      <option value="">Android</option>*/}
      {/*    </select>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  );
};

export default Sort;