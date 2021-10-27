import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import VippsService from '../../services/vippsService';

const VippsRedirect = () => {
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const state = new URLSearchParams(search).get('state');

    useEffect(() => {
        console.log('Code:', code);
        console.log('State:', state);
        const token = VippsService.getToken3(code);
    });

    return <></>;
};

export default VippsRedirect;
