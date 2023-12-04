import { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs"; 
import { Button, Snackbar } from "@mui/material";
import AddTraining from "./AddTraining";


export default function Trainings() {
    //states
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const rest_url = 'https://traineeapp.azurewebsites.net/gettrainings';
    const add_url = 'https://traineeapp.azurewebsites.net/api/trainings';
    useEffect(() => getTrainings(), [])

    const dateFormatter = ({ value }) => {
        if (value) {
            const formattedDate = dayjs(value).format('DD.MM.YYYY HH:mm');
            return formattedDate;
        }
        return '';
    };

    const columns = [
        { field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter},
        { field: 'duration',sortable: true, filter: true },
        { field: 'activity',sortable: true, filter: true },
        {headerName: 'Customer',
        sortable: true,
        filter: true,
        valueFormatter: ({ data }) => {
            const { customer } = data;
            return customer ? `${customer.firstname} ${customer.lastname}` : '';
        },
    },
        {cellRenderer: params=>
            <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                Delete
            </Button>,
            width:120
        }

    ]

    const getTrainings = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                console.dir("responseData" + responseData);
                setTrainings(responseData);
            })
    }
    const addTraining=(training)=> {
        fetch(add_url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training) 
        })
        .then(response=> {
            if(response.ok)
            getTrainings();
            else
                alert('something went wrong')
        })
        .catch(err=> unstable_composeClasses.error(err))
    }
    const deleteTraining = (params) => {
        const trainingId = params.data.id;
        const deleteUrl = `https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`;

        const userConfirmed = window.confirm('Are you sure?');
        if(userConfirmed){
        fetch(deleteUrl, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer has been deleted succesfully');
                    setOpen(true);
                getTrainings();
            } else {
                alert('Something went wrong while deleting the training.');
            }
        })
        .catch(error => {
            console.error('Error deleting training:', error);
            alert('An error occurred while deleting the training.');
        });
    } else {
        setMsg('Deleting has been cancelled');
            setOpen(true);
    }}
    return(
        <>
        <AddTraining addTraining={addTraining}/>
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact 
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}>
        </AgGridReact>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            message={msg}
            onClose={()=> setOpen(false)} />
        </div>
        </>
    )
}