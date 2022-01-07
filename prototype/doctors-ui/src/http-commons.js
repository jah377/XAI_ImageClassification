import axios from "axios";

// address of the server based on environment (development local or not)
const baseURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8082" : "http://127.0.0.1"

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});