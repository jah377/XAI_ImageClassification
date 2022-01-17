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
    "notes": "",
    "analysis_notes": "",
    "osteophyte": 0,
    "jointSpace": 0,
    "sclerosis": 0,
    "deformation": 0,
    "KL": 0
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