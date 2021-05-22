import React from 'react';
import './Repository.css';

export const Repository = (props) => {
    return (
        <div className='repository-container'>
            <a href={props.reposUrl} target='_blank' rel="noopener noreferrer">{props.name}</a>
            <span>{props.description}</span>
        </div>
    )
}

/*class Repository extends React.Component {
    render() {
        return (
            <div className='repository-container'>
                <a href={this.props.reposUrl} target='_blank' rel="noopener noreferrer">{this.props.name}</a>
                <span>{this.props.description}</span>
            </div>
        )
    }
}*/

//export default Repository;