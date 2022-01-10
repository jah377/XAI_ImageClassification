import axios from "axios";

// address of the server based on environment (development local or not)
const baseURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8082" : ""

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});