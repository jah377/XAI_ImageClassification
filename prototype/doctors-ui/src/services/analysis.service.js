import http from "../http-commons";

class AnalysisDisplayService {
    fetchData(setResponse) {
        return http.get("/api/v1/xray/analysis").then(response => {
            setResponse(response.data)
        });
    }
}

export default new AnalysisDisplayService();
