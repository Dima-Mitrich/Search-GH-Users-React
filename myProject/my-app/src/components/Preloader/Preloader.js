import React from 'react';
import Loader from "react-loader-spinner";

import './Preloader.css'

export const Preloader = (props) => {
    return (
        <div className='preloader'>
            <Loader {...props}/>
        </div>
    )
}