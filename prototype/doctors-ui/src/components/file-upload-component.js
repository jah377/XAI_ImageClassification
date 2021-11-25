import React, { Component, useCallback } from "react";
import UploadService from "../services/file-upload-service";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Input = styled('input')({
    display: 'none',
});

// for image editing: https://github.com/react-dropzone/react-dropzone#need-image-editing
export default class UploadImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: undefined,
            previewImage: undefined,
            progress: 0,
            message: "",

            imageInfos: [],
        };
    }

    selectFile = (event) => {
        console.log("IMAGE SELECTED")
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            progress: 0,
            message: ""
        });
    }

    upload() {
        console.log("TODO upload feature")
    }

    render() {
        const {
            currentFile,
            previewImage,
            progress,
            message,
            imageInfos,
        } = this.state;

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
                    <div>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file" onChange={this.selectFile} />
                            <Button variant="contained" component="span" onClick={this.upload}>
                                Select
                            </Button>
                            <Button variant="contained" component="span" onClick={this.upload}>
                                Upload
                            </Button>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}