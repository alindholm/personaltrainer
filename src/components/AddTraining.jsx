import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, InputLabel, Select, FormControl  } from "@mui/material";
import { useState, useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
export default function AddTraining(props) {
    //State
    const [training, setTraining] = useState({ date: null, duration: '', activity: '', customer: '' });
    const [customerList, setCustomerList] = useState([]);
    const [open, setOpen] = useState(false); //is dialog open?
    const rest_url = 'https://traineeapp.azurewebsites.net/api/customers';
    useEffect(() => getCustomerlist(), [])
    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') //estää dialogin sulkeutumisen kun klikataan taustaa
            setOpen(false);
    }
    const handleDateChange = (date) => {
        setTraining({ ...training, date });
    }
    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }
    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }
    const getCustomerlist = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                console.dir("responseData" + responseData);
                setCustomerList(responseData.content);
            })
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}>New Training</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Basic example"
                            value={training.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        label='Duration'
                        name='duration'
                        value={training.duration}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='Activity'
                        name='activity'
                        value={training.activity}
                        onChange={handleInputChanged}
                    ></TextField>
                    <FormControl>
                        <InputLabel id="customer-select-label">Select Customer</InputLabel>
                        <Select labelId="customer-select-label"
                        id="customer-select"
                        value={training.customer}
                        onChange={handleInputChanged}
                        style={{ width: '200px' }}>
                            {customerList.map((customer) => (
                                <MenuItem key={customer.firstname + customer.lastname} value={customer}>
                                    {`${customer.firstname} ${customer.lastname}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}