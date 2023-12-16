$(document).ready(function() {
    $('#memeForm').submit(function(e) {
        e.preventDefault();
        let topText = $('#topText').value();
        let bottomText = $('#bottomText').value();
        let imageURL = $('#imageURL').value();

        $('#memeTopText').text(topText);
        $('#memeBottomText').text(bottomText);
        $('#memeImage').attr('src', imageURL);

        $('#meme-generator').hide();
        $('#meme-display').show();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const memeForm = document.getElementById('memeForm');
    const memeList = document.getElementById('memeList');


 // Create meme element
 const memeElement = document.createElement('div');
 memeElement.classList.add('meme');


// Create image element
const imgElement = document.createElement('img');
imgElement.src = imageUrl;
memeElement.appendChild(imgElement);

 // Create delete button
 const deleteButton = document.createElement('div');
 deleteButton.classList.add('delete-button');
 deleteButton.innerText = 'Delete';
 deleteButton.addEventListener('click', function () {
     memeElement.remove();
 };

 memeElement.appendChild(deleteButton);

 // Add meme to the list
 memeList.appendChild(memeElement);

 // Clear form fields
 memeForm.reset();