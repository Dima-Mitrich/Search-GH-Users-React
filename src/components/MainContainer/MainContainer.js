import React from 'react';
import Header from '../Header/Header';
import EmptyScreen from '../EmptyScreen/EptyScreen';
import Profile from '../Profile/Profile';
import UserRepos from '../UserRepos/UserRepos';
import { Preloader } from '../Preloader/Preloader';

import './MainContainer.css'

class MainContainer extends React.Component {

    state = {
        searchHasStarted: false,
        userInfo: null,
        userRepo: null,
        status: 'default',
        currentPage: null,
        isFetching: false,
        isFetchingRepos: false,
    }

    getUser = (userName) => {
        return async function () {
            try {
                let responseUserParams = await fetch(`https://api.github.com/users/${userName}`);

                if (responseUserParams.status === 404) throw new Error('user not found');

                let userParams = await responseUserParams.json();

                let userInfoCollection = {
                    photo: userParams.avatar_url,
                    name: userParams.name,
                    followers: userParams.followers,
                    following: userParams.following,
                    htmlUrl: userParams.html_url,
                    userName: userParams.login,
                    numberOfUserRepos: userParams.public_repos,
                }

                return userInfoCollection;
            } catch (error) {
                return error;
            }
        }
    }

    getRepositories = (userName, i) => {
        return async function () {
            try {
                let responseUserRepo = await fetch(`https://api.github.com/users/${userName}/repos?per_page=4&page=${i}&sort=updated`);

                if (!responseUserRepo.ok) throw responseUserRepo;

                let userRepo = await responseUserRepo.json();
                return userRepo;
            } catch (err) {
                return err;
            }
        }
    }

    startSearching = (userName) => {

        (async () => {
            this.setState({ isFetching: true, searchHasStarted: true });
            try {
                let userInfoCollection = await this.getUser(userName).bind(this)();

                if (userInfoCollection instanceof Error) {

                    this.setState({
                        searchHasStarted: false,
                        userInfo: null,
                        userRepo: null,
                        status: 'user not found',
                        currentPage: null,
                        isFetching: false,
                    })
                    throw userInfoCollection;
                }

                let userRepo = await this.getRepositories(userName, 1).bind(this)();

                this.setState({ profileIsReady: true, userInfo: userInfoCollection, userRepo: userRepo, currentPage: 1, isFetching: false });
            } catch (err) {
                err.message === 'user not found' ? console.log(err) : alert(err);
            }
        })();
    }

    updateRepos = (i) => {
        (async () => {
            try {
                this.setState({ isFetchingRepos: true })
                let currUser = this.state.userInfo.userName
                let newPageRepos = await this.getRepositories(currUser, i).bind(this)();
                this.setState({ userRepo: newPageRepos, currentPage: i, isFetchingRepos: false })
            } catch (err) {
                alert(err);
            }
        })();
    }

    render() {
        return (
            <div className='mainContainer'>
                <Header cbStartSearching={this.startSearching} id='pageHeader' />
                {
                    this.state.searchHasStarted ?
                        this.state.isFetching ?
                            <div className='empty-screen-container'>
                                <Preloader type='Oval' width={80} height={80} color='rgba(0, 100, 235, 1)' />
                            </div>
                            :
                            <div className='userContainer'>
                                <Profile userInfo={this.state.userInfo} id='pageProfile' />
                                <UserRepos userRepos={this.state.userRepo}
                                    numberRepos={this.state.userInfo.numberOfUserRepos}
                                    cbUpdateRepos={this.updateRepos}
                                    currentPage={this.state.currentPage}
                                    isFetching={this.state.isFetchingRepos}
                                    id='pageRepos' />
                            </div>
                        :
                        <div className='empty-screen-container'>
                            <EmptyScreen status={this.state.status} id='pageEmptyScreen' />
                        </div>
                }
            </div>
        )
    }
}

export default MainContainer;