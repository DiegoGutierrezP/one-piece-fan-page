import React, { FC } from 'react'
import { ItemCharacterList } from '@/interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
    character : ItemCharacterList;
}

export const CharacterCard : FC<Props> = ({character}) => {
    const router = useRouter();

  const handleClickCard = () => {
    router.push(`/character/${character.character.mal_id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} >
      <Card onClick={handleClickCard} className='border-none' variant='shadow' isPressable isHoverable >
            <Card.Body className='p-0' >
              <Card.Image
                src={character.character.images["jpg"].image_url}
                width="100%"
                height={170}
                objectFit="cover"
                alt={character.character.name}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{character.character.name}</Text>
              </Row>
            </Card.Footer>
          </Card>
    </Grid>
  )
}
