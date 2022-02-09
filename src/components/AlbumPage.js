import { css } from '@emotion/css'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import Card from './Card'

const AlbumItemsPage = () => {
  const [itemFound, setItemFound] = useState()
  const selectedCardIndex = useRef()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const { albumId } = useParams()
  console.log(albumId);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      )
      const resultJson = await result.json()
      setItems(resultJson)
      setIsLoading(false)
    }
    fetchData()
  }, [itemFound, albumId])

  const onItemHandler = (value, index) => {
    setItemFound(items.find((item) => item.id === value))
    selectedCardIndex.current = index
    console.log('on', selectedCardIndex.current)
    setIsShowing(true)
  }

  const forwardHandler = () => {
    selectedCardIndex.current += 1
    if (selectedCardIndex.current < items.length) {
      setItemFound(
        items.find((item, index) => index === selectedCardIndex.current)
      )
    } else {
      setIsShowing(false)
      return
    }
  }

  const backwardHandler = () => {
    selectedCardIndex.current -= 1
    if (selectedCardIndex.current >= 0) {
      setItemFound(
        items.find((item, index) => index === selectedCardIndex.current)
      )
    } else {
      setIsShowing(false)
      return
    }
  }

  const offItemHandler = () => {
    setIsShowing(false)
  }

  return (
    <div>
      <div className='controller-button-container'>
        <Link to='/'>
          <button className='controller-button' value='home'>
            All Albums
          </button>
        </Link>
      </div>
      {isLoading && (
        <div>
          <p>...loading</p>
        </div>
      )}
      <p className='page-title-message'>
        You have chosen <span>Album {albumId}</span>. Total of {items.length}{' '}
        photos to explore. Enjoy!
      </p>
      <div
        className={css`
          max-width: 990px;
          margin: 0 auto;
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        `}
      >
        {items.map((item, index) => (
          <Card key={item.id} onClick={() => onItemHandler(item.id, index)}>
            <img src={'https://via.placeholder.com/100x70.png'} alt={`photo`} />
            <h5>№{item.id}</h5>
          </Card>
        ))}
      </div>
      {isShowing && (
        <div
          className={css`
            background: rgba(0, 0, 0, 0.8);
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <button onClick={backwardHandler}>&#60;</button>
          <div
            className={css`
              width: 840px;
              height: auto;
              padding: 10px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 2px;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <button onClick={offItemHandler}>X</button>
            <img
              src={'https://via.placeholder.com/760x452.png'}
              alt={`data pic`}
            />
            <div>
              <h1>{itemFound.id}</h1>
              <h3>{itemFound.title}</h3>
            </div>
          </div>
          <button onClick={forwardHandler}>&#62;</button>
        </div>
      )}
    </div>
  )
}

export default AlbumItemsPage
