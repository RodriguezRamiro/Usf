const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = [
    'Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry',
    'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry',
    'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson',
    'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig',
    'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry',
    'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry',
    'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan',
    'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe',
    'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine',
    'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine',
    'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain',
    'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry',
    'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma',
    'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'
];

function search(searchTerm) {
    // Filter fruits based on the search term
    const results = fruits.filter(fruit =>
        fruit.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return results;
}

function searchHandler(e) {
    // Get the search term from the input
    const searchTerm = input.value;

    // Call search and show suggestions
    const results = search(searchTerm);
    showSuggestions(results, searchTerm);
}

function showSuggestions(results, inputVal) {
    // Clear previous suggestions
    suggestions.innerHTML = '';

    // Show suggestions if there are results
    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = result;
            suggestions.appendChild(listItem);
        });
        suggestions.parentElement.style.display = 'block'; 
    } else {
        suggestions.parentElement.style.display = 'none';
    }
}

function useSuggestion(e) {
    // Set the input value to the clicked suggestion
    input.value = e.target.textContent;
    suggestions.innerHTML = ''; // Clear suggestions
    suggestions.parentElement.style.display = 'none'; // Hide suggestions
}

// Add event listeners
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
