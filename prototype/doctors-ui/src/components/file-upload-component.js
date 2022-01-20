import React, { useState, useContext } from "react";
import FileUploadService from "../services/file-upload-service";
import { StepContext } from "../context/StepContext";
import FileUploadUserNotes from "./file-upload-notes.component";

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const Input = styled('input')({
    display: 'none',
});

// for image editing: https://github.com/react-dropzone/react-dropzone#need-image-editing
export default function UploadImages(props) {

    const [context, setContext] = useContext(StepContext);

    let imgRef = React.createRef()

    const selectFile = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onerror = error => console.log(error);
        reader.onload = () => {
            setContext(context => ({
                ...context,
                // currentFile: event.target.files[0],
                selectedImage: reader.result
            }))
        }
    }

    const upload = () => {
        const width = imgRef.imageRef.current.clientWidth
        const height = imgRef.imageRef.current.clientHeight
        const croppedImage = FileUploadService.getCrop(context.selectedImage, crop, width, height)
        setContext(context => ({
            ...context,
            step: context.step + 1, // incrementing the step counter, we get navigated to the next step "Preview Image"
            selectedImage: context.selectedImage,
            previewImage: croppedImage
        }))
    }

    const [crop, setCrop] = useState({
        unit: 'px',
        aspect: 2 / 2,
        x: 0,
        y: 0,
        width: 336,
    });

    return (
        <div>
            <div>
                <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={selectFile} />
                        <Button variant="contained" component="span" size="large">
                            Upload X-ray
                        </Button>
                    </label>
                </Stack>
            </div>
            <Stack direction="row" alignItems="flex-start" justifyContent="center" spacing={2} className="uploadStack">

                {context.selectedImage && (
                    <ReactCrop src={context.selectedImage} ref={r => imgRef = r} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                )}

                {!context.selectedImage && (
                    <div className="upload-container">
                        Please upload an X-ray
                    </div>
                )}
                <div className='upload-notes'>
                    <FileUploadUserNotes />

                    <Stack direction="row" alignItems="flex-start" justifyContent="flex-end" spacing={2} sx={{marginTop: "4%"}}>
                        <Button variant="contained" component="span" size="large" onClick={upload}>
                            Preview Selection
                        </Button>
                    </Stack>
                </div>
            </Stack>
        </div>

    );
}