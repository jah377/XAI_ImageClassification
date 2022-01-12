import { React, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepContext } from "../context/StepContext"
import { StepIcon, StepLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import LandingPage from './landing-page.component';

export default function HorizontalNonLinearStepper(props) {

    const [state, setState] = useContext(StepContext);

    const setActiveStep = (step) => {
        setState(state => ({ ...state, step: step }))
    };

    const activeStep = state.step;
    const steps = props.stageNames;

    const [completed] = useState({});

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleOpen = () => {
        setState(state => ({ ...state, openModal: true }))
    }

    return (
        <div>
            <LandingPage />
            <Box className="stepper-container">
                <IconButton color="primary" aria-label="About the app" component="span" onClick={handleOpen}>
                    <InfoIcon />
                </IconButton>
                <Stepper nonLinear activeStep={activeStep} className="stepper">
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepLabel StepIconComponent={StepIcon} color="inherit" onClick={handleStep(index)}>
                                <div className="stepButton">
                                    {label}
                                </div>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>

    );
}