import http from "../http-commons";

class AnalysisDisplayService {
    fetchData(id, setResponse) {
        return http.get(`/api/v1/xray/analysis/${id}`).then(response => {
            setResponse(response.data)
        });
    }
}

export default new AnalysisDisplayService();
