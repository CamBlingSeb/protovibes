import axios from 'axios';
import config from 'common/requestConfig';
import type { VideoInfo } from 'types'
import { AudioOutputFormat } from 'types'

export async function convertVideoToAudio({
    url,
    title,
    fileId,
    fileFormat
}: {
    url: VideoInfo['url'];
    title: VideoInfo['title'];
    fileId: VideoInfo['fileId'];
    fileFormat: AudioOutputFormat
}) {
    console.log('ConvertToAudio Acion Called');

    const body = {
        url,
        title,
        fileId,
        fileFormat
    }
    try {
        const res = await axios.post('/api/converter/convert', body, config).then(res => res.data);


        console.log('Converter Route Response: ', res);
        if (res.hasOwnProperty('success') && res.success === false) {
            return null;
        }

        return res;
    } catch (err) {
        console.log(err);
        return {
            success: false
        }
    }
}