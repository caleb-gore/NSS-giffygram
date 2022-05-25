/* <===> <===> IMPORTS <===> <===> */
import { getCurrentUser, getPostEntryClicked, savePost, setPostEntryClicked } from "../data/provider.js";


/* <===> <===> FUNCTIONS <===> <===> */

// function -> build HTML for post entry section -> exported to GiffyGram.js //
export const PostEntry = () => {
  let HTML = "";
  const newPost = getPostEntryClicked();

  // check 'clicked' status of post entry section //
  if (newPost === true) {
    HTML = postEntryForm();
  } else {
    HTML = miniPostEntry();
  }
  return HTML;
};

// function -> build minimized HTML for post entry section //
const miniPostEntry = () => {
  return `<button id='postEntry' class='btn border mb-3'><i style="pointer-events: none" class="m-auto fa-3x fa-solid fa-circle-plus"></i></button>`;
};

// function -> build post entry form //
const postEntryForm = () => {
  return `<div class="container border mb-3">
    <h3 class="text-center" >new post</h3>
    <form>
    <div class="form-group">
        <input type="text" class="form-control mt-3" id="postTitleInput" placeholder="Title">
        <input type="text" class="form-control mt-3" id="postURLInput"placeholder="URL or gif">
        <textarea class="form-control mt-3" id="postTextInput" placeholder="Story behind your gif..."></textarea>
        <button class="btn btn-primary mt-3 mb-3" id="savePost">Save</button>
        <button class="btn btn-primary mt-3 mb-3" id="cancel">Cancel</button>
        </div>
    </form>
    </div>`;
};
/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> click -> post entry section -> set 'clicked' status to true //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "postEntry") {
    setPostEntryClicked(true);
  }
});

// event listener -> click -> 'Cancel' button -> set 'clicked' status to false //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "cancel") setPostEntryClicked(false);
});

// event listener -> click -> 'Save' button -> save user input to API //
document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id ==='savePost') {
        // save input values to variables
        const postTitle = document.querySelector('input[id="postTitleInput"]').value
        const postURL = document.querySelector('input[id="postURLInput"]').value
        const postText = document.querySelector('textarea[id="postTextInput"]').value

        const user = getCurrentUser()

        // create new post object with variables
        const newPost = {
            title: postTitle,
            imageURL: postURL,
            description: postText,
            userId: user.id,
            timestamp: Date.now()
        }

        // call 'send post to api' function
        savePost(newPost)

    }
})

/* END */