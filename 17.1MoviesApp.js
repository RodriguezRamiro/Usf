$(document).ready(function() {
    // Movie array to hold movie objects
    var movies = [];

    // Form submission
    $('#movieForm').submit(function(event) {
      event.preventDefault(); // Prevent default form submission

      // Get input values
      let title = $('#title').val();
      let rating = $('#rating').val();

      // Create movie object
      let movie = { title: title, rating: rating };

      // Add movie to array
      movies.push(movie);

      // Append title, rating, and remove button to the DOM
      let movieItem = $('<div class="movie">').appendTo('#movieList');
      $('<span>').text('Title: ' + title).appendTo(movieItem);
      $('<span>').text(' Rating: ' + rating).appendTo(movieItem);
      $('<button>').text('Remove').click(function() {
        let index = $(this).parent().index();
        movies.splice(index, 1); // Remove movie from array
        $(this).parent().remove(); // Remove movie item from the DOM when button is clicked
      }).appendTo(movieItem);

      // Clear form inputs
      $('#title').val('');
      $('#rating').val('');
    });

    // Sorting functions
    $('#sortTitleAsc').click(function() {
      sortMovies('title', 'asc');
    });

    $('#sortTitleDesc').click(function() {
      sortMovies('title', 'desc');
    });

    $('#sortRatingAsc').click(function() {
      sortMovies('rating', 'asc');
    });

    $('#sortRatingDesc').click(function() {
      sortMovies('rating', 'desc');
    });

    // Function to sort movies
    function sortMovies(property, order) {
      movies.sort(function(a, b) {
        let valueA = a[property].toLowerCase();
        let valueB = b[property].toLowerCase();
        if (order === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });

      // Clear movie list
      $('#movieList').empty();

      // Re-append sorted movies to the DOM
      movies.forEach(function(movie) {
        let movieItem = $('<div class="movie">').appendTo('#movieList');
        $('<span>').text('Title: ' + movie.title).appendTo(movieItem);
        $('<span>').text(' Rating: ' + movie.rating).appendTo(movieItem);
        $('<button>').text('Remove').click(function() {
          let index = $(this).parent().index();
          movies.splice(index, 1); // Remove movie from array
          $(this).parent().remove(); // Remove movie item from the DOM when button is clicked
        }).appendTo(movieItem);
      });
    }
  });
