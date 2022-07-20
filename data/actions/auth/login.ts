import axios from 'axios';
import config from 'common/requestConfig';

export async function login(accessCode: string) {
    console.log('Login Action Called with accessCode: ', accessCode);
    const body = {
        accessCode: accessCode
    }

    try {
        const res = await axios.post('/api/auth', body, config).then(res => res.data);

        console.log('Login Response: ', res);

        return res
    } catch (err) {
        return { success: false }
    }

}