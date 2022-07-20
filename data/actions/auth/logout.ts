import axios from 'axios';

export async function logout() {
    return await axios.post('/api/auth/logout').then(res => res.data)
}