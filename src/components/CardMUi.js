import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

export const MultiActionAreaCard = ({
  item,
  onClick,
  className,
  removeCard,
}) => {
  return (
    <Card
      className={`card ${className}`}
      onClick={onClick}
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='100'
          image={item.thumbnailUrl}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='text' component='div'>
            {item.id} id <br /> Album №{item.albumId}
          </Typography>
          <Typography variant='body5' color='text.secondary'>
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={() => removeCard(item.id)}
          size='small'
          color='primary'
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
