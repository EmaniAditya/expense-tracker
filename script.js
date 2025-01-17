const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');

let transactions = [];

function updateUI() {
    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts.filter(amount => amount > 0).reduce((acc, amount) => acc + amount, 0);
    const expense = amounts.filter(amount => amount < 0).reduce((acc, amount) => acc + amount, 0);
    const balance = income + expense;

    balanceEl.innerText = `₹ ${balance.toFixed(2)}`;
    incomeEl.innerText = `₹ ${income.toFixed(2)}`;
    expenseEl.innerText = `₹ ${Math.abs(expense).toFixed(2)}`;

    transactionList.innerHTML = transactions.length ? '' : '<li>No transactions yet</li>';
    transactions.forEach(addTransactionToList);
}

function addTransactionToList(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `${transaction.name} - ₹ ${transaction.amount} <span>(${transaction.date})</span>`;
    transactionList.appendChild(li);
}

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    const transaction = { name, amount, date };
    transactions.push(transaction);
    updateUI();

    transactionForm.reset();
});

updateUI();
