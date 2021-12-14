const userToken = JSON.parse(window.localStorage.getItem("user")).token;
const getRequest = {
    method: "GET",
    headers: {
        "Authorisation": userToken
    }
};

async function refreshMembersTable() {
    try {
        const response = await fetch("/api/users/all", getRequest);

        if (!response.ok)
            throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
        const users = await response.json();
        const tableTbody = document.getElementById("membersGestionTbody");
        tableTbody.innerHTML = "";
        users.forEach((user) => {
            if (user.is_active)
                var memberStatus = "Deactivate";
            else
                var memberStatus = "Activate";
            if (user.is_admin)
                var memberType = "Member";
            else
                var memberType = "Admin";

            tableTbody.innerHTML += `
                <tr>
                    <td>${user.id_user}</td>
                    <td>${user.forename}</td>   
                    <td>${user.lastname}</td>    
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.image}</td>
                    <td>${user.is_active}</td>
                    <td>${user.is_admin}</td>
                    <td>${user.biography}</td>
                    <td>${user.date_creation}</td>
                    <td>
                        <form id="membersGestionForm">
                            <input id="id_user" type="hidden" value="${user.id_user}">
                            <input id="memberStatus" type="submit" value="${memberStatus}">
                            <input id="memberType" type="submit" value="${memberType}">
                        </form>
                    </td>
                </tr>
            `;
        });
    } catch (e) {
        console.error(e)
    }
}

async function refreshPostsTable() {
    const tableTbody = document.getElementById("postsGestionTbody");
    const response = await fetch("/api/posts/", getRequest);
    console.log(response)
    if (!response.ok)
        throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
    const posts = await response.json();
    tableTbody.innerHTML = "";
    posts.forEach((post) => {
        if (post.is_removed)
            var postStatus = "Cancel remove";
        else
            var postStatus = "Remove";

        tableTbody.innerHTML += `
             <tr>
                <td>${post.id_post}</td>
                <td>${post.id_user}</td>   
                <td>${post.image}</td>    
                <td>${post.message}</td>
                <td>${post.parent_post}</td>
                <td>${post.is_removed}</td>
                <td>${post.date_creation}</td>
                <td>${post.number_of_likes}</td>
                <td>
                    <input id="id_post" type="hidden" value="${post.id_post}">
                    <input type="submit" value="${postStatus}">
                </td>
            </tr>
        `;
    });
}

export default {refreshMembersTable, refreshPostsTable};