import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Stack from '@mui/material/Stack';
import PreviewImagesUserNotes from "./preview-notes.component";

export default function PreviewImages(props) {

    const [context] = useContext(StepContext);

    return (
        <div>
            <Stack direction="row" alignItems="flex-start" justifyContent="center" spacing={2}>

                <TransformWrapper>
                    <TransformComponent>
                        <img
                            className="preview"
                            src={context.previewImage}
                            alt=""
                        />
                    </TransformComponent>
                </TransformWrapper>

                <PreviewImagesUserNotes />
            </Stack>
        </div>
    );
}
