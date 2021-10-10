import axios from 'axios';

function customAxios() {
    return axios.get("http://3.37.167.224:8080/api/hello");
}

export default customAxios;