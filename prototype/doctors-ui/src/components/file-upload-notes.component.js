import React, { useState, useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";

import AppointmentDateInput from "./date-app-input.component";
import PatientDateInput from "./date-patient-input.component";

export default function FileUploadUserNotes(props) {

    const [context] = useContext(StepContext);

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [physician_name, setPhysicianName] = useState("");
    const [medical_notes, setMedicalNotes] = useState("");

    return (
        <div>
            <AppointmentDateInput />

            {/* patient name */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="upload-notes"
                    label="Enter First Name"
                    varient="outlined"
                    onChange={(newFirstName) => { setFirstName(newFirstName.target.value) }}
                />

                <TextField
                    className="upload-notes"
                    label="Enter Last Name"
                    varient="outlined"
                    onChange={(newLastName) => { setLastName(newLastName.target.value) }}
                />
            </form>

            {/* patient dob */}
            <PatientDateInput />

            {/* physician name */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="preview-notes"
                    label="Enter Physician Name"
                    varient="outlined"
                    fullWidth
                    onChange={(newPhysicianName) => { setPhysicianName(newPhysicianName.target.value) }}
                />
            </form>

            {/* medical notes */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="preview-notes"
                    label="Enter Medical Notes"
                    varient="outlined"
                    multiline
                    rows={10}
                    fullWidth
                    onChange={(newMedicalNotes) => { setMedicalNotes(newMedicalNotes.target.value) }}
                />
            </form>
        </div>

    );
}