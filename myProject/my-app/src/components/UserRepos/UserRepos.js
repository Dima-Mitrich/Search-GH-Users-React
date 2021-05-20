import React, { Fragment } from 'react';
import EmptyScreen from '../EmptyScreen/EptyScreen';
import ReactPaginate from 'react-paginate';
import Repository from '../Repository/Repository';
import { Preloader } from '../Preloader/Preloader';

import './UserRepos.css'

class UserRepos extends React.Component {

    state = {
        isFetching: false,
    }

    onPageChange = (arg) => {
        let currPage = arg.selected + 1;
        if (this.props.currentPage !== currPage) this.props.cbUpdateRepos(currPage);
    }

    render() {

        let repArr = this.props.userRepos.map((elem, index) =>
            <Repository reposUrl={elem.html_url}
                name={elem.name}
                description={elem.description}
                key={index} />
        )

        let bottomReposLine = (this.props.currentPage - 1) * 4 + 1;
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
                        onPageChange={this.onPageChange}
                        forcePage={this.props.currentPage - 1}
                        />
                </div>
            </Fragment>
        )

        return (
            <div className='user-repos'>
                {   this.props.isFetching ?
                    <Preloader type='Oval' width={80} height={80} color='rgba(0, 100, 235, 1)' /> :
                    this.props.userRepos.length ?
                        userRepositories :
                        <EmptyScreen status='no repos' />
                }
            </div>
        )
    }
}

export default UserRepos;