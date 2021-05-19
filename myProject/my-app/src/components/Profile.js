import React from 'react';

import followers from './images/shared.png';
import following from './images/provate.png';

import './Profile.css'

class Profile extends React.PureComponent {

    render() {
        return (
            <div id='userProfile' className='user-profile'>
                <img src={this.props.userInfo.photo} alt='user avatar' id='userAvatar' />
                <span id='span-name'>{this.props.userInfo.name}</span>
                <a href={this.props.userInfo.htmlUrl}
                    id='a-userName'
                    target='_blank'
                    rel="noopener noreferrer">{this.props.userInfo.userName}</a>
                <div id='followersContainer'>
                    <img src={followers} alt='followers logo' id='followersLogo' />
                    <span>{
                        this.props.userInfo.followers > 10000 ? (this.props.userInfo.followers / 1000).toFixed(1) + 'k ' :
                            this.props.userInfo.followers + ' '
                    }
                        followers</span>
                    <img src={following} alt='following logo' id='followingLogo' />
                    <span>{
                        this.props.userInfo.following > 10000 ? (this.props.userInfo.following / 1000).toFixed(1) + 'k ' :
                            this.props.userInfo.following + ' '
                    }
                        following</span>
                </div>
            </div>
        )
    }
}

export default Profile;