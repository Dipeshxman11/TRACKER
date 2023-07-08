// Get DOM elements
const myForm = document.querySelector('#my-form');
const expenseInput = document.querySelector('#Expense');
const descriptionInput = document.querySelector('#Description');
const categoryInput = document.querySelector('#Category');
const btn = document.querySelector('.btn');

// Event listeners
myForm.addEventListener('submit', onSubmit);

// Load existing expenses from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
  loadExpensesFromStorage();
});

function loadExpensesFromStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const expenseId = localStorage.key(i);
    const expense = JSON.parse(localStorage.getItem(expenseId));
    showExpenseOnScreen(expense);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const expense = expenseInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  if (expense === '' || description === '' || category === '') {
    showMessage('Please enter all fields.', 'error');
    return;
  }

  // Generate a unique expense ID
  const expenseId = generateExpenseId();

  // Create a new expense object
  const newExpense = {
    expenseId,
    expense,
    description,
    category
  };

  // Store the expense in local storage
  localStorage.setItem(newExpense.expenseId, JSON.stringify(newExpense));
  showExpenseOnScreen(newExpense);

  // Clear fields
  expenseInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';

  // Display success message
  showMessage('Expense added successfully!');
}

function showExpenseOnScreen(expense) {
  const parentEle = document.getElementById('listOfItems');
  const childEle = document.createElement('li');
  childEle.textContent =  expense.expense + '-' + expense.description + '-' + expense.category;
  parentEle.appendChild(childEle);

  // Create Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    editExpense(expense, childEle);
  });
  childEle.appendChild(editButton);

  // Create Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteExpense(expense.expenseId, childEle);
  });
  childEle.appendChild(deleteButton);

}
    
    function editExpense(expense, listItem) {
// Set expense details in the form for editing
        expenseInput.value = expense.expense;
        descriptionInput.value = expense.description;
        categoryInput.value = expense.category;

 // Remove the expense from UI
  const parentEle = document.getElementById('listOfItems');
  parentEle.removeChild(listItem);

  // Remove the expense from local storage
  deleteExpense(expense.expenseId);

}
      
  

function deleteExpense(expenseId, listItem) {
    // Remove the expense from local storage
    localStorage.removeItem(expenseId);
  
    // Remove the expense from the UI
    if (listItem && listItem.parentNode) {
      listItem.parentNode.removeChild(listItem);
    }
  }

function generateExpenseId() {
  return Math.random().toString(36).substr(2, 9);
}

function showMessage(message, type = 'success') {

    
  const msg = document.querySelector('.msg');
  msg.classList.remove('error', 'success');
  msg.classList.add(type);
  msg.innerHTML = message;

  // Remove message after 3 seconds
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);
}
