import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { Layout } from "@/components/layouts";
import {
  Character,
  CharacterPicture,
  CharacterPictureResponse,
  CharacterResponse,
} from "@/interfaces";
import { jikanApi } from "@/api";
import { CharacterPictureSlide } from "@/components/ui";

interface Props {
  character: Character;
  pictures: CharacterPicture[];
}

const InfoCharacterPage: NextPage<Props> = ({ character, pictures }) => {
  return (
    <Layout title={character.name}>
      <h2 className="text-3xl my-4 ml-3 font-semibold ">{character.name}</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-[400px] text-center">
          <CharacterPictureSlide pictures={pictures} />
        </div>
        <div className="flex-1">
          <h4 className=" text-lg mb-2 tracking-wide font-semibold border-b border-gray-700 pb-1">
            Sobre el:
          </h4>
          <div className="mb-5" dangerouslySetInnerHTML={{ __html: character.about ? character.about.replace('\n', '<br />') : 'Sin Informacion'  }} ></div>
           <h4 className=" text-lg mb-2 tracking-wide font-semibold border-b border-gray-700 pb-1">
            Información Extra:
          </h4>
          <div className="text-sm md:text-base grid sm:grid-cols-3  gap-2 gap-y-4 mb-5">
            <div>
              <b>Nombre: &nbsp;</b>
              <span>{character.name}</span>
            </div>
            <div>
              <b>Nombre Kanji: &nbsp;</b>
              <span>{character.name_kanji}</span>
            </div>
            <div>
              <b>Alias: &nbsp;</b>
              <span>{character.nicknames.map(nick => `${nick}, `)}</span>
            </div>
            
          </div> 
        </div>
      </div>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { characterId } = ctx.params as { characterId: string };
  let character = null;

  try{
    const { data } = await jikanApi.get<CharacterResponse>(
      `/characters/${characterId}/full`
    );
    character = data.data;
  }catch(err){}

  if(!character){
    return {
      redirect:{
          destination:'/',
          permanent:false,
      }
    }
  }
  
  const { data: dataPictures } = await jikanApi.get<CharacterPictureResponse>(
    `/characters/${characterId}/pictures`
  );


  return {
    props: {
      character: character,
      pictures: dataPictures.data,
    },
  };
}; 

export default InfoCharacterPage;
