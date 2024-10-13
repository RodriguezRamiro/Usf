$(document).ready(function() {
    $('#memeImage').attr('src', '');
    $('#memeForm').submit(function(e) {
        e.preventDefault();

        // Get the values from the input fields
        let topText = $('#topText').val();
        let bottomText = $('#bottomText').val();
        let imageURL = $('#imageURL').val();

        // Update meme text and image
        $('#memeTopText').text(topText);
        $('#memeBottomText').text(bottomText);
        $('#memeImage').attr('src', imageURL); // Set the image source (will show the same image again)

        // Show the image once it's set
        $('#memeImage').show(); // Show the image when set

        // Handle image loading error
        $('#memeImage').on('error', function () {
            alert('Image failed to load. Please check the URL and try again.');
            $(this).hide(); // Hide the image if it fails to load
            $('#memeTopText').text(''); // Clear text if image fails
            $('#memeBottomText').text(''); // Clear text if image fails
        });

        // Create meme element to add to the list
        const memeElement = $('<div class="meme" style="position: relative; margin: 10px 0;"></div>');

        // Create image element and set its source
        const imgElement = $('<img>').attr('src', imageURL).css("width", "100%");
        memeElement.append(imgElement);

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
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        });

        // Append text elements to meme
        memeElement.append(topTextElement);
        memeElement.append(bottomTextElement);

        // Show delete button
        $('#deleteButton').show(); // Show the delete button

        // Create delete button functionality
        $('#deleteButton').off('click').on('click', function() {
            $('#memeImage').hide(); // Hide the meme image
            $('#memeTopText').text(''); // Clear top text
            $('#memeBottomText').text(''); // Clear bottom text
            $(this).hide(); // Hide delete button
        });

        // Add meme to the list
        $('#memeList').append(memeElement);

        // Clear form fields
        $('#memeForm')[0].reset(); // Reset the form
    });
});
