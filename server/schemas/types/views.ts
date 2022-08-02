export interface CombinedMetadata {
    /* From Sources Table */
    sourceId: string;
    thumb?: string;
    url: string;
    title: string;
    channel: string;
    description: string;
    bit_rate: number;
    sample_rate: number;
    duration: number;
    durationString: string;
    /* From Tracks Table */
    trackId: number;
    track: string;
    bpm?: number;
    releaseDate?: string | Date;
    /* From Artists Table */
    artistId: number;
    artist: string;
    artistThumb?: string;
}