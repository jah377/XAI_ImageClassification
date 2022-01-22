import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import { StepContext } from "../context/StepContext"
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';


import logo from './logoKNEEOXAI_cropped.svg'

export default function LandingPage() {

    const [context, setContext] = useContext(StepContext);


    const modalStyle = {
        position: 'absolute',
        paddingLeft: "3%",
        paddingRight: "3%",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "25%",
        bgcolor: 'background.paper',
        borderRadius: '25px',
        boxShadow: 24,
        p: 4,
    };


    const handleClose = () => {
        setContext(context => ({ ...context, openModal: false }))
    }

    return (
        <Modal
            open={context.openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ borderRadius: '25px' }}
        >
            <Box sx={modalStyle}>
                <Stack flexDirection="row" justifyContent="center">
                    <img src={logo} alt="KNEE-O-XAI" />
                </Stack>
                <div className='aboutParagraph'>
                    <p className='highlight'>Knee-O-XAI is a smart-assistant tool to guide and supplement osteoarthritis evaluation.</p>
                    This digital platform is powered by state-of-the-art explanatory algorithms and provides critical insights useful for clinicians and their patients. <b />
                    The multi-stage process enables physicians to upload planar radiographs, record relevant patient information, and carefully inspect the image. <b />
                    The smart-assistant predicts the Kellgren-Lawrence grade and provides grade probabilities and multiple visualisations highlighting regions supporting the expected grade.
                    Lastly, the platform enables physicians to save and export all recorded notes and images into a streamlined document.
                </div>

                <Stack className="buttonGroup" flexDirection="row" justifyContent="center">
                    <Button size="large" variant="contained" onClick={handleClose} >Get started!</Button>
                </Stack>

                <Stack className="buttonGroup" flexDirection="row" justifyContent="space-evenly">
                    <Button variant="contained" onClick={() => {
                        console.log("CLICKED TUTORIAL")
                    }}>
                        Tutorial
                    </Button>
                    <Button variant="contained" onClick={() => {
                        console.log("CLICKED ABOUT")
                    }}>
                        About
                    </Button>
                    <Button variant="contained" onClick={() => {
                        console.log("CLICKED CONTACT")
                    }}>
                        Contact
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}