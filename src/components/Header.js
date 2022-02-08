import { css } from '@emotion/css'
import { Avatar } from '@mui/material'
import React, { FC } from 'react'

export const Header = () => {
  return (
    <div
      className={css`
        display: flex;
      `}
    >
      <div
        className={css`
          width: 100%;
          background-color: #efefff;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            padding: 15px 15px;
            align-items: center;
          `}
        >
          <div>logo</div>
          <div>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  )
}
