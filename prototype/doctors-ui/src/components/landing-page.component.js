import { React, useContext} from 'react';

import Box from '@mui/material/Box';
import { StepContext } from "../context/StepContext"
import Modal from '@mui/material/Modal';

export default function LandingPage() {

    const [context, setContext] = useContext(StepContext);


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
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
        >
            <Box sx={modalStyle}>
                <h1>About the project</h1>
            </Box>
        </Modal>
    );
}