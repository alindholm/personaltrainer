import { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";

export default function Trainings() {
    //states
    const [trainings, setTrainings] = useState([]);

    const rest_url = 'https://traineeapp.azurewebsites.net/gettrainings';
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
        {headerName: 'customer',
        sortable: true,
        filter: true,
        valueFormatter: ({ data }) => {
            const { customer } = data;
            return customer ? `${customer.firstname} ${customer.lastname}` : '';
        },
    },

    ]

    const getTrainings = () => {
        fetch(rest_url)
            .then(response => response.json())
            .then(responseData => {
                console.dir("responseData" + responseData);
                setTrainings(responseData);
            })
    }

    return(
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact 
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}>
        </AgGridReact>
        </div>
    )
}