import { Redirect } from "../Router/Router";
import bannerExample from "../../img/bannerExample.jpg";


const ProfilePage = async () => {
    const pageDiv = document.querySelector("#page");

    pageDiv.innerHTML = "";
    const api = "https://paf.be/tweet/";


    try {
        // hide data to inform if the pizza menu is already printed
        const responseUserInfo = await fetch(api + "user/1/"); // fetch return a promise => we wait for the response

        if (!responseUserInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }

        const responsePosts = await fetch(api + "user/1/post/"); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const user = await responseUserInfo.json();
        const posts = await responsePosts.json();
        
        let date = new Date(user.creationDate);
        
        let dateString = date.toDateString();

        page.innerHTML = `
                <div id="banner"></div>

                <div id="userContainer">
                    <div class="col-sm-10" id="userName">${user.forename} ${user.lastname} </div>
                    <div class="col-sm-10" id="biography">Biography : ${user.biography}</div>
                    <div class="col-sm-10" id="creationDate">Created his account on ${dateString}</div>
                </div>
            <div class="container" id="tablePost"></div>  
        `;
        
        
        let table = document.getElementById("tablePost")
        posts.forEach((post) => {
            var row = `<div id="post">
                            <div class="col-sm-1" >${user.forename}</div>
							<div class="col-sm-auto" id="postText">${post.message}</div>
							<div class="col-sm-auto" id="imageDiv" >
                            <img id="image" src="${post.image}" width="50%">                
                            </div>
					  </div>`;
            table.innerHTML += row;
        });
    } catch (error) {
        console.error("Error");
    }
};



export default ProfilePage;