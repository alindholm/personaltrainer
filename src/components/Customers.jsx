import { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import { Button, Snackbar } from "@mui/material";
import { CSVLink } from "react-csv";
import EditCustomer from "./EditCustomer";


export default function Customers() {
    //states
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

    const rest_url = 'https://traineeapp.azurewebsites.net/api/customers';
    useEffect(() => getCustomers(), [])

    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {cellRenderer: params=>
            <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                Delete
            </Button>,
            width:120
        },
        {
            cellRenderer: row => <EditCustomer 
            customer={row.data}
            updateCustomer={updateCustomer}/>,
            width:120
        }
    ]

    const getCustomers = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                console.dir("responseData" + responseData);
                setCustomers(responseData.content);
            })
    }
    const addCustomer=(customer)=> {
        //REST API CALL
        fetch(rest_url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer) 
        })
        .then(response=> {
            if(response.ok)
            getCustomers();
            else
                alert('something went wrong')
        })
        .catch(err=> unstable_composeClasses.error(err))
    }
        const deleteCustomer= (params) => {

            const customerLink = params.data.links.find(link => link.rel === 'customer');

            if (customerLink) {
              const customerUrl = customerLink.href;

              const userConfirmed = window.confirm('Are you sure?');

          if (userConfirmed) {
            fetch(customerUrl, {method:'DELETE'})
            .then(response=>
                {if (response.ok){
                    setMsg('Customer has been deleted succesfully');
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong');
                }
                })
                .catch(error => console.error(error));
            }
            else {
                setMsg('Deleting has been cancelled');
                    setOpen(true);
            }
          }
            
        }
        
          const updateCustomer = (customer, rest_url) => {
            fetch(rest_url, {
                method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
         })
         .then(response=>
            getCustomers())
         .catch(err => console.error(err))
            
          };
          const exportData = {
            headers: columns.map((column) => column.field),
            data: customers.map((customer) =>
              columns.map((column) => {
                if (column.field === 'cellRenderer') {
                  return ''; // Exclude buttons
                }
                return customer[column.field];
              })
            ),
          };

    return(
        <>
        <AddCustomer addCustomer={addCustomer}/>
        <Button
        size="small" 
        color="error"
      >
        <CSVLink {...exportData} filename={'customers.csv'}>
          Export to CSV
        </CSVLink>
      </Button>
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact 
            rowData={customers}
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