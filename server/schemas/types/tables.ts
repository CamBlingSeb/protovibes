export interface User {
    user_id: number,
    access_code: string,
    created_at?: Date
}

export interface Conversion {
    id: number;
    source_id: string;
    user_id: number;
    track_id: number;
    format: string;
    created_at: Date;
}

export interface Source {
    id: string;
    title: string;
    channel: string;
    url: string;
    thumb: string;
    description: string;
    duration: number;
    duration_string: string;
    sample_rate: number;
    bit_rate: number;
    track_id?: number;
}

export interface Track {
    id: number;
    title: string;
    artist_id: number;
    release_year?: number;
    mbid?: string;
    bpm?: number;
}

export interface Artist {
    id: number;
    name: string;
    legal_name?: string;
    gender?: string;
    born?: Date;
    country?: string;
    bio?: string;
    mbid?: string;
    photo_url?: string;
}