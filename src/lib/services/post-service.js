import api from "$lib/api.js";

export const createPost = async (content, isAnonym, replyTo, isOfficial) => {
    try {
        const response = await api.post("/api/posts", {
            content: content,
            is_anonym: isAnonym,
            is_official: isOfficial,
            reply_to: replyTo,
        });
        return response.data;
    } catch (err) {
        console.debug("createPost", err);
        return false;
    }
}

export const getPosts = async (page, perPage) => {
    try {
        const response = await api.get(`/api/posts`, {
            params: {
                page: page,
                per_page: perPage,
            }
        });
        const data = response.data.data;
        return data.posts || []
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const getPostsByUser = async (username, page, perPage) => {
    try {
        const response = await api.get(`/api/posts`, {
            params: {
                username: username,
                page: page,
                per_page: perPage,
            }
        });
        const data = response.data.data;
        return data.posts || []
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const getPostsById = async (uuid) => {
    try {
        const response = await api.get(`/api/posts/${uuid}`);
        return response.data.data || {};
    } catch (error) {
        console.error('Error fetching data:', error);
        return {};
    }
}

export const getPostReplies = async (uuid, page, perPage) => {
    try {
        const response = await api.get(`/api/posts/${uuid}/replies`, {
            params: {
                page: page,
                per_page: perPage,
            }
        });
        const data = response.data.data;
        return data.posts || []
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const getBookmarks = async (username, page, perPage) => {
    try {
        const response = await api.get(`/api/posts/${username}/bookmarks`, {
            params: {
                page: page,
                per_page: perPage,
            }
        });
        const data = response.data.data;
        return data.posts || []
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const postVote = async (uuid, vote) => {
    try {
        const response = await api.post(`/api/posts/${uuid}/votes`, {
            vote
        });
        return response.data.success;
    } catch (err) {
        console.debug("error vote", err)
        return false;
    }
}

export const bookmarkPost = async (uuid) => {
    try {
        const response = await api.post(`/api/posts/${uuid}/bookmarks`,);
        return response.data.success;
    } catch (err) {
        console.debug("error bookmark", err)
        return false;
    }
}