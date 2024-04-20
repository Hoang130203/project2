import axios from "axios";

const headers = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    "Access-Control-Allow-Origin": "*",
}
export const base_api = 'http://localhost:8080'

// const base_api = 'https://project2-97w5.onrender.com'
class UserApi {
    PostImage(img) {

        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'xosulpvx');
        data.append('cloud_name', 'dxmczmcpn');
        data.append('folder', 'Home');
        return axios.post('https://api.cloudinary.com/v1_1/dxmczmcpn/image/upload', data);
    }


    Login(userName, password) {
        return axios.post(`${base_api}/api/auth/login`, {
            "account": userName,
            "password": password
        }, headers)
    }
    Register(userName, password, email, name) {
        return axios.post(`${base_api}/api/auth/register`, {
            "account": userName,
            "password": password,
            "email": email,
            "name": name
        }, headers)
    }
    AuthProvider(id, name, email, avatar) {
        return axios.post(`${base_api}/api/auth/providerAuth`, {
            "id": id,
            "name": name,
            "email": email,
            "avatar": avatar,
            "hasProvider": true
        }, headers)
    }
    UpdateUser(password, isChangePass, name, email, age) {
        return axios.put(`${base_api}/api/user/update`, {
            "password": password,
            isChangePass: isChangePass,
            "email": email,
            "name": name,
            "age": age
        }, headers)
    }
    UpdateAvatar(avatar) {
        return axios.put(`${base_api}/api/user/avatar?avatar=${avatar}`, {
        }, headers)
    }

    VnPay(totalMoney, orderInfo) {
        return axios.post(`${base_api}/vnpay/submitOrder?amount=${totalMoney}&orderInfo=${orderInfo}`, {}, headers)
    }

    PostFilm(film) {
        return axios.post(`${base_api}/api/film/film`, film, headers)
    }
    GetMovies(page) {
        return axios.get(`${base_api}/api/film/movies?page=${page}&size=30`, headers)
    }
    GetSeries(page) {
        return axios.get(`${base_api}/api/film/series?page=${page}&size=30`, headers)
    }
    GetMoviesTop() {
        return axios.get(`${base_api}/api/film/moviesTop`, headers)
    }
    GetSeriesTop() {
        return axios.get(`${base_api}/api/film/seriesTop`, headers)
    }
    GetByType(type, page) {
        return axios.get(`${base_api}/api/film/film?type=${type}&page=${page}&size=30`, headers)
    }
    GetByCountry(country, page) {
        return axios.get(`${base_api}/api/film/country?country=${country}&page=${page}&size=30`, headers)
    }
    GetByYear(year, page) {
        return axios.get(`${base_api}/api/film/year?year=${year}&page=${page}&size=30`, headers)
    }
    GetByKeyWord(key, page = 0, size = 10) {
        return axios.get(`${base_api}/api/film/keyword?key=${key}&page=${page}&size=${size}`, headers)
    }
    GetFilmDetail(id) {
        return axios.get(`${base_api}/api/film/info?filmId=${id}`, headers)
    }
    GetEpisode(id) {
        return axios.get(`${base_api}/api/film/episode?episodeId=${id}`, headers)
    }
    GetTopView() {
        return axios.get(`${base_api}/api/film/top12views`, headers)
    }
    GetTopNew() {
        return axios.get(`${base_api}/api/film/top12FilmNew`, headers)
    }
    GetTopEpisodeNew() {
        return axios.get(`${base_api}/api/film/top12Newests`, headers)
    }
    GetFilmByEpisode(id) {
        return axios.get(`${base_api}/api/film/filmByEpisode?id=${id}`, headers)
    }
}
export default new UserApi()