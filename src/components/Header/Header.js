import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {

    static propTypes = {
        cbStartSearching: PropTypes.func.isRequired,
    }

    state = {
        userName: '',
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    onChangeUserName = (event) => {
        let currVal = event.target.value;
        this.setState({ userName: currVal });
    }

    handleKeyPress = (event) => {
        if (event.keyCode === 13 && this.state.userName) {
            this.props.cbStartSearching(this.state.userName);
        }
    }

    render() {
        return (
            <header className='headerContainer'>
                <img src={logo} alt='GitHubLogo' />
                <input type='text'
                    placeholder='Enter GitHub username'
                    value={this.state.userName}
                    onChange={this.onChangeUserName} />
            </header>
        )
    }
}

export default Header;