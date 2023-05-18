const addTransactionBtn = document.getElementById("add-transaction");
const transactionList = document.getElementById("transaction-list");

addTransactionBtn.addEventListener("click", addTransaction);

function addTransaction() {
  const titleInput = document.getElementById("transaction-title");
  const categoryInput = document.getElementById("transaction-category");
  const amountInput = document.getElementById("transaction-amount");

  const title = titleInput.value;
  const category = categoryInput.value;
  const amount = amountInput.value;

  if (title.trim() === "" || isNaN(amount)) {
    alert("Please enter valid transaction details");
    return;
  }

  const listItem = document.createElement("li");
  listItem.classList.add("transaction-list-item");
  listItem.classList.add(category);

  listItem.innerHTML = `
    <span>${title}</span>
    <span>${category === "revenue" ? "+" : "-"}${amount}</span>
    <button class="delete-transaction">Delete</button>
  `;

  transactionList.appendChild(listItem);

  titleInput.value = "";
  categoryInput.value = "revenue";
  amountInput.value = "";

  updateLocalStorage();
}

transactionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-transaction")) {
    event.target.parentNode.remove();
    updateLocalStorage();
  }
});

function updateLocalStorage() {
  const transactions = Array.from(transactionList.children).map((item) => ({
    title: item.children[0].textContent,
    category: item.classList.contains("revenue") ? "revenue" : "expense",
    amount: parseFloat(item.children[1].textContent),
  }));

  localStorage.setItem("transactions", transactions);
}


function loadTransactions() {
    const transactions = localStorage.getItem("transactions");
  
    if (transactions) {
      transactions.forEach((transaction) => {
        const listItem = document.createElement("li");
        listItem.classList.add("transaction-list-item");
        listItem.classList.add(transaction.category);
  
        listItem.innerHTML = `
          <span>${transaction.title}</span>
          <span>${transaction.category === "revenue" ? "+" : "-"}${transaction.amount}</span>
          <button class="delete-transaction">Delete</button>
        `;
  
        transactionList.appendChild(listItem);
      });
    }
  }
  

loadTransactions();
