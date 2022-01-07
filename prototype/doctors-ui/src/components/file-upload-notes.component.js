import React, { useState, useContext } from "react";
import { StepContext } from "../context/StepContext";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function FileUploadUserNotes(props) {

    const [context, setContext] = useContext(StepContext);

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [physician_name, setPhysicianName] = useState("");
    const [medical_notes, setMedicalNotes] = useState("");

    const [value, setValue] = useState(null);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Appointment Date"
                    value={value}
                    onChange={(newValue) => { setValue(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {/* patient name */}
            <form noValidate autoComplete='off'>
                <TextField
                    className="upload-notes"
                    label="First Name"
                    varient="outlined"
                    onChange={(newFirstName) => { setFirstName(newFirstName.target.value) }}
                />

                <TextField
                    className="upload-notes"
                    label="Last Name"
                    varient="outlined"
                    onChange={(newLastName) => { setLastName(newLastName.target.value) }}
                />
            </form>

            {/* patient dob */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Appointment Date"
                    value={value}
                    onChange={(newValue) => { setValue(newValue) }}
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
                    onChange={(newPhysicianName) => { setPhysicianName(newPhysicianName.target.value) }}
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
                    onChange={(newMedicalNotes) => { setMedicalNotes(newMedicalNotes.target.value) }}
                />
            </form>
        </div>

    );
}