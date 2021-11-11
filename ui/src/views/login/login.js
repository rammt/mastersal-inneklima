import React from 'react';
import VippsService from '../../services/vippsService';

const Login = () => {
    const login = () => {
        console.log("We loggin' in now bois!");
        const redirectURIPromise = VippsService.getRedirectURI();
        redirectURIPromise.then((uri) => {
            console.log('RedirectURI:', uri.data);
            window.location.replace(uri.data);
        });
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
