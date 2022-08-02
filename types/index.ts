export type VideoInfo = {
    url?: string;
    fileId?: string;
    title?: string;
    thumb?: string;
    artistThumb?: string;
    description?: string;
    duration?: number;
    durationString?: string;
    fileName?: string;
    fileFormat?: AudioOutputFormat;
    averageBitrate?: number;
    averageSampleRate?: number;
    bpm?: number;
    track?: string;
    artist?: string;
    album?: string;
    releaseDate?: string;
}

export enum Progress {
    IDLE = 'idle',
    PENDING = 'pending',
    COMPLETE = 'complete',
    FAILED = 'failed'
}

export enum AudioOutputFormat {
    MP3 = 'mp3',
    FLAC = 'flac',
    WAV = 'wav'
}