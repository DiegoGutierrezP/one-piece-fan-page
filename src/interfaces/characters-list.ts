export interface CharactersListResponse {
    data: ItemCharacterList[];
}

export interface ItemCharacterList {
    character:    CharacterClass;
    role:         Role;
    favorites:    number;
    voice_actors: VoiceActor[];
}

export interface CharacterClass {
    mal_id: number;
    url:    string;
    images: { [key: string]: ImageCharacter };
    name:   string;
}

// export interface CharacterImages {
//     jpg:  { [key: string]: {image_url:string} };
//     webp: Webp;
// }

export interface ImageCharacter {
    image_url:       string;
    small_image_url: string | undefined;
    large_image_url: string| undefined;
}

export interface Jpg {
    image_url: string;
}

export interface Webp {
    image_url:       string;
    small_image_url: string;
}

export enum Role {
    Main = "Main",
    Supporting = "Supporting",
}

export interface VoiceActor {
    person:   Person;
    language: Language;
}

export enum Language {
    French = "French",
    German = "German",
    Italian = "Italian",
    Japanese = "Japanese",
    Spanish = "Spanish",
}

export interface Person {
    mal_id: number;
    url:    string;
    images: PersonImages;
    name:   string;
}

export interface PersonImages {
    jpg: Jpg;
}