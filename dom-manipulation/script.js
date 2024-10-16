// Initial array of quote objects, each with 'text' and 'category' properties
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
  ];
  
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
  
      // Clear the form after submission
      quoteForm.reset();
  
      // Optionally, display the newly added quote immediately
      showRandomQuote();
    });
  }
  
  // Function to add a new quote directly from the inputs in the HTML (if you have a static form in the HTML)
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    // Validate input
    if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please enter both a quote and a category.');
      return;
    }
  
    // Add the new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
    // Clear input fields after adding the quote
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  
    // Optionally, show the newly added quote immediately
    showRandomQuote();
  }
  
  // Set up event listener for the 'Show New Quote' button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Create the form for adding new quotes when the page loads
  window.onload = createAddQuoteForm;