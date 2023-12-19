import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-2 border border-solid border-dark">
                <h2>Hi, User</h2>
                <div className='p-1 text-end'>
                <Link to="/bright-ideas" className="me-3">Bright Ideas</Link>
                <Link to="/profile" className="me-3">Profile</Link>
                <Link to="/logout">Logout</Link>
                </div>
            </div>
            <div>
            <h2 className='text-center m-2'>Bright Ideas</h2>
            <h5 className='my-auto mx-auto col-8'>
                This app allows you to post an image with a 
                short description that acts as a story prompt. 
                Your image and description can encourage people 
                to reply with their own story ideas, or you can 
                start a story and ask people to continue the narrative.
            </h5>
            </div>

        </div>
    );
};

export default HomePage;