import axios from "axios";
import { base_api } from "./UserApi.js";
const headers = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "ngrok-skip-browser-warning": "69420",

    },
    "Access-Control-Allow-Origin": "*",
}

// const base_api = 'https://project2-97w5.onrender.com'
class AdminApi {
    async GetAllUser() {
        try {
            const response = await axios.get(`${base_api}/api/user/allusers`, headers);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async GetALlFilm() {
        try {
            const response = await axios.get(`${base_api}/api/admin/film`, headers);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default new AdminApi();