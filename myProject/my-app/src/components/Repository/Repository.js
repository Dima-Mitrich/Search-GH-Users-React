import React from 'react';
import './Repository.css';

class Repository extends React.Component {
    render() {
        return (
            <div className='repository-container'>
                <a href={this.props.reposUrl} target='_blank' rel = "noopener noreferrer">{this.props.name}</a>
                <span>{this.props.description}</span>
            </div>
        )
    }
}

export default Repository;