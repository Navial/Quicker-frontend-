import showPostsHtml from "./ShowPostsHtml";


async function GetPosts(page, profilePosts = null, isHomepage = false) {
    let request = {
        method: "GET",
        headers: {
            "Authorization": JSON.parse(window.localStorage.getItem("user")).token
        }
    };

    let responsePosts= await fetch(`/api/posts/allPostWithLikesAndUser/` + profilePosts, request);
    try {
        if (isHomepage) {
            const user = JSON.parse(window.localStorage.getItem("user"));
            request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.token
                },
                body: JSON.stringify(
                    {
                        id_user: user.id_user,
                    }
                ),
            };

            responsePosts  = await fetch(`/api/posts/homepage`, request);
            console.log(responsePosts)
        }

        if (!responsePosts.ok) {
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }
        const posts = await responsePosts.json();
        showPostsHtml(page, posts);

        const b = document.querySelectorAll('input[type="button"]');
        [].slice.call(b).forEach(function (el) {
            el.onclick = sendLike.bind(this, el);
        });

    } catch (e){
        console.error("Error");
    }
}

async function sendLike(post){
    const user = JSON.parse(window.localStorage.getItem("user"));
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user.token
        },
        body: JSON.stringify(
            {
                id_user: user.id_user,
                id_post: post.id
            }
        ),
    };
    try {
        const responsePosts = await fetch(`/api/likes/toggle`, request);
        if (!responsePosts.ok) {
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const likeCounter = document.getElementById("counter" + post.id);
        const likeCounterInt = parseInt(likeCounter.innerHTML);
        if (responsePosts.status === 201) {
            likeCounter.innerHTML = likeCounterInt + 1;
        } else {
            likeCounter.innerHTML = likeCounterInt - 1;
        }

    } catch (e) {
        console.log(e);
    }
}



export default GetPosts;