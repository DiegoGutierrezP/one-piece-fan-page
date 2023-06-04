import { jikanApi } from "@/api";
import { CharactersListResponse, ItemCharacterList, OnePieceMovie } from "@/interfaces";
import { avoidRateLimit } from "./avoidRateLimit";

interface MovieInfoResponse {
    movie: OnePieceMovie,
    characters: ItemCharacterList[],
}

 export const getMovieInfo = async (movieId : string) : Promise<MovieInfoResponse | null | undefined> => {
    await avoidRateLimit(1500);
    try{
        const {data:dataMovie} = await jikanApi.get(`/anime/${movieId}`);
        const {data:dataCharacters} = await jikanApi.get<CharactersListResponse>(`/anime/${movieId}/characters`);

        return {
            movie:dataMovie.data,
            characters:dataCharacters.data
        }
    }catch(err){
        return null;
    }
 }