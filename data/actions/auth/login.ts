import axios from 'axios';
import config from 'common/requestConfig';

export async function login(
    accessCode: string,
    errorCallback?: () => void
) {
    const body = {
        accessCode: accessCode
    }

    try {
        const res = await axios.post('/api/auth', body, config)

        return res.data
    } catch (err: any) {
        if (errorCallback) {
            errorCallback();
        }
        console.log('Login Error: ', err);
        return err.response.data;
    }

}