import axios from "axios";


export function GetRequest(url){
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${process.env.REACT_APP_BASEURL}/${url}`)
}