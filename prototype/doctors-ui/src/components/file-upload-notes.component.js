import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';


export default function FileUploadUserNotes(props) {

    const [context, setContext] = useContext(StepContext);

    const patientNotes = context.patientNotes

    let setPatientNotesOnKeyToValue = (key, value) => {
        patientNotes[key] = value
        setContext(context => ({
            ...context,
            patientNotes: patientNotes
        }))
    }

    return (
        <div>
            <Stack direction="column" alignItems="left" justifyContent="space-between" spacing={1}>
                {/* weak attempt to align notes with upload box */}
                <h1 />

                {/* appointment date */}
                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Appointment Date"
                        value={context.patientNotes.appointmentDate}
                        onChange={(value) => { setPatientNotesOnKeyToValue("appointmentDate", value) }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd/MM/yyyy"
                    />
                </LocalizationProvider>

                {/* patient name */}
                <form noValidate autoComplete='off'>
                    <TextField
                        className="upload-notes"
                        label="Patient First Name"
                        varient="outlined"
                        value={context.patientNotes.firstName}
                        onChange={(event) => { setPatientNotesOnKeyToValue("firstName", event.target.value) }}
                    />

                    <TextField
                        className="upload-notes"
                        label="Patient Last Name"
                        varient="outlined"
                        value={context.patientNotes.lastName}
                        onChange={(event) => { setPatientNotesOnKeyToValue("lastName", event.target.value) }}
                    />
                </form>

                {/* patient dob */}
                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date of Birth"
                        inputFormat="dd/MM/yyyy"
                        value={context.patientNotes.dateOfBirth}
                        onChange={(value) => { setPatientNotesOnKeyToValue("dateOfBirth", value) }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                {/* physician name */}
                <form noValidate autoComplete='off'>
                    <TextField
                        className="upload-notes"
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
                        className="upload-notes"
                        label="Add Medical Notes"
                        varient="outlined"
                        multiline
                        rows={10}
                        fullWidth
                        value={context.patientNotes.medicalNotes}
                        onChange={(event) => { setPatientNotesOnKeyToValue("medicalNotes", event.target.value) }}
                    />
                </form>
            </Stack>
        </div>

    );
}