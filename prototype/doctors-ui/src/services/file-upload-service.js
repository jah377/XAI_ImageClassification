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

    // from https://www.npmjs.com/package/react-image-crop#usage
    getCrop(image, crop, w, h) {

        let img = new Image()
        img.onload = function () {
            ctx.drawImage(img, w, h);
        }
        img.src = image

        const canvas = document.createElement("canvas");
        const scaleX = img.naturalWidth / w;
        const scaleY = img.naturalHeight / h;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        // New lines to be added
        const pixelRatio = 1 // window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        // As Base64 string
        const base64Image = canvas.toDataURL("image/png");
        return base64Image
    }

}

export default new FileUploadService();