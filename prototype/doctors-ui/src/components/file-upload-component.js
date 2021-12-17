import React, { useState, useContext } from "react";
import UploadService from "../services/file-upload-service";
import { StepContext } from "../context/StepContext";

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
        setState(state => ({
            ...state,
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0])
        }))
    }

    const upload = () => {
        console.log("TODO upload feature")
        setContext(context => ({
            ...context,
            step: context.step + 1, // incrementing the step counter, we get navigated to the next step "Preview Image"
            image: state.currentFile,
            previewImage: state.previewImage
        }))
    }

    const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
    } = state;

    return (
        <div>

            <div className="preview-container">
                {/* TODO make this a drag and drop zone */}
                {/* <MyDropZone onSuccess={this.upload}/> */}
                {previewImage && (
                    <img className="preview" src={previewImage} alt="" />
                )}
            </div>

            <div>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={selectFile} />
                        <Button variant="contained" component="span">
                            Select
                        </Button>
                    </label>
                    <Button variant="contained" component="span" onClick={upload}>
                        Upload
                    </Button>
                </Stack>
            </div>
        </div>
    );
}