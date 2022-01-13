import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

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

    // for dropdown menu
    const [openOsteophyte, setOpen_osteophyte] = React.useState(false);
    const [openJoint, setOpenJoint] = React.useState(false);
    const [openSclerosis, setOpen_sclerosis] = React.useState(false);
    const [openDeformation, setOpen_deformation] = React.useState(false);

    // for KL Score
    // composite calc. found in Wick 2013 (original defined in Kellgren 1957)
    function KL(osteophyte, jointSpace, sclerosis, deformation) {

        var total = osteophyte + jointSpace + sclerosis + deformation

        if (total == 10) {
            return 4;
        } else if (total >= 5) {
            return 3;
        } else if (total >= 3) {
            return 2;
        } else if (total >= 1) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <div>
            <Stack direction="column" alignItems="left" justifyContent="space-between" spacing={1}>

                <h2>Enter Radiographic Grading of Knee OA</h2>

                {/* dropdown -- osteophytes notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Osteophyte Formation</InputLabel>
                    <Select
                        open={openOsteophyte}
                        onClose={() => { setOpen_osteophyte(false) }}
                        onOpen={() => { setOpen_osteophyte(true) }}
                        value={context.xRayNotes.osteophyte}
                        onChange={(event) => { setXRayNotesOnKeyToValue("osteophyte", event.target.value) }}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Definite</MenuItem>
                        <MenuItem value={2}>Large</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- joint space width notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Joint Space Width</InputLabel>
                    <Select
                        open={openJoint}
                        onClose={() => { setOpenJoint(false) }}
                        onOpen={() => { setOpenJoint(true) }}
                        value={context.xRayNotes.jointSpace}
                        onChange={(event) => { setXRayNotesOnKeyToValue("jointSpace", event.target.value) }}
                    >
                        <MenuItem value={0}>Normal</MenuItem>
                        <MenuItem value={1}>Narrowing</MenuItem>
                        <MenuItem value={2}>Advanced Narrowing</MenuItem >
                        <MenuItem value={3}>Gone</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- sclerosis notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Subchondral Sclerosis</InputLabel>
                    <Select
                        open={openSclerosis}
                        onClose={() => { setOpen_sclerosis(false) }}
                        onOpen={() => { setOpen_sclerosis(true) }}
                        value={context.xRayNotes.sclerosis}
                        onChange={(event) => { setXRayNotesOnKeyToValue("sclerosis", event.target.value) }}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Discrete</MenuItem>
                        <MenuItem value={2}>Discrete Sclerosis w/ Cyst</MenuItem >
                        <MenuItem value={3}>Severe Sclerosis w/ Cyst</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- deformation notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Deformation</InputLabel>
                    <Select
                        open={openDeformation}
                        onClose={() => { setOpen_deformation(false) }}
                        onOpen={() => { setOpen_deformation(true) }}
                        value={context.xRayNotes.deformation}
                        onChange={(event) => { setXRayNotesOnKeyToValue("deformation", event.target.value) }}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Discrete</MenuItem>
                        <MenuItem value={2}>Strong</MenuItem >
                    </Select>
                </FormControl>

                {/* composite KL score calculated from user input */}
                <TextField
                    className="preview-notes"
                    label="Calculated KL Score"
                    varient="outlined"
                    fullWidth
                    value={KL(
                        context.xRayNotes.osteophyte,
                        context.xRayNotes.jointSpace,
                        context.xRayNotes.sclerosis,
                        context.xRayNotes.deformation)}
                    onChange={(event) => { setXRayNotesOnKeyToValue("KL", event.target.value) }}
                />

                {/* physician notes from preview page */}
                <form noValidate autoComplete='off'>
                    <TextField
                        className="upload-notes"
                        label="Add XRay Notes"
                        varient="outlined"
                        multiline
                        rows={10}
                        fullWidth
                        value={context.xRayNotes.notes}
                        onChange={(event) => { setXRayNotesOnKeyToValue("notes", event.target.value) }}
                    />
                </form>




            </Stack>

        </div>
    );
}