$(document).ready(function() {
    $('#memeImage').attr('src', '');

    $('#memeForm').submit(function(e) {
        e.preventDefault();

        // Get the values from the input fields
        let topText = $('#topText').val();
        let bottomText = $('#bottomText').val();
        let imageURL = $('#imageURL').val();

        // Create meme element to add to the list
        const memeElement = $('<div class="meme" style="position: relative; margin: 10px 0;"></div>');

        // Create image element and set its source
        const imgElement = $('<img>').attr('src', imageURL).css("width", "100%");
        memeElement.append(imgElement);

        // Handle image loading error
        imgElement.on('error', function () {
            alert('Image failed to load. Please check the URL and try again.');
            memeElement.remove(); // Remove the meme element if image fails
        });

        // Create text elements
        const topTextElement = $('<h2>').text(topText).css({
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        });
        const bottomTextElement = $('<h2>').text(bottomText).css({
            position: 'relative',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        });

        // Append text elements to meme
        memeElement.append(topTextElement);
        memeElement.append(bottomTextElement);

        // Add meme to the list
        $('#memeList').append(memeElement);

        // Create delete button functionality
        const deleteButton = $('<button class="btn btn-danger mt-3">Delete Meme</button>');
        deleteButton.on('click', function() {
            memeElement.remove(); // Remove the meme element
        });

        // Append the delete button
        memeElement.append(deleteButton);

        // Clear form fields
        $('#memeForm')[0].reset(); // Reset the form
    });
});
