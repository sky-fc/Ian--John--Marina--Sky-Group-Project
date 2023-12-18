import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../components/HomePage';

const Main = (props) => {
    
    return (
        <div>
            <HomePage/>
        </div>
    )
}
export default Main;