import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '@/components/layouts'
import { OnePieceMovie, OnePieceMoviesResponse } from '@/interfaces'
import {jikanApi} from '@/api'
import { Grid } from '@nextui-org/react'
import { MovieCard } from '@/components/ui'
import axios from 'axios'

interface Props {
  movies:  OnePieceMovie[]  
}

export const HomePage: NextPage<Props> = ({movies}) => {
  return (
    <Layout title='One Piece Movies' >
        <Grid.Container gap={2} justify='flex-start' className='pt-8'>
        {
          movies.map(movie => (
           <MovieCard key={movie.mal_id} movie={movie} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { data } = await jikanApi.get<OnePieceMoviesResponse>(`/anime?q=one%20piece&type=Movie`);

  return {
    props: {
      movies: data.data
    }
  }
}

export default HomePage;
