import React, { Fragment } from 'react';
import EmptyScreen from './EptyScreen';
import ReactPaginate from 'react-paginate';
import Repository from './Repository';

import './UserRepos.css'

class UserRepos extends React.Component {

    try = (arg) => {
        let currPage = arg.selected + 1;
        this.props.cbUpdateRepos(currPage);
    }

    render() {

        let repArr = this.props.userRepos.map((elem, index) =>
            <Repository reposUrl={elem.html_url}
                name={elem.name}
                description={elem.description}
                key={index} />
        )

        let bottomReposLine = (this.props.currentPage - 1) * this.props.userRepos.length + 1;
        let topReposLine = bottomReposLine + this.props.userRepos.length - 1;

        let userRepositories = (
            <Fragment>
                <span className='repositories-title'>Repositories ({this.props.numberRepos})</span>
                {repArr}
                <div className='paginate-container'>
                    <span className='paginate-descriptor'>
                        {bottomReposLine} - {topReposLine} of {this.props.numberRepos} items
                    </span>
                    <ReactPaginate pageCount={this.props.numberRepos / 4}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={0}
                        previousLabel='<'
                        nextLabel='>'
                        breakClassName='break-li'
                        pageClassName='page-li'
                        nextClassName='next-li'
                        previousClassName='prev-li'
                        activeClassName='active-li'
                        onPageChange={this.try} />
                </div>
            </Fragment>
        )

        return (
            <div className='user-repos'>
                {
                    this.props.userRepos.length ?
                        userRepositories :
                        <EmptyScreen status='no repos' />
                }
            </div>
        )
    }
}

export default UserRepos;