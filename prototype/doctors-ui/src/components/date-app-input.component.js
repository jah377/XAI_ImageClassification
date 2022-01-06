import React, { useState, useContext } from "react";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// yarn add date-fns
// yarn add @mui/lab

// TextField: https://www.youtube.com/watch?v=sTdt2cJS2dg
// DatePicker: https://mui.com/components/date-picker/
export default function AppointmentDateInput() {

    const [value, setValue] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Enter Appointment Date"
                value={value}
                onChange={(newValue) => { setValue(newValue) }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}