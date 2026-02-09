import axios from "axios";


const url = process.env.REACT_APP_SERVER_URL ; 
console.log(">>> debug ref .env  - " , url); 

const api = axios.create({
    baseURL : "http://localhost:8888",
    headers : {
        "Content-Type" : "application/json"
    }

});

export default api ; 