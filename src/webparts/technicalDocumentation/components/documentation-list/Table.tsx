import * as React from 'react'
// import { useTable } from 'react-table'
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { Icon } from 'office-ui-fabric-react';
// A great library for fuzzy filtering/sorting items
// import { matchSorter } from 'match-sorter'

// import Service from '../../service/Service'
// import { DocumentModel } from '../../models/DocumentModel'

// Define a default UI for filtering
// const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }: any) => {
//     const count = preFilteredRows.length

//     return (
//         <input
//             value={filterValue || ''}
//             onChange={e => {
//                 setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//             }}
//             placeholder={`Search ${count} records...`}
//         />
//     )
// }

const Table = ({ data }: any) => {

    // const svc = new Service()

    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: 'All Documents',
    //             columns: [
    //                 {
    //                     Header: 'Title',
    //                     accessor: 'Title',
    //                     filter: 'fuzzyText',
    //                     Filter: DefaultColumnFilter,
    //                     canFilter: false
    //                 },
    //                 {
    //                     Header: 'Product',
    //                     accessor: 'Product',
    //                     Filter: DefaultColumnFilter,
    //                     canFilter: false
    //                 },
    //                 {
    //                     Header: 'Document category',
    //                     accessor: 'Document_x0020_Category',
    //                     Filter: DefaultColumnFilter,
    //                     canFilter: false
    //                 },
    //                 {
    //                     Header: 'Language',
    //                     accessor: 'Document_x0020_Language',
    //                     Filter: DefaultColumnFilter,
    //                     canFilter: false
    //                 },

    //             ],
    //         }
    //     ],
    //     []
    // )


    // Use the state and functions returned from useTable to build your UI
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     prepareRow,
    //     rows,
    //     // which has only the rows for the active page

    //     // The rest of these things are super handy, too ;)
    // } = useTable(
    //     {
    //         columns,
    //         data,
    //         //defaultColumn // Be sure to pass the defaultColumn option
    //         // filterTypes,
    //     },
    // )

    let viewFields: IViewField[] = [
        {
            name: "Title",
            displayName: 'Title',
            isResizable: true,
            sorting: true,
            //   minWidth: 180,
            //   maxWidth: 200,
            minWidth: 150,
            render: (item) => {

                const getOnlineEditUrl = (fileRef: any) => {
                    const encodedFileRef = encodeURIComponent(fileRef);
                    if (fileRef.endsWith('.docx') || fileRef.endsWith('.doc')) {
                        return `/sites/Ext-WS-AMTechnicalDocumenation/_layouts/15/WopiFrame.aspx?sourcedoc=${encodedFileRef}&action=edit`;
                    } else if (fileRef.endsWith('.xlsx') || fileRef.endsWith('.xls')) {
                        return `/sites/Ext-WS-AMTechnicalDocumenation/_layouts/15/xlviewer.aspx?id=${encodedFileRef}&action=edit`;
                    } else if (fileRef.endsWith('.pptx') || fileRef.endsWith('.ppt')) {
                        return `/sites/Ext-WS-AMTechnicalDocumenation/_layouts/15/WopiFrame.aspx?sourcedoc=${encodedFileRef}&action=edit`;
                    } else {
                        return fileRef; // Default case, open directly
                    }
                };

                const editUrl = getOnlineEditUrl(item.FileRef);

                return (


                    <div style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip', }}>
                        <a href={editUrl} style={{ textDecoration: "none", color: "#86bd21" }} target="_blank">{item.Title}</a>
                    </div>
                )
            },
        },
        {
            name: "Product",
            displayName: 'Product',
            isResizable: true,
            sorting: true,
            // minWidth: 150,
            // maxWidth: 180,
            minWidth: 150,
            render: (item) => (
                <div style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>
                    {item.Product}
                </div>
            ),
        },
        {
            name: "Document_x0020_Category",
            displayName: 'Document category',
            isResizable: true,
            sorting: true,
            // minWidth: 100,
            // maxWidth: 130,
            minWidth: 150,
            render: (item) => (
                <div style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>
                    {item.Document_x0020_Category}
                </div>
            ),
        },
        //   {
        //     name: "Document_x0020_Language",
        //     displayName: 'Language',
        //     isResizable: true,
        //     sorting: true,
        //     minWidth: 80,
        //     maxWidth: 130,
        //     render: (item) => (
        //         <div style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>
        //           {item.Document_x0020_Language}
        //         </div>
        //       ),
        //   },
        {
            name: "Revision",
            displayName: 'Revision',
            isResizable: true,
            sorting: true,
            // minWidth: 80,
            // maxWidth: 130,
            minWidth: 150,
            render: (item) => (
                <div style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>
                    {item.Revision}
                    <a href={item.FileRef} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" download>
                        <Icon iconName="Download" style={{ fontSize: 15, float: 'right', cursor: 'pointer', color: "#86bd21" }} />
                    </a>
                </div>
            ),
        },
    ];

    // Render the UI for your table
    return (
        <>
            {/* <table {...getTableProps()} className="table table-bordered">
                <thead>
                    {[headerGroups[1]].map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    style={column.Header === 'Options' ? { minWidth: "130px" } : {}}
                                    {...column.getHeaderProps()}>
                                    {column.render('Header') === 'Select' ? '' : column.render('Header')}
                                    <div>{column.canFilter && (column.Header !== 'Options' && column.Header !== 'Select') ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, i: number) => {
                        prepareRow(row)
                        return (
                            <tr className={row.original.specificClass} {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.column.Header === "Options" ?
                                        null
                                        : cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}

            {/* <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Product</th>
                        <th scope="col">Document category</th>
                        <th scope="col">Language</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r: any) => {
                        return (
                            <tr>
                                <td>{r.Title}</td>
                                <td>{r.Product}</td>
                                <td>{r.Document_x0020_Category}</td>
                                <td>{r.Document_x0020_Language}</td>
                            </tr>
                        )
                    })}
              
                </tbody>
            </table> */}

            <ListView
                items={data}
                viewFields={viewFields}
                selectionMode={SelectionMode.none}
                stickyHeader={false}
            />

        </>
    )
}

export default Table