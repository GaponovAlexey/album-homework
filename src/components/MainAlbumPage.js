import { css } from '@emotion/css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'

import Card from './Card'

const MainAlbumPage = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setlimit] = useState()
  const [page, setpage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`
      )
      const resultJson = await result.json()
      setAlbums(resultJson)
      setIsLoading(false)
    }
    fetchData()
  }, [page, limit])

  const handleChange = (event, value) => {
    setpage(value)
  }

  return (
    <StyledEngineProvider injectFirst>
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
                  alt={`data`}
                />
                <h5>Album {album.id}</h5>
                <h6>Album {album.title}</h6>
              </Card>
            </Link>
          ))}
        </div>
        <div
          className={css`
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
          `}
        >
          <Stack>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </StyledEngineProvider>
  )
}

export default MainAlbumPage
