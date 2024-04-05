import axios from "axios";

const headers = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    "Access-Control-Allow-Origin": "*",
}
const base_api = 'http://localhost:8080'
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
}
export default new UserApi()