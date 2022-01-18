import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";


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

    // for KL display card
    const bull = (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                mx: '2px',
                transform: 'scale(0.8)'
            }}
        >
        </Box>
    );

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                        <MenuItem value={0}>0 - None</MenuItem>
                        <MenuItem value={1}>1 - Definite</MenuItem>
                        <MenuItem value={2}>2 - Large</MenuItem >
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
                        <MenuItem value={0}>0 - Normal</MenuItem>
                        <MenuItem value={1}>1 - Narrowing</MenuItem>
                        <MenuItem value={2}>2 - Advanced Narrowing</MenuItem >
                        <MenuItem value={3}>3 - Gone</MenuItem >
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
                        <MenuItem value={0}>0 - None</MenuItem>
                        <MenuItem value={1}>1 - Discrete</MenuItem>
                        <MenuItem value={2}>2 - Discrete Sclerosis w/ Cyst</MenuItem >
                        <MenuItem value={3}>3 - Severe Sclerosis w/ Cyst</MenuItem >
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
                        <MenuItem value={0}>0 - None</MenuItem>
                        <MenuItem value={1}>1 - Discrete</MenuItem>
                        <MenuItem value={2}>2 - Strong</MenuItem >
                    </Select>
                </FormControl>

                {/* composite KL score calculated from user input */}
                {/* <TextField
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
                /> */}

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
                    <Box fullWidth>
                        <Card variant="outlined">
                            {
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} align='center' color="blue" gutterBottom>
                                            User Calculated Kellgren-Lawrence Score
                                        </Typography>
                                        <Typography variant="h5" component="div" color="blue" align='center'>
                                            {KL(
                                                context.xRayNotes.osteophyte,
                                                context.xRayNotes.jointSpace,
                                                context.xRayNotes.sclerosis,
                                                context.xRayNotes.deformation
                                            )}
                                        </Typography>
                                    </CardContent>
                                </React.Fragment>
                            }
                        </Card>
                    </Box>
                </Tooltip>

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

        </div >
    );
}