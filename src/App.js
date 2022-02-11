import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AlbumItemsPage } from './components/AlbumPage'
import { Header } from './components/Header'
import MainAlbumPage from './components/MainAlbumPage'

function App() {
  return (
    <BrowserRouter basename='/album-homework'>
      <Header />
      <Routes path='/' element={<MainAlbumPage />}>
        <Route index element={<MainAlbumPage />} />
        <Route path='/:albumId/photos' element={<AlbumItemsPage />} />
        <Route path='*' element={<AlbumItemsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
