import axios from "axios";


export function PostRequest(url,payload){
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post(`${process.env.REACT_APP_BASEURL}/${url}`,payload)
}


export function PatchRequest(url, payload){
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.patch(`${process.env.REACT_APP_BASEURL}/${url}`,payload);
}

export function DeleteRequest(url){
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.delete(`${process.env.REACT_APP_BASEURL}/${url}`);
}