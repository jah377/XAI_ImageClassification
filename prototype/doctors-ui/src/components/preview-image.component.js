import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import PreviewImagesUserNotes from "./preview-notes.component";

export default function PreviewImages(props) {

    const [context, setContext] = useContext(StepContext);

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

                {/* right column */}
                <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={2}>
                    <PreviewImagesUserNotes />

                    <Button fullWidth variant="contained" onClick={() => setContext(context => ({
                        ...context,
                        step: context.step + 1, // incrementing the step counter, we get navigated to the next step "Preview Image"
                    }))} >Go To Analysis</Button>
                </Stack>
            </Stack>
        </div>
    );
}
