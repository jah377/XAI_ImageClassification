import { React, createContext, useState } from "react";

const StepContext = createContext([{}, () => ({})]);


const emptyPatientNotes = {
    "appointmentDate": null,
    "firstName": "",
    "lastName": "",
    "dateOfBirth": null,
    "physicianName": "",
    "medicalNotes": "",
}

const emptyXRayNotes = {
    "xRayNotes": ""
}

const StepContextProvider = (props) => {
    const [state, setState] = useState({
        step: 0,
        patientNotes: emptyPatientNotes,
        xRayNotes: emptyXRayNotes
    });
    return (
        <StepContext.Provider value={[state, setState]}>
            {props.children}
        </StepContext.Provider>
    );
};

export { StepContext, StepContextProvider };