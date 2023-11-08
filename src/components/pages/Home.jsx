import React, {useEffect, useRef, useState} from 'react';
import SortPlatform from "../sort/SortPlatform";
import Card from "../card/Card";
import axios from "axios";
import style from '../pagesStyles/Home.module.css'
import Header from "../header/Header";
import IsLoading from "../isLoading/IsLoading";
import SortCard from "../sort/SortCard";
import IsLoadingButton from "../isLoading/IsLoadingButton";

const apiKey = '055a54d5b13c494b9b21cf79283af24f'

const HomeBlock = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPopup, setIsLoadingPopup] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(true)
  const [api, setApi] = useState([])
  const [numberPage, setNumberPage] = useState(1)
  const [sortSelect,setSortSelect] = useState('')
  const [platformSelect,setPlatformSelect] = useState('')
  const lastElement = useRef()
  const observer = useRef()
  const [funcGet, setFuncGet] = useState(false)
  const [backToTop, setBackToTop] = useState(false)
  const [searchGame, setSearchGame] = useState([])
  const [open, setOpen] = useState(false)


  const platform = platformSelect > 0 ? `&platforms=${platformSelect}` : ''
  const sort = sortSelect ? `&ordering=${sortSelect}` : ''


  const addPages = () => {
    setFuncGet(true)
    setNumberPage(numberPage + 1)
  }

  const fetchFastData = () => {
    setIsLoading(true)
    axios.get(`https://api.rawg.io/api/games?key=${apiKey}&dates=2010-10-10,2023-10-31&ordering=-added${sort}&page_size=40&page=${numberPage}${platform}`)
      .then((res => {
        setApi([...res.data.results])
        setIsLoading(false)
        setIsLoadingButton(false)
      }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchAndAddData = () => {
    setIsLoadingButton(true)
    axios.get(`https://api.rawg.io/api/games?key=${apiKey}&dates=2010-10-10,2023-10-31&ordering=-added${sort}&page_size=40&page=${numberPage}${platform}`)
      .then((newData => {
        setApi([...api, ...newData.data.results]);
        setIsLoadingButton(false)
      }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchSearchGame = () => {
    setIsLoadingPopup(true)
    axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchValue}`)
      .then((res => {
        setSearchGame(res.data.results)
        setIsLoadingPopup(false)
      }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    setSearchGame([])
    if (searchValue.length >= 1) {
      fetchSearchGame()
    } else {
      setOpen(false)
    }
  }, [searchValue])

  useEffect(() => {
    fetchFastData()
  }, [platformSelect, sortSelect]);

  useEffect(() => {
    if(funcGet) {
      fetchAndAddData()
      setFuncGet(false)
    }
  }, [funcGet])

  useEffect(() => {
    if(isLoadingButton) return
    if(observer.current) observer.current.disconnect()
    let callback = function (entries, observer) {
      if(entries[0].isIntersecting) {
        addPages()
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElement.current)
  }, [isLoadingButton])

  const sortCard = (sort) => {
    setSortSelect(sort)
    setNumberPage(1)
  }

  const sortPlatform = (sort) => {
    setPlatformSelect(sort)
    setNumberPage(1)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setBackToTop(true)
      } else {
        setBackToTop(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className={style.wrapper} onClick={() => setOpen(false)}>
      <Header setSearchValue={setSearchValue} isLoadingPopup={isLoadingPopup} searchGame={searchGame} open={open} setOpen={setOpen}/>
      <div className={style.sortCard}>
        <SortCard
          options={[
            {sortSelect: 'Default', name1: 'Default'},
            {sortSelect: 'metacritic', name1: 'Rating ↑'},
            {sortSelect: '-metacritic', name1: 'Rating ↓'},
            {sortSelect: 'released', name1: 'Release date ↑'},
            {sortSelect: '-released', name1: 'Release date ↓'},
          ]}
          sortSelect={sortSelect}
          onChangeSort={sortCard}
        />
        <SortPlatform
          options={[
            {platformSelect: 'Platforms', name2: 'Platforms'},
            {platformSelect: '4', name2: 'PC'},
            {platformSelect: '18', name2: 'PlayStation 4'},
            {platformSelect: '1', name2: 'Xbox One'},
            {platformSelect: '7', name2: 'Nintendo Switch'},
            {platformSelect: '3', name2: 'iOS'},
            {platformSelect: '21', name2: 'Android'},
          ]}
          platformSelect={platformSelect}
          onChangePlatform={sortPlatform}
        />
      </div>

      {
        isLoading &&
        <div className={style.loader}>
          <IsLoading/>
        </div>
      }

      <div className={style.containerCard}>
        {
          api.map((obj) => (
            <Card
              slug={obj.slug}
              key={obj.name}
              name={obj.name}
              rating={obj.metacritic}
              poster={obj.background_image}
              releaseDate={obj.released}
            />))
        }
      </div>
      <div className={style.button}>
        {
          api.length > 1 &&
          <button
            ref={lastElement}
            onClick={() => addPages()}
            className={style.buttonMore}>
            {isLoadingButton ? <div className={style.loaderButton}><IsLoadingButton/></div> : 'Load more'}
          </button>
        }
        {
          backToTop && <div className={style.btnUp} onClick={() => scrollUp()}></div>
        }
      </div>
    </div>
  );
};

export default HomeBlock;



