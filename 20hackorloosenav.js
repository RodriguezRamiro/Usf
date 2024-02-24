"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

//show submit form on clicking story "submit" //-You!
function navSubmitStoryClick(evt){
  consoledebug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesLIst.Show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);

//showfavorite stories when click on favorites //-You!
function navFavortiesClick(evt){
  console.debug("navFavoritesCllick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-Favorites", navFavoritesClick);

//Show My stories on clicking "my stories" //-You!
function navMyStories(evt){
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUsersStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "nav-my-stories", navMyStories);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide()
}

$navLogin.on("click", navLoginClick);

//hide all but profile when click on "profile" //-You!
function navProvfileClick(evt){
  console.debug("navProfileClick", evt);
  hodePageComponents();
  $userProfile.show();
}
$navUserProfile.on("click", navProfileClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
