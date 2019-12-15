import axios from "axios";
import { API_URL } from '../config'
import { setUser, clearUser } from '../utils/storage'
import { getRequestConfig } from './index'

async function getData(cb) {
    try {
        const query = await axios.get(`${API_URL}/admin`, getRequestConfig());
        const { data } = query
        if (cb) {
            cb(data);
        }
    }
    catch (err) {
        console.error(`error => ${err}`)
    }
}

export { getData };