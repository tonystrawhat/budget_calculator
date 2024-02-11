// Function to get current user's ID
function getUserId() {
    return localStorage.getItem('userId');
}

// Function to get current user's data from local storage
function getUserData() {
    const userId = getUserId();
    return JSON.parse(localStorage.getItem(userId)) || { balance: 0, transactionHistory: [] };
}

// Function to save current user's data to local storage
function saveUserData(userData) {
    const userId = getUserId();
    localStorage.setItem(userId, JSON.stringify(userData));
}

// Function to initialize user data
function initializeUserData() {
    const userData = getUserData();
    let balance = userData.balance;
    let transactionHistory = [];
    transactionHistory.push(...userData.transactionHistory);
    updateTransactionHistory(transactionHistory);
    updateBalance(balance);
}

// Function to add a transaction
function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    
    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    let userData = getUserData();
    let balance = userData.balance;
    let transactionHistory = userData.transactionHistory;

    if (type === '-') {
        balance -= amount;
    } else if (type === '+') {
        balance += amount;
    }

    transactionHistory.push({ type, amount, source });

    saveUserData({ balance, transactionHistory });
    updateTransactionHistory(transactionHistory);
    updateBalance(balance);
}

// Function to update transaction history table
function updateTransactionHistory(transactionHistory) {
    const transactionBody = document.getElementById('transactionBody');
    transactionBody.innerHTML = '';
    transactionHistory.forEach(transaction => {
        const row = document.createElement('tr');
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;
        const sourceCell = document.createElement('td');
        sourceCell.textContent = transaction.source;
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(sourceCell);
        transactionBody.appendChild(row);
    });
}

// Function to update balance
function updateBalance(balance) {
    document.getElementById('balance').textContent = balance;
}

// Function to clear transaction history
function clearHistory() {
    let userData = getUserData();
    userData.transactionHistory = [];
    saveUserData(userData);
    updateTransactionHistory([]);
}

// Function to clear balance
function clearBalance() {
    let userData = getUserData();
    userData.balance = 0;
    saveUserData(userData);
    document.getElementById('balance').textContent = userData.balance;
}



// Function to get the current logged username and dynamically show it on a div

function getCurrentUsername() {
    return localStorage.getItem('loggedInUser');
}

// Function to update the username in the HTML
function updateUsername() {
    const usernameDiv = document.getElementById('usernamediv');
    const loggedInUser = getCurrentUsername();
    if (loggedInUser) {
        usernameDiv.innerHTML = `Welcome, ${loggedInUser}!`;
    } else {
        usernameDiv.innerHTML = 'Welcome!';
    }
}


// Call the function to display the username when the page loads
window.onload = function() {
    updateUsername();
    initializeUserData();

};



