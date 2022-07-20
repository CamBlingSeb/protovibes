import axios from 'axios';
import config from 'common/requestConfig';

export async function downloadAudio(
    filename: string
) {

    console.log('Download action called');

    const body = {
        filename: filename
    }

    try {
        const res = await axios.post('/api/converter/download', body, config).then(res => res.data);


    } catch (err) {
        console.log(err);
    }
}