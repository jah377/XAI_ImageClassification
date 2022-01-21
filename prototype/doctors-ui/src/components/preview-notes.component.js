import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Icon from '@mui/material/Icon';

// YOUTUBE: https://www.youtube.com/watch?v=sTdt2cJS2dg

export default function PreviewImagesUserNotes(props) {

    const [context, setContext] = useContext(StepContext);

    let setXRayNotesOnKeyToValue = (key, value) => {
        let updatedXRayNotes = context.xRayNotes
        updatedXRayNotes[key] = value
        setContext(context => ({
            ...context,
            xRayNotes: updatedXRayNotes
        }))

        setContext(context => ({
            ...context,
            xRayNotes: {
                ...context.xRayNotes,
                KL: KL()
            }
        }))
    }

    // for dropdown menu
    const [openOsteophyte, setOpen_osteophyte] = React.useState(false);
    const [openJoint, setOpenJoint] = React.useState(false);
    const [openSclerosis, setOpen_sclerosis] = React.useState(false);
    const [openDeformation, setOpen_deformation] = React.useState(false);

    // for KL Score
    // composite calc. found in Wick 2013 (original defined in Kellgren 1957)
    // for KL Score
    // composite calc. found in Wick 2013 (original defined in Kellgren 1957)
    const KL = () => {

        let elements = [
            context.xRayNotes.osteophyte,
            context.xRayNotes.jointSpace,
            context.xRayNotes.sclerosis,
            context.xRayNotes.deformation
        ]

        // convert elements to ints
        elements = elements.map(x => { return parseInt(x.split(" ")[0]) })
        let total = elements.reduce((a, b) => a + b)

        let calculatedKLScore = 0

        if (total === 10) calculatedKLScore = 4
        else if (total >= 5) calculatedKLScore = 3
        else if (total >= 3) calculatedKLScore = 2
        else if (total >= 1) calculatedKLScore = 1

        return calculatedKLScore
    }

    return (
        <div>
            <Stack direction="column" alignItems="left" justifyContent="space-between" spacing={1}>
                <h3>Enter Radiographic Grading of Knee OA</h3>

                {/* dropdown -- osteophytes notes */}
                <FormControl >
                    <InputLabel>Select Osteophyte Formation</InputLabel>
                    <Select
                        label="Select Osteophyte Formation"
                        open={openOsteophyte}
                        onClose={() => { setOpen_osteophyte(false) }}
                        onOpen={() => { setOpen_osteophyte(true) }}
                        value={context.xRayNotes.osteophyte}
                        onChange={(event) => { setXRayNotesOnKeyToValue("osteophyte", event.target.value) }}
                    >
                        <MenuItem value={"0 - None"}>0 - None</MenuItem>
                        <MenuItem value={"1 - Definite"}>1 - Definite</MenuItem>
                        <MenuItem value={"2 - Large"}>2 - Large</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- joint space width notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Joint Space Width</InputLabel>
                    <Select
                        label="Select Joint Space Width"
                        open={openJoint}
                        onClose={() => { setOpenJoint(false) }}
                        onOpen={() => { setOpenJoint(true) }}
                        value={context.xRayNotes.jointSpace}
                        onChange={(event) => { setXRayNotesOnKeyToValue("jointSpace", event.target.value) }}
                    >
                        <MenuItem value={"0 - Normal"}>0 - Normal</MenuItem>
                        <MenuItem value={"1 - Narrowing"}>1 - Narrowing</MenuItem>
                        <MenuItem value={"2 - Advanced Narrowing"}>2 - Advanced Narrowing</MenuItem >
                        <MenuItem value={"3 - Gone"}>3 - Gone</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- sclerosis notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Subchondral Sclerosis</InputLabel>
                    <Select
                        label="Select Subchondral Sclerosis"
                        open={openSclerosis}
                        onClose={() => { setOpen_sclerosis(false) }}
                        onOpen={() => { setOpen_sclerosis(true) }}
                        value={context.xRayNotes.sclerosis}
                        onChange={(event) => { setXRayNotesOnKeyToValue("sclerosis", event.target.value) }}
                    >
                        <MenuItem value={"0 - None"}>0 - None</MenuItem>
                        <MenuItem value={"1 - Discrete"}>1 - Discrete</MenuItem>
                        <MenuItem value={"2 - Discrete Sclerosis w/ Cyst"}>2 - Discrete Sclerosis w/ Cyst</MenuItem >
                        <MenuItem value={"3 - Severe Sclerosis w/ Cyst"}>3 - Severe Sclerosis w/ Cyst</MenuItem >
                    </Select>
                </FormControl>

                {/* dropdown -- deformation notes */}
                <FormControl fullWidth className='menu-input'>
                    <InputLabel>Select Deformation</InputLabel>
                    <Select
                        label="Select Deformation"
                        open={openDeformation}
                        onClose={() => { setOpen_deformation(false) }}
                        onOpen={() => { setOpen_deformation(true) }}
                        value={context.xRayNotes.deformation}
                        onChange={(event) => { setXRayNotesOnKeyToValue("deformation", event.target.value) }}
                    >
                        <MenuItem value={"0 - None"}>0 - None</MenuItem>
                        <MenuItem value={"1 - Discrete"}>1 - Discrete</MenuItem>
                        <MenuItem value={"2 - Strong"}>2 - Strong</MenuItem >
                    </Select>
                </FormControl>


                <Box fullWidth>
                    <Card variant="outlined">
                        {
                            <React.Fragment>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} align='center' color="#2824D1" gutterBottom>
                                        User Calculated Kellgren-Lawrence Score
                                    </Typography>
                                    <Typography variant="h5" component="div" color="#2824D1" align='center'>
                                        {context.xRayNotes.KL}
                                    </Typography>
                                </CardContent>
                            </React.Fragment>
                        }

                        <Tooltip placement="right-end" title={
                            <React.Fragment>
                                <Typography color="inherit">Calculated KL Score</Typography>
                                <Typography paragraph sx={{ fontSize: 12 }} display="block">
                                    Kellgren-Lawrence method evaluates severity of knee OA as a sum score according to measurements of joint space, surface deformation, sclerosis, and presence of osteophytes
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} display="block">
                                    Grade 0 = 0 points;
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} display="block">
                                    Grade 1 = 1-2 points;
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} display="block">
                                    Grade 2 = 3-4 points
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} display="block">
                                    Grade 3 = 5-9 points;
                                </Typography>
                                <Typography paragraph sx={{ fontSize: 12 }} display="block">
                                    Grade 4 = 10 points
                                </Typography>
                                <Typography sx={{ fontSize: 8, fontStyle: 'italic' }}>
                                    Wick et al. Clinical Imaging Assessment of Knee Osteoarthritis in the Elderly. 2014.
                                </Typography>
                                <Typography sx={{ fontSize: 8, fontStyle: 'italic' }}>
                                    Kellgren & Lawrence. Radiological Assessment of Osteoarthrosis. 1957.
                                </Typography>
                            </React.Fragment>
                        }>
                            <Icon style={{ float: 'right', color: 'inherit' }} >
                                <InfoOutlinedIcon fontSize="small" />
                            </Icon>
                        </Tooltip>
                    </Card>
                </Box>

                {/* physician notes from preview page */}
                <form noValidate autoComplete='off'>
                    <TextField
                        className="upload-notes"
                        label="Add XRay Notes"
                        varient="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        value={context.xRayNotes.notes}
                        onChange={(event) => { setXRayNotesOnKeyToValue("notes", event.target.value) }}
                    />
                </form>




            </Stack>

        </div >
    );
}