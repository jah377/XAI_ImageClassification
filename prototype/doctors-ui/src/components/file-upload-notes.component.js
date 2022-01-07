import React, { useState, useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function FileUploadUserNotes(props) {

    const [context, setContext] = useContext(StepContext);

    const patientNotes = context.patientNotes

    const [value, setValue] = useState(null);

    let setPatientNotesOnKeyToValue = (key, value) => {
        patientNotes[key] = value
        setContext(context => ({
            ...context,
            patientNotes: patientNotes
        }))
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Appointment Date"
                    value={context.patientNotes.appointmentDate}
                    onChange={(event) => { setPatientNotesOnKeyToValue("appointmentDate", event.target.value) }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {/* patient name */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="upload-notes"
                    label="First Name"
                    varient="outlined"
                    value={context.patientNotes.firstName}
                    onChange={(event) => { setPatientNotesOnKeyToValue("firstName", event.target.value)}}
                />

                <TextField
                    className="upload-notes"
                    label="Last Name"
                    varient="outlined"
                    value={context.patientNotes.lastName}
                    onChange={(event) => { setPatientNotesOnKeyToValue("lastName", event.target.value) }}
                />
            </form>

            {/* patient dob */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Appointment Date"
                    value={context.patientNotes.dateOfBirth}
                    onChange={(event) => { setPatientNotesOnKeyToValue("dateOfBirth", event.target.value) }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {/* physician name */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="preview-notes"
                    label="Physician Name"
                    varient="outlined"
                    fullWidth
                    value={context.patientNotes.physicianName}
                    onChange={(event) => { setPatientNotesOnKeyToValue("physicianName", event.target.value) }}
                />
            </form>

            {/* medical notes */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="preview-notes"
                    label="Medical Notes"
                    varient="outlined"
                    multiline
                    rows={10}
                    fullWidth
                    value={context.patientNotes.medicalNotes}
                    onChange={(event) => { setPatientNotesOnKeyToValue("medicalNotes", event.target.value) }}
                />
            </form>
        </div>

    );
}