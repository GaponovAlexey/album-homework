import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  Routes,
  Router,
} from 'react-router-dom'
import { AlbumItemsPage } from './components/AlbumPage'
import { Header } from './components/Header'
import MainAlbumPage from './components/MainAlbumPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainAlbumPage />} />

          <Route exact path='/:albumId/photos' element={<AlbumItemsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
