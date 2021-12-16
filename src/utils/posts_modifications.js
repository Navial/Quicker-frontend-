import Tables from "./tables";
import loadUser from "./load_user";

let userToken;

const putRequest = {
    "method": "PUT",
    headers: {
        Authorization: userToken
    }
};

const deleteRequest = {
    method: "DELETE",
    headers: {
        Authorization: userToken
    }
};

async function activatePost(id_post) {
    userToken = loadUser().token;
    try {
        const response = await fetch(`/api/posts/activate/${id_post}`, putRequest);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

async function removePost(id_post){
    userToken = loadUser().token;
    try {
        const response = await fetch(`/api/posts/${id_post}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        if(window.location.pathname === "/admin_page")
            await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

export default {activatePost, removePost};