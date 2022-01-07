import React, { useState, useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";

// YOUTUBE: https://www.youtube.com/watch?v=sTdt2cJS2dg

export default function PreviewImagesUserNotes(props) {

    const [context] = useContext(StepContext);
    const [notes, setNotes] = useState("");

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
                    onChange={(newNotes) => { setNotes(newNotes.target.value) }} />
            </form>
        </div>
    );
}