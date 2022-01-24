import http from "../http-commons";

class AnalysisDisplayService {
 
    fetchData = (image, setResponse) => {
        let formData = new FormData();

        let e = image.split("base64,")[1]

        formData.append("xray", e);
        return http.post(`/api/v1/xray/analysis`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            setResponse(response.data)
        });
    }
}

export default new AnalysisDisplayService();
