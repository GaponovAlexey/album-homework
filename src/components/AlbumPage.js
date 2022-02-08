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
    console.log('init forward', selectedCardIndex.current)
    selectedCardIndex.current += 1
    console.log('after forward', selectedCardIndex.current)

    if (selectedCardIndex.current < items.length) {
      setItemFound(
        items.find((item, index) => index === selectedCardIndex.current)
      )
      console.log('get forward item', itemFound)
    } else {
      setIsShowing(false)
      return
    }
  }

  const backwardHandler = () => {
    console.log('init backward', selectedCardIndex.current)
    selectedCardIndex.current -= 1
    console.log('after backward', selectedCardIndex.current)

    if (selectedCardIndex.current >= 0) {
      setItemFound(
        items.find((item, index) => index === selectedCardIndex.current)
      )
      console.log('get backward item', itemFound)
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
        <div className='loading'>
          <p>...loading</p>
        </div>
      )}
      <p className='page-title-message'>
        You have chosen <span>Album {albumId}</span>. Total of {items.length}{' '}
        photos to explore. Enjoy!
      </p>
      <div className='items-container'>
        {items.map((item, index) => (
          <Card key={item.id} onClick={() => onItemHandler(item.id, index)}>
            <img src={'https://via.placeholder.com/100x70.png'} alt={`photo`} />
            <h5>№{item.id}</h5>
          </Card>
        ))}
      </div>
      {isShowing && (
        <div className='loading'>
          <button className='backwardButton' onClick={backwardHandler}>
            &#60;
          </button>
          <div className='item-container'>
            <button className='offItemButton' onClick={offItemHandler}>
              X
            </button>
            <img
              src={'https://via.placeholder.com/760x452.png'}
              alt={`data pic`}
            />
            <div>
              <h1>№{itemFound.id}</h1>
              <h3>{itemFound.title}</h3>
            </div>
          </div>
          <button className='forwardButton' onClick={forwardHandler}>
            &#62;
          </button>
        </div>
      )}
    </div>
  )
}

export default AlbumItemsPage
