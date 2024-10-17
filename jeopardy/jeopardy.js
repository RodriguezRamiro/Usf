// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const NUM_CATEGORIES = 6; // Change this value as needed
const NUM_QUESTIONS_PER_CAT = 5; // Ensure this is also defined

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories?count=100`);
  const categoryData = response.data;

    // Select 6 random categories out of the fetched 100
    const randomCategories = _.sampleSize(categoryData, NUM_CATEGORIES);

    return randomCategories.map(category => category.id);
  }

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`);
  const category = response.data;

  return {
      title: category.title,
      clues: category.clues.map(clue => ({
          question: clue.question,
          answer: clue.answer,
          showing: null
      }))
  };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    // Clear any existing data
    $("#jeopardy-board").empty();

    // Create the table header with category titles
    const $thead = $("<thead>");
    const $headerRow = $("<tr>");
    for (let category of categories) {
      const $th = $("<th>").text(category.title.toUpperCase());
      $headerRow.append($th);
    }
    $thead.append($headerRow);
    $("#jeopardy-board").append($thead);

    // Create the table body with placeholders for questions
    const $tbody = $("<tbody>");
    for (let questionIdx = 0; questionIdx < NUM_QUESTIONS_PER_CAT; questionIdx++) {
      const $row = $("<tr>");
      for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
        const $cell = $("<td>")
          .attr("id", `${catIdx}-${questionIdx}`)
          .addClass("question-cell")
          .text("?")
          .on("click", handleClick); // Ensure click handler is added to each cell
        $row.append($cell);
      }
      $tbody.append($row);
    }
    $("#jeopardy-board").append($tbody);
  }

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  // Prevent default event propagation
  evt.stopPropagation();

    const id = evt.target.id;
    const [categoryIndex, clueIndex] = id.split("-").map(Number);
    const clue = categories[categoryIndex].clues[clueIndex];


  //  console.log("Clue before click:", clue);

    if (clue.showing === "answer") {
      return; // Ignore any further clicks once the answer is shown
  }

    if (!clue.showing) {
      $(evt.target).text(clue.question);
      clue.showing = "question";
//     console.log("showing Question:", clue.question);
    } else if (clue.showing === "question") {
      $(evt.target).text(clue.answer);
      clue.showing = "answer";
//     console.log("Showing answer:", clue.answer);
    }

//    console.log("Clue after click:", clue)
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $("#jeopardy-board").empty();
    $("#loading-spinner").show();
  }

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#loading-spinner").hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category in parallel
 * - create HTML table
 */
async function setupAndStart() {
    try {
      showLoadingView();

      // Get random category IDs
      const categoryIds = await getCategoryIds();

      // Fetch all category data in parallel
      const categoryPromises = categoryIds.map(id => getCategory(id));
      categories = await Promise.all(categoryPromises);

      // Hide loading spinner and fill the table
      hideLoadingView();
      fillTable();
    } catch (error) {
      console.error("Error setting up the game:", error);
      alert("Something went wrong while setting up the game. Please try again.");
      hideLoadingView(); // Ensure loading view is hidden in case of an error
    }
  }


/** On click of start / restart button, set up game. */

$("#restart-btn").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */

$(async function () {
    $("#loading-spinner").hide(); // Ensure spinner is hidden at the start
    $("#jeopardy-board").on("click", "td", handleClick);

    await setupAndStart();
  });