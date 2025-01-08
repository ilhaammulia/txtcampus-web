export const load = ({ url }) => {
    return {
        username: url.pathname.replace('/', '')
    };
};