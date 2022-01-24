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
    "osteophyte": "0 - None",
    "jointSpace": "0 - Normal",
    "sclerosis": "0 - None",
    "deformation": "0 - None",
    "KL": 0
}

const StepContextProvider = (props) => {
    const [state, setState] = useState({
        step: 0,
        openModal: true,
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