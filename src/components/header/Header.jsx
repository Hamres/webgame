import React, {useCallback, useEffect, useState} from 'react';
import style from './Header.module.css'
import {Link, useParams} from "react-router-dom";
import debounce from "lodash.debounce";
import PopupItem from "../popupItem/PopupItem";
import IsLoading from "../isLoading/IsLoading";
import axios from "axios";



const Header = ({setSearchValue, searchGame, isLoadingPopup, setOpen, open}) => {
  const [value, setValue] = useState('')

  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    setOpen(false)
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setOpen(true)
      setSearchValue(str)
    }, 500),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={style.mainHeader}>
      <Link to='/' style={{textDecoration: 'none'}}>
        <div className={style.games}>
          <span>Games</span>
        </div>
      </Link>
      <div className={style.mainSearchInput} onClick={(e) => e.stopPropagation()}>
        <input
          value={value}
          onChange={onChangeInput}
          className={style.headerInput}
          type="text"
          placeholder='Search the game'
        />
        <img className={style.searchIcons} src='img/search.png' alt='search'/>
        {value && <img onClick={onClickClear} className={style.closeIcons} src='img/close.png' alt='close'/>}

        {
          open &&
          <div className={style.popup} onClick={(e) => e.stopPropagation()}>
            <div className={style.popupItems}>
              {
                isLoadingPopup &&
                <div className={style.loader}>
                  <IsLoading/>
                </div>
              }

              {
                searchGame.map((obj) => (
                  <PopupItem
                    name={obj.name}
                    image={obj.background_image}
                    key={obj.name}
                    slug={obj.slug}
                  />
                ))
              }
            </div>
          </div>
        }

      </div>
    </div>
  );
};

export default Header;
