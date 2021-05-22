import React from 'react';
import PropTypes from 'prop-types';
import searchLogo from '../../assets/images/search.png'
import noReposLogo from '../../assets/images/no-repos-logo.png';
import noUserLogo from '../../assets/images/no-user-logo.png';

import './EmptyScreen.css'

class EmptyScreen extends React.Component {

    static propTypes = {
        status: PropTypes.string.isRequired,
    }

    render() {
        let logo, describe;
        switch (this.props.status) {
            case 'user not found':
                logo = noUserLogo;
                describe = 'User not found';
                break;
            case 'no repos':
                logo = noReposLogo;
                describe = 'Repository list is empty';
                break;
            default:
                logo = searchLogo;
                describe = 'Start with searching a GitHub user'
        }
        return (
            <div className='emptyScreen'>
                <img src={logo} alt='search logo' />
                <span>{describe}</span>
            </div>
        )
    }
}

export default EmptyScreen;