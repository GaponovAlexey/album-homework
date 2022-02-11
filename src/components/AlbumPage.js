import { css } from '@emotion/css'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MultiActionAreaCard } from './CardMUi'
import { SelectCategory } from './SelectCategory'

export const AlbumItemsPage = () => {
  const [itemFound, setItemFound] = useState()
  const selectedCardIndex = useRef()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const { albumId } = useParams()

  const [selectedSort, setselectedSort] = useState('')
  console.log('render')

  const removeCard = (id) => {
    setItems(items.filter((p) => p.id !== id))
  }

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
    setIsShowing(true)
  }

  const forwardHandler = () => {
    selectedCardIndex.current += 1
    selectedCardIndex.current < items.length
      ? setItemFound(
          items.find((item, index) => index === selectedCardIndex.current)
        )
      : setIsShowing(false)
  }

  const backwardHandler = () => {
    selectedCardIndex.current -= 1
    selectedCardIndex.current >= 0
      ? setItemFound(
          items.find((item, index) => index === selectedCardIndex.current)
        )
      : setIsShowing(false)
  }


  const sortPhotoId = (sort) => {
    console.log(sort)
    setselectedSort(sort)
    setItemFound(items.find((item) => item.id == sort))
    // selectedCardIndex.current = index
    setIsShowing(true)
  }

  return (
    <div>
      <Button variant='text'>
        <Link to='/'>All Albums</Link>
      </Button>
      {isLoading && (
        <div>
          <p>...loading</p>
        </div>
      )}
      <span
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        You have chosen <span>Album {albumId}</span>. Total of {items.length}{' '}
        photos to explore. Enjoy!
      </span>
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <SelectCategory
          value={selectedSort}
          onChange={sortPhotoId}
          option={items}
          title={'id'}
        />
      </div>
      <div
        className={css`
          max-width: 990px;
          margin: 0 auto;
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: 20px;
          grid-row-gap: 20px;
        `}
      >
        {items.map((item, index) => (
          <MultiActionAreaCard
            index={index}
            removeCard={removeCard}
            key={item.id}
            item={item}
            onClick={() => onItemHandler(item.id, index)}
          >
            <img src={item.thumbnailUrl} alt={item.title} />
            <h5>№{item.id}</h5>
          </MultiActionAreaCard>
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
            <button onClick={() => setIsShowing(false)}>X</button>
            <img
              src={itemFound.url}
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
