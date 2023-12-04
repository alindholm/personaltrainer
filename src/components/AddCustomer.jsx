import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {
    //State
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false); //is dialog open?
    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') //estää dialogin sulkeutumisen kun klikataan taustaa
            setOpen(false);
    }
    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }
    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}>New Customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Firstname'
                        name='firstname'
                        value={customer.firstname}
                        onChange={handleInputChanged}></TextField>
                    <TextField
                        label='Lastname'
                        name='lastname'
                        value={customer.lastname}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='Street Address'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='Postcode'
                        name='postcode'
                        value={customer.postcode}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='City'
                        name='city'
                        value={customer.city}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='Email'
                        name='email'
                        value={customer.email}
                        onChange={handleInputChanged}
                    ></TextField>

                    <TextField
                        label='Phone'
                        name='phone'
                        value={customer.phone}
                        onChange={handleInputChanged}
                    ></TextField>

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