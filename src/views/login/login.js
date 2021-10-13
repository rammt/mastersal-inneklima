import React from 'react';
import VippsService from '../../services/vippsService';

const Login = () => {
    const login = () => {
        console.log("We loggin' in now bois!");
        const redirectURI = VippsService.getRedirectURI();
        console.log('RedirectURI:', redirectURI);
        window.location.replace(redirectURI);
    };

    return (
        <div className="w-screen h-64 flex items-center justify-center">
            <button
                className="rounded p-2 border-2 border-rounded"
                onClick={login}>
                Login!
            </button>
        </div>
    );
};

export default Login;
