const totalBalance = document.getElementById('total-balance')
const totalIncome = document.getElementById('total-income')
const totalExpense = document.getElementById('total-expense')

const transactionsList = document.getElementById('transactoins-list')

const transactoinForm = document.getElementById('transaction-form')

let transactoins = []

transactoinForm.addEventListener('submit', (e) => {
    
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    const transaction = {name, amount, date};
    transactoins.push(transaction);
    update();

    transactoinForm.reset();
})

function addTransactions(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `${transaction.name} => ₹ ${transaction.amount} <span>(${transaction.date})</span>`;
    transactionsList.appendChild(li);
}

function update() {
    const amounts = transactoins.map(transactoin => transactoin.amount);

    const income = amounts.filter(amount => amount > 0).reduce((acc, amount) => acc + amount, 0);
    const expense = amounts.filter(amount => amount < 0).reduce((acc, amount) => acc + amount, 0);

    const balance = income + expense;

    totalBalance.innerText = `₹ ${balance.toFixed(2)}`;
    totalIncome.innerText = `₹ ${income.toFixed(2)}`;
    totalExpense.innerText = `₹ ${expense.toFixed(2)}`;

    transactionList.innerHTML = transactions.length ? '' : '<li>No transactions yet</li>';
    transactoins.forEach(addTransactions);
}

update();