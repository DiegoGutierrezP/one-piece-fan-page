import { NextPage, GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next'
import Image from 'next/image';
import { Layout } from '@/components/layouts'
import { ItemCharacterList, CharactersListResponse, OnePieceMovie, OnePieceMoviesResponse } from '@/interfaces'
import { jikanApi } from '@/api';
import { Grid } from '@nextui-org/react';
import { CharacterCard } from '@/components/ui';
import { getMovieInfo } from '@/utils';

interface Props {
    movie : OnePieceMovie;
    characters : ItemCharacterList[];
}

const InfoMoviePage:NextPage<Props> = ({movie,characters}) => {
  return (
    <Layout title={movie.title} >
            <h2 className='text-2xl my-4 ml-3 font-semibold '>{movie.title}</h2>
            <div className='flex-col sm:flex-row flex gap-4 '>
                <div className=' px-2 relative flex items-center justify-center'>
                    <Image
                        src={movie.images['jpg'].image_url}
                        height={220}
                        width={280}
                        
                        alt={movie.title}
                    />
                    {/* <video src={movie.trailer.url!} width="600" height="300" controls autoPlay  /> */}
                </div>
                <div className='flex-1 '>
                    <h4 className=' text-lg mb-2 tracking-wide font-semibold border-b border-gray-700 pb-1'>Sinopsis:</h4>
                    <p className='mb-4 leading-6'>{movie.synopsis}</p>
                    <h4 className=' text-lg mb-2 tracking-wide font-semibold border-b border-gray-700 pb-1'>Información:</h4>
                    <div className='text-sm md:text-base grid sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-4 mb-5'>
                        <div>
                            <b>Type: &nbsp;</b>
                            <span>{movie.type}</span>
                        </div>
                        <div>
                            <b>Episodes: &nbsp;</b>
                            <span>{movie.episodes}</span>
                        </div>
                        <div>
                            <b>Status: &nbsp;</b>
                            <span>{movie.status}</span>
                        </div>
                        <div>
                            <b>Aired: &nbsp;</b>
                            <span>{movie.aired.string}</span>
                        </div>
                        <div>
                            <b>Producers: &nbsp;</b>
                            <span>
                                {
                                    movie.producers.length > 0
                                    ? movie.producers.map(l => `${l.name}, `)
                                    : 'No tiene'
                                }
                            </span>
                        </div>
                        <div>
                            <b>Licensors: &nbsp;</b>
                            <span>
                                {
                                    movie.licensors.length > 0
                                    ? movie.licensors.map(l => `${l.name}, `)
                                    : 'No tiene'
                                }
                            </span>
                        </div>
                        <div>
                            <b>Studios: &nbsp;</b>
                            <span>
                                {
                                    movie.studios.length > 0 
                                    ? movie.studios.map(g => `${g.name}, `)
                                    : 'No tiene'
                                }
                            </span>
                        </div>
                        <div>
                            <b>Source: &nbsp;</b>
                            <span>{movie.source}</span>
                        </div>
                        <div>
                            <b>Genres: &nbsp;</b>
                            <span>
                                {
                                    movie.genres.length > 0 
                                    ? movie.genres.map(g => `${g.name}, `)
                                    : 'No tiene'
                                }
                            </span>
                        </div>
                        <div>
                            <b>Demographic: &nbsp;</b>
                            <span>
                                {
                                    movie.demographics.length > 0 
                                    ? movie.demographics.map(g => `${g.name}, `)
                                    : 'No tiene'
                                }
                            </span>
                        </div>
                        <div>
                            <b>Duration: &nbsp;</b>
                            <span>{movie.duration}</span>
                        </div>
                        <div>
                            <b>Rating: &nbsp;</b>
                            <span>{movie.rating}</span>
                        </div>
                    </div>
                    <h4 className=' text-lg mb-2 tracking-wide font-semibold border-b border-gray-700 pb-1'>Estadisiticas:</h4>
                    <div className='text-sm md:text-base grid sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-4 mb-5'>
                        <div>
                            <b>Score: &nbsp;</b>
                            <span>{movie.score}</span>
                        </div>
                        <div>
                            <b>Ranked: &nbsp;</b>
                            <span>{movie.rank}</span>
                        </div>
                        <div>
                            <b>Popularity: &nbsp;</b>
                            <span>{movie.popularity}</span>
                        </div>
                        <div>
                            <b>Members: &nbsp;</b>
                            <span>{movie.members}</span>
                        </div>
                        <div>
                            <b>Favorites: &nbsp;</b>
                            <span>{movie.favorites}</span>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='text-xl my-2 ml-3 font-semibold ' >Personajes</h3>
            <Grid.Container gap={2} justify='flex-start'>
                {
                    characters.map(charac => (
                        <CharacterCard key={charac.character.mal_id} character={charac} />
                    ))
                }
            </Grid.Container>

    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await jikanApi.get<OnePieceMoviesResponse>(`/anime?q=one%20piece&type=Movie`);

    const moviesId = data.data.map(m => m.mal_id.toString());


    return {
        paths:  moviesId.map(movieId => ({
            params : {movieId}
           })),
        fallback: "blocking"
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async (ctx) => {

    const {movieId} = ctx.params as { movieId:string };

    const data = await getMovieInfo(movieId);


    if(!data){
        return {
            redirect:{
                destination:'/',
                permanent:false,
            }
          }
    }
    
    

    return {
        props: {
            movie:data.movie,
            characters : data.characters
        },
        revalidate:  60 * 60 * 24 * 7
    }
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
/* export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {movieId} = ctx.params as {movieId : string};

    const {data:dataMovie} = await jikanApi.get(`/anime/${movieId}`);
    const {data:dataCharacters} = await jikanApi.get<CharactersListResponse>(`/anime/${movieId}/characters`);

    return {
        props: {
            movie : dataMovie.data as OnePieceMovie,
            characters: dataCharacters.data,
        }
    }
} */

export default InfoMoviePage