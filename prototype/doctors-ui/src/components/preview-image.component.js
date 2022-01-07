import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PreviewImagesUserNotes from "./preview-notes.component";

export default function PreviewImages(props) {

    const [context] = useContext(StepContext);

    return (
        <div>
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
        </div>
    );
}
