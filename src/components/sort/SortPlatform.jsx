import React from 'react';
import style from './Sort.module.css'

const SortPlatform = ({options, platformSelect, onChangePlatform}) => {

  return (
    <form>
      <select
        className={style.platformSelect}
        value={platformSelect}
        onChange={event => onChangePlatform(event.target.value)}
      >
        {
          options.map((option) =>
            <option key={option.platformSelect} value={option.platformSelect}>
              {option.name2}
            </option>
          )
        }
      </select>
    </form>
  );
};

export default SortPlatform;