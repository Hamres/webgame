import React from 'react';
import style from "./Sort.module.css";

const SortCard = ({options, sortSelect, onChangeSort,}) => {
  return (
    <form>
      <label style={{color: '#fff'}} htmlFor="">Order by:</label>
      <select
        className={style.sortSelect}
        value={sortSelect}
        onChange={event => onChangeSort(event.target.value)}
      >
        {
          options.map((option) =>
            <option key={option.sortSelect} value={option.sortSelect}>
              {option.name1}
            </option>
          )
        }
      </select>
    </form>
  );
};

export default SortCard;