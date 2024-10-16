// Load quotes from local storage or use default quotes if none exist
const storedQuotes = localStorage.getItem('quotes');
let quotes = storedQuotes ? JSON.parse(storedQuotes) : [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Function to save the quotes array to local storage
function saveQuotesToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
}

// Function to dynamically create and display the form for adding a new quote
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.id = 'quoteFormContainer';

  formContainer.innerHTML = `
    <h2>Add a New Quote</h2>
    <form id="quoteForm">
      <label for="quoteText">Quote:</label>
      <input type="text" id="quoteText" name="quoteText" required><br>
      <label for="quoteCategory">Category:</label>
      <input type="text" id="quoteCategory" name="quoteCategory" required><br>
      <button type="submit">Add Quote</button>
    </form>
  `;

  document.body.appendChild(formContainer);

  // Handle form submission
  const quoteForm = document.getElementById('quoteForm');
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page from refreshing
    const newQuoteText = document.getElementById('quoteText').value;
    const newQuoteCategory = document.getElementById('quoteCategory').value;

    // Add the new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save the updated quotes array to local storage
    saveQuotesToLocalStorage();

    // Clear the form after submission
    quoteForm.reset();

    // Optionally, display the newly added quote immediately
    showRandomQuote();
  });
}

// Function to export quotes to a JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty print with 2 spaces
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json'; // Filename for the download
  downloadLink.click(); // Trigger the download
  URL.revokeObjectURL(url); // Clean up the object URL
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      // Validate the structure of the imported quotes
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
        quotes.push(...importedQuotes);
        saveQuotesToLocalStorage(); // Update local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Show a random quote after importing
      } else {
        alert('Invalid JSON format. Make sure the JSON contains an array of quotes with "text" and "category" properties.');
      }
    } catch (e) {
      alert('Error parsing the JSON file. Please check the file and try again.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Set up event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the form for adding new quotes when the page loads
window.onload = createAddQuoteForm;