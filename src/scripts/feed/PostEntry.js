/* <===> <===> IMPORTS <===> <===> */
import { getPostEntryClicked, setPostEntryClicked } from "../data/provider.js";


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
  return "<div id='postEntry' class='border'><p>Have a gif to post?</p></div>";
};

// function -> build post entry form //
const postEntryForm = () => {
  return `<div class="container border">
    <form>
    <div class="form-group">
        <input type="text" class="form-control mt-3" placeholder="Title">
        <input type="text" class="form-control mt-3" placeholder="URL or gif"
        <textarea placeholder="Story behind your gif..."></textarea>
        <button class="btn btn-primary mt-3 mb-3">Save</button>
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
/* END */