import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import VippsService from '../../services/vippsService';

const VippsRedirect = () => {
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const state = new URLSearchParams(search).get('state');

    useEffect(() => {
        const token = VippsService.getToken(code);
        token.then((token) => {
            console.log('token:', token);
        });
    });

    return (
        <div>
            <a href="/">
                <button>Back</button>
            </a>
        </div>
    );
};

export default VippsRedirect;
