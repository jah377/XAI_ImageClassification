import { React, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepContext } from "../context/StepContext"
import { StepIcon, StepLabel } from '@mui/material';

export default function HorizontalNonLinearStepper(props) {

    const [state, setState] = useContext(StepContext);

    const setActiveStep = (step) => {
        setState(state => ({ ...state, step: step }))
    };

    const activeStep = state.step;
    const steps = props.stageNames;

    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;

        setActiveStep(newActiveStep)
    };

    const handleBack = () => {
        setActiveStep(state.step - 1)
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box className="stepper-container">
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
    );
}