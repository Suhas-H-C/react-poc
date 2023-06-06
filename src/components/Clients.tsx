import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

type ClientsProps = {
    clientsDataUrl: string,
}

const Clients = (props: ClientsProps) => {
    const [clientsData, setClientsData] = useState<[]>([]);

    useEffect(() => {
        fetch(props.clientsDataUrl)
            .then(result => result.json())
            .then(response => setClientsData(response))
            .catch(err => console.error(err));

    }, [props.clientsDataUrl])

    const dataRows: [] = clientsData;

    const dataColumns: GridColDef[] = [
        { field: 'id', headerName: "Unique Id", sortable: true },
        { field: 'name', headerName: "Name", sortable: true },
        { field: 'username', headerName: "User name", sortable: true },
        { field: 'email', headerName: "Email ", sortable: true },
        { field: 'phone', headerName: "Phone", sortable: false },
        { field: 'website', headerName: "Website", sortable: false },
        // { field: 'address.street', headerName: "Street", sortable: true },
    ]


    return (
        <>
            <DataGrid
                rows={dataRows}
                columns={dataColumns}
                initialState={{
                    pagination: {paginationModel: {page:0, pageSize:5}}
                }}

                pageSizeOptions={[5,10]}
                disableRowSelectionOnClick
            />
        </>
    );
}

export default Clients;