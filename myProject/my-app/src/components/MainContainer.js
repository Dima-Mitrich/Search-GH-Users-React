import React from 'react';
import Header from './Header';
import EmptyScreen from './EptyScreen';
import Profile from './Profile';
import UserRepos from './UserRepos';

import './MainContainer.css'

class MainContainer extends React.Component {

    state = {
        profileIsReady: false,
        userInfo: null,
        userRepo: null,
        status: 'default',
        currentPage: null,
    }

    getUser = (userName) => {
        return async function () {
            try {
                let responseUserParams = await fetch(`https://api.github.com/users/${userName}`);

                if (responseUserParams.status === 404) {
                    this.setState({
                        profileIsReady: false,
                        userInfo: null,
                        userRepo: null,
                        status: 'user not found',
                        currentPage: null,
                    })
                    throw new Error('user not found');
                }

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
                console.log(error);
            }
        }
    }

    getRepositories = (userName, i) => {
        return async function () {
            let responseUserRepo = await fetch(`https://api.github.com/users/${userName}/repos?per_page=4&page=${i}&sort=updated`);
            let userRepo = await responseUserRepo.json();

            return userRepo;
        }
    }

    startSearching = (userName) => {
        (async function () {
            let userInfoCollection = await this.getUser(userName).bind(this)();
            let userRepo = await this.getRepositories(userName, 1).bind(this)();

            this.setState({ profileIsReady: true, userInfo: userInfoCollection, userRepo: userRepo, currentPage: 1 });
        }).bind(this)()
    }

    updateRepos = (i) => {
        (async function () {
            let currUser = this.state.userInfo.userName
            let newPageRepos = await this.getRepositories(currUser, i).bind(this)();
            this.setState({ userRepo: newPageRepos, currentPage: i })
        }).bind(this)()
    }

    render() {
        return (
            <div className='mainContainer'>
                <Header cbStartSearching={this.startSearching} id='pageHeader' />
                {
                    (this.state.profileIsReady) ?
                        <div className='userContainer'>
                            <Profile userInfo={this.state.userInfo} id='pageProfile' />
                            <UserRepos userRepos={this.state.userRepo}
                                numberRepos={this.state.userInfo.numberOfUserRepos}
                                cbUpdateRepos={this.updateRepos}
                                currentPage={this.state.currentPage}
                                id='pageRepos' />
                        </div> :
                        <EmptyScreen status={this.state.status} id='pageEmptyScreen' />
                }
            </div>
        )
    }
}

export default MainContainer;