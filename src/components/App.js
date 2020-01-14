import React, {Component} from 'react';
import Table from "./Table";
import Loader from "./loader/Loader";
import InfoCard from "./InfoCard";
import ReactPaginate from 'react-paginate';
import _ from 'lodash';


class App extends Component {

    state = {
        isLoading: true,
        data: [],
        sort: 'asc',
        sortField: 'id',
        selectedUser: {},
        currentPage: 1
    }

    async componentDidMount() {
        const response = await fetch('https://api.github.com/repositories');
        const data = await response.json();
        const orderedData = _.orderBy(data, this.state.sortField, this.state.sort);
        const currentUser = orderedData[0];
        this.setState({
            isLoading: false,
            data: orderedData,
            selectedUser: currentUser
        });
    }

    handlePageClick (page) {

    }

    onSort = sortField => {
        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(cloneData, sortField, sort);
        const selectedUser = data[0];
        this.setState({data, sort, selectedUser, sortField})
    }

    onRowSelect = item => {
        const selectedItem = _.find(this.state.data, (el) => el.id === item.id);
        this.setState({
            selectedUser: selectedItem
        })
    }

    render() {

        const pageSize = 10;
        const currentPage = this.state.currentPage;
        const displayedData = _.chunk(this.state.data, pageSize)[currentPage];


        return (
            <div className="container-fluid">
                {
                    this.state.isLoading
                        ? <Loader/>
                        : <div className="row">
                            <div className="col-8">
                                <Table
                                    data={displayedData}
                                    sort={this.state.sort}
                                    sortField={this.state.sortField}
                                    onSort={this.onSort}
                                    onRowSelect={this.onRowSelect}
                                />
                                {
                                    this.state.data.length > pageSize
                                        ? (<ReactPaginate
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={this.state.data / pageSize}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            nextLinkClassName="page-link"
                                            previousLinkClassName="page-link"
                                        />)
                                        : null
                                }
                            </div>
                            <InfoCard
                                user={this.state.selectedUser}
                            />
                        </div>
                }
            </div>
        )
    }
}

export default App;