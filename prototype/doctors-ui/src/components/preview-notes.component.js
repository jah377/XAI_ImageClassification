import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";

// YOUTUBE: https://www.youtube.com/watch?v=sTdt2cJS2dg

export default function PreviewImagesUserNotes(props) {

    const [context, setContext] = useContext(StepContext);
    const xRayNotes = context.xRayNotes

    let setXRayNotesOnKeyToValue = (key, value) => {
        xRayNotes[key] = value
        setContext(context => ({
            ...context,
            xRayNotes: xRayNotes
        }))
    }

    return (
        <div>
            <form noValidate autoComplete='off'>
                <TextField
                    className="preview-notes"
                    label="Enter XRay Notes"
                    varient="outlined"
                    multiline
                    fullWidth
                    rows={10}
                    value={context.xRayNotes.notes}
                    onChange={(event) => { setXRayNotesOnKeyToValue("notes", event.target.value) }}
                />
            </form>
        </div>
    );
}