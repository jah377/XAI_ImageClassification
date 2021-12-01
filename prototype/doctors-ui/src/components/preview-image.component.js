import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";


export default function PreviewImages(props) {

    const [context] = useContext(StepContext);
    console.log(context)

    return (
        <img className="preview" src={context.previewImage} alt="" />
    );
}
