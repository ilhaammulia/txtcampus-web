export const load = ({ url }) => {
    return {
        postId: url.pathname.replace('/', '').split('/')[1]
    };
};