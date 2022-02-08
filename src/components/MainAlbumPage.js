import { css } from '@emotion/css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

const MainAlbumPage = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/albums')
      const resultJson = await result.json()
      const sliceResult = resultJson.slice(0, 20)
      setAlbums(sliceResult)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      {isLoading && (
        <div className='loading'>
          <p>...loading</p>
        </div>
      )}
      <div
        className={css`
          width: 950px;
          margin: 0 auto;
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        `}
      >
        {albums.map((album) => (
          <Link
            to={`/${album.id}/photos`}
            key={album.id}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Card className='albums-card'>
              <img
                src={'https://via.placeholder.com/168x118.png'}
                alt={`data thumbnail`}
              />
              <h5>Album {album.id}</h5>
              <h6>Album {album.title}</h6>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MainAlbumPage
