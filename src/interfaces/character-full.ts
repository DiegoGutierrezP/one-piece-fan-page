import { ImageCharacter } from "./characters-list";

export interface CharacterResponse {
    data: Character;
}

export interface Character {
    mal_id:     number;
    url:        string;
    images:     DataImages;
    name:       string;
    name_kanji: string;
    nicknames:  any[];
    favorites:  number;
    about:      string | undefined;
    anime:      AnimeElement[];
    manga:      any[];
    voices:     Voice[];
}

export interface AnimeElement {
    role:  string;
    anime: AnimeAnime;
}

export interface AnimeAnime {
    mal_id: number;
    url:    string;
    images: DataImages;
    title:  string;
}



export interface DataImages {
    [key: string]: ImageCharacter
}


export interface Voice {
    person:   PersonVoice;
    language: string;
}

export interface PersonVoice {
    mal_id: number;
    url:    string;
    images: DataImages;
    name:   string;
}

