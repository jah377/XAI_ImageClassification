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

    const [state, setState] = useState({
        currentFile: undefined,
        previewImage: undefined,
        imageInfos: [],
    });

    const selectFile = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onerror = error => console.log(error);
        reader.onload = () => {
            setState(state => ({
                ...state,
                // currentFile: event.target.files[0],
                previewImage: reader.result
            }))
        }
    }

    const upload = () => {
        FileUploadService.upload(state.previewImage, (id) => {
            setContext(context => ({
                ...context,
                uploadId: id,
                step: context.step + 1, // incrementing the step counter, we get navigated to the next step "Preview Image"
                previewImage: state.previewImage
            }))
        })
    }

    const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
    } = state;

    const [crop, setCrop] = useState({
        aspect: 2 / 2,
        x: 0,
        y: 0,
        width: 448,
    });

    const setInitialCrop = image => {
        console.log(image)
    }

    return (
        <div>
            <div>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={selectFile} />
                        <Button variant="contained" component="span" size="large">
                            Select
                        </Button>
                    </label>
                    <Button variant="contained" component="span" size="large" onClick={upload}>
                        Upload
                    </Button>
                </Stack>
            </div>
            <Stack direction="row" alignItems="flex-start" justifyContent="center" spacing={2}>
                <div>
                    <div className="upload-container">
                        {/* TODO make this a drag and drop zone */}
                        {/* <MyDropZone onSuccess={this.upload}/> */}
                        {previewImage && (
                            <ReactCrop src={previewImage} crop={crop} onChange={newCrop => setCrop(newCrop)} onImageLoaded={image => setInitialCrop(image)}/>
                        )}

                        {!previewImage && context.previewImage && (
                            <img className="upload" src={context.previewImage} alt="" />
                        )}
                    </div>
                </div>
                <div className='upload-notes'>
                    <FileUploadUserNotes />
                </div>
            </Stack>
        </div>

    );
}