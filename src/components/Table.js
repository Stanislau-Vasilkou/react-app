import React from 'react';

export default (props) => {
    return (

        <table className="table">
            <thead className="thead-lite">
            <tr>
                <th scope="col" onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}
                </th>
                <th scope="col" onClick={props.onSort.bind(null, 'owner.login')}>
                    LOGIN {props.sortField === 'owner.login' ? <small>{props.sort}</small> : null}
                </th>
                <th scope="col" onClick={props.onSort.bind(null, 'name')}>
                    FULL NAME {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th scope="col" onClick={props.onSort.bind(null, 'url')}>
                    URL {props.sortField === 'url' ? <small>{props.sort}</small> : null}
                </th>
            </tr>
            </thead>
            <tbody>
            {props.data.map(item => (
                <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.owner.login}</td>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}