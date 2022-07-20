export type VideoInfo = {
    url?: string;
    fileId?: string;
    title?: string;
    thumb?: string;
    description?: string;
    duration?: number;
    fileName?: string;
    fileFormat?: AudioOutputFormat;
    averageBitrate?: number;
    averageSampleRate?: number;
    track?: string;
    artist?: string;
    album?: string;
    releaseYear?: string;
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