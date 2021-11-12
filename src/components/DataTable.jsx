import React from 'react'
import ReactDataTable from 'react-data-table-component';

const DataTable = ({ data = [], loading = false }) => {
    const columns = [
        {
            name: 'Outbound Airline',
            selector: row => row.outboundAirline,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Flight',
            selector: row => row.outboundFlight,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Origin',
            selector: row => row.outboundOrigin,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Destination',
            selector: row => row.outboundDestination,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Date',
            selector: row => row.outboundDate,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Cabin',
            selector: row => row.outboundCabin,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Outbound Equipment',
            selector: row => row.outboundEquipment,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Airline',
            selector: row => row.returnAirline,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Flight',
            selector: row => row.returnFlight,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Origin',
            selector: row => row.returnOrigin,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Destination',
            selector: row => row.returnDestination,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Date',
            selector: row => row.returnDate,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Cabin',
            selector: row => row.returnCabin,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Return Equipment',
            selector: row => row.returnEquipment,
            sortable: true,
            minWidth: "150px"
        },
        {
            name: 'Offer Price',
            selector: row => row.offerPrice,
            sortable: true,
            minWidth: "150px"
        },
    ];

    return (
        <>
            <ReactDataTable
                columns={columns}
                data={data}
                pagination
                pointerOnHover={true}
                responsive={true}
                striped={true}
                paginationRowsPerPageOptions={[10, 50, 100]}
                progressPending={loading}
            />
        </>
    )
}

export default DataTable