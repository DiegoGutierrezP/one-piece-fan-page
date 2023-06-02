import React, { FC } from 'react'
import { OnePieceMovie } from '@/interfaces'
import { Card, Col, Grid, Row, Text, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface Props{
  movie: OnePieceMovie,
}

export const MovieCard: FC<Props> = ({movie}) => {
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/movie/${movie.mal_id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} >
      <Card onClick={handleClickCard} className='border-none' variant='shadow' isPressable isHoverable >
            <Card.Body className='p-0' >
              <Card.Image
                src={movie.images['jpg'].image_url}
                width="100%"
                height="100%"
                objectFit="cover"
                alt={movie.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Tooltip content={movie.title} color="warning" >
                  <Text b>{movie.title.length > 30 ? `${movie.title.substring(0,30)}...` : movie.title}</Text>
                </Tooltip>
                <Text css={{ display:'block',width:'100%',color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  {movie.duration}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
    </Grid>
  )
}
