import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { render } from "@testing-library/react";


export default function PreviewImages(props) {

    const [context] = useContext(StepContext);
    console.log(context)
    render()
    return (
        <TransformWrapper>
            <TransformComponent>
                <img className="preview" src={context.previewImage} alt="" />
            </TransformComponent>
        </TransformWrapper>
    );
}
