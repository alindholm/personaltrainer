import { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customers() {
    //states
    const [customers, setCustomers] = useState([]);

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
    ]

    const getCustomers = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                console.dir("responseData" + responseData);
                setCustomers(responseData.content);
            })
    }

    return(
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact 
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}>
        </AgGridReact>
        </div>
    )
}