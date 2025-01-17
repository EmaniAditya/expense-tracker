const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');

const transactionsList = document.getElementById('transactions-list');

const transactionForm = document.getElementById('transaction-form');

let transactions = [];

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from refreshing the page

    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value); // convert amount to number
    const date = document.getElementById('date').value;

    const transaction = { name, amount, date };
    transactions.push(transaction);
    update();

    transactionForm.reset();
});

function addTransaction(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `<span>₹${transaction.amount.toFixed(0)}</span> <span>${transaction.name}</span> <span>${transaction.date}</span>`;
    transactionsList.appendChild(li);
}

function update() {
    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts.filter(amount => amount > 0).reduce((acc, amount) => acc + amount, 0);
    const expense = amounts.filter(amount => amount < 0).reduce((acc, amount) => acc + amount, 0);

    const balance = income + expense;

    totalBalance.innerText = `₹ ${balance.toFixed(0)}`;
    totalIncome.innerText = `₹ ${income.toFixed(0)}`;
    totalExpense.innerText = `₹ ${expense.toFixed(0)}`;

    transactionsList.innerHTML = transactions.length ? '' : '<li>No transactions yet</li>';
    transactions.forEach(addTransaction);
}

update();