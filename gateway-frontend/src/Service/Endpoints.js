
const endpoints = {
    url:{
        baseurl: process.env.REACT_APP_BASE_URL,
    },
    gateway: {
        list: 'gateway/',
        add: 'gateway/add',
        update: 'gateway/update',
        delete: 'gateway/delete',
    },
    device: {
        list: 'device/',
        add: 'device/add',
        update: 'device/update',
        delete: 'device/delete',
    },
};

export default endpoints;
