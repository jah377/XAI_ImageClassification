import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8082", // address of the server
    headers: {
        "Content-type": "application/json"
    }
});