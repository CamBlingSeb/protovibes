import { useState, useEffect, ChangeEvent } from 'react'
import classes from './styles/Converter.module.scss';
import type { VideoInfo } from 'types'
import { AudioOutputFormat, Progress } from 'types';

import Search from './Search';
import Prepare from './Prepare';
import Download from './Download';

type ConverterProps = {}

export default function Converter({ }: ConverterProps): JSX.Element {
    const [conversionStatus, setConversionStatus] = useState(Progress.IDLE);
    const updateStatus = (status: Progress) => setConversionStatus(status);

    const [data, setData] = useState({
        url: '',
        fileId: '',
        title: '',
        thumb: '',
        description: '',
        duration: 0,
        durationString: '',
        fileName: '',
        fileFormat: AudioOutputFormat.MP3,
        averageBitrate: 0,
        averageSampleRate: 0,
        track: '',
        artist: '',
        album: '',
        releaseYear: ''
    })

    const {
        url,
        fileId,
        title,
        thumb,
        description,
        duration,
        durationString,
        fileName,
        fileFormat,
        averageBitrate,
        averageSampleRate,
        track,
        artist,
        album,
        releaseYear
    } = data;

    const onDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const updateData = (newData: VideoInfo) => {
        setData({ ...data, ...newData })
    }

    // const onFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     console.log('Format Change: ', e.target.value);
    //     updateData({ fileFormat: e.target.value as AudioOutputFormat })
    // }

    const onFormatChange = (format: AudioOutputFormat) => {
        setData({ ...data, fileFormat: format });
    }

    const resetData = () => {
        setData({
            url: '',
            fileId: '',
            title: '',
            thumb: '',
            description: '',
            duration: 0,
            durationString: '',
            fileName: '',
            fileFormat: AudioOutputFormat.MP3,
            averageBitrate: 0,
            averageSampleRate: 0,
            track: '',
            artist: '',
            album: '',
            releaseYear: ''
        })
        setConversionStatus(Progress.IDLE);
    }

    useEffect(() => {
        if (conversionStatus === Progress.FAILED) {
            console.log('Conversion Failed.')
            resetData();
        }
    }, [conversionStatus])

    return (
        <>
            {conversionStatus === Progress.COMPLETE ? (
                <Download
                    track={track}
                    title={title}
                    fileFormat={fileFormat}
                    fileId={fileId}
                    resetData={resetData}
                />
            ) : data && data.title ? (
                <Prepare
                    data={data}
                    conversionStatus={conversionStatus}
                    updateStatus={updateStatus}
                    updateData={updateData}
                    onFormatChange={onFormatChange}
                    onDataChange={onDataChange}
                    resetData={resetData}
                />
            ) : (
                <Search
                    url={url}
                    updateData={updateData}
                    onDataChange={onDataChange}
                />
            )}
        </>

    )
}
