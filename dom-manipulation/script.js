const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Simulated endpoint
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to fetch quotes from the simulated server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Convert the response to quote format and save to local storage
    const newQuotes = data.map(item => ({
      text: item.title, // Using title as the quote text
      category: "General" // Default category for simulated quotes
    }));

    // Sync new quotes with existing quotes
    syncQuotesWithLocalStorage(newQuotes);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Periodically fetch new quotes from the server
setInterval(fetchQuotesFromServer, 30000); // Fetch every 30 seconds

// Function to sync fetched quotes with local storage
function syncQuotesWithLocalStorage(newQuotes) {
  // Fetch existing quotes from local storage
  const existingQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const mergedQuotes = [...existingQuotes];
  let conflicts = [];

  newQuotes.forEach(newQuote => {
    const exists = mergedQuotes.find(quote => quote.text === newQuote.text);
    if (exists) {
      // Conflict detected
      conflicts.push(newQuote.text);
      // Optionally, you can decide to use the new quote or keep the existing one
      console.warn(`Conflict detected for quote: "${newQuote.text}". Existing quote will be kept.`);
    } else {
      mergedQuotes.push(newQuote); // Add new quote if it doesn't exist
    }
  });

  // Save the updated quotes array to local storage
  localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
  quotes = mergedQuotes; // Update the quotes variable

  // Notify user if there were conflicts
  if (conflicts.length > 0) {
    displayNotification(`Updated quotes! Conflicts detected for: ${conflicts.join(', ')}`);
  } else {
    displayNotification('New quotes fetched successfully!');
  }

  populateCategories(); // Update the categories in the dropdown
  showRandomQuote(); // Display a new random quote
}

// Function to display a notification message
function displayNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;
  document.body.appendChild(notification);

  // Remove notification after a few seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerText = quotes[randomIndex].text;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes(); // Save to local storage
  populateCategories(); // Update the categories in the dropdown
  showRandomQuote(); // Display a new random quote

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))];

  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add new category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  // Update the displayed quotes
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerText = filteredQuotes.length ? filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)].text : 'No quotes available for this category.';
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories(); // Update categories
    showRandomQuote(); // Display a new random quote
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Initialize by populating categories and showing a random quote
populateCategories();
showRandomQuote();