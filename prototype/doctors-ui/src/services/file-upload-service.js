import http from "../http-commons";

class FileUploadService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("xray", file);

        return http.post("api/v1/xray/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => { 
            onUploadProgress(res.data['id'])
        }); 
    }

}

export default new FileUploadService();