import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCustomer(props) {
    //State
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false); //is dialog open?
    //functions
    const handleOpen= () => {
        console.log(props.customer)
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, 
                    postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
        setOpen(true);
    }
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') //estää dialogin sulkeutumisen kun klikataan taustaa
            setOpen(false);
    }
    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }
    const handleSave = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        setOpen(false);
    }


    return (
        <div>
            <Button
                onClick={handleOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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
        </div>
    )
}