import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './Hooks/UserContext';
import Search from './Hooks/Search';
import ChangeUser from './Hooks/ChangeUser';
import BlogContext from './Hooks/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider>
            <Search>
                <ChangeUser>
                    <BlogContext>
                        <App /> 
                    </BlogContext>
                </ChangeUser>
            </Search>
        </UserProvider> 
    </BrowserRouter>
);


