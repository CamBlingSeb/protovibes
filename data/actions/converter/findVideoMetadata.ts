import axios from 'axios';
import config from 'common/requestConfig';

export async function findVideoMetadata(url: string) {
    console.log('findVideo action called');

    const body = {
        url: url
    }

    const res = await axios.post('/api/converter/find', body, config).then(res => res.data)

    console.log('findVideoResponse: ', res);
    if (res.hasOwnProperty('success') && res.success === false) {
        return null;
    }

    return res;
}