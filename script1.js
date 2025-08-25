document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expense")) || [];
  let totalamt = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && amount > 0 && !isNaN(amount)) {
      e.preventDefault();

      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };

      expenses.push(newExpense);

      saveToLocalStorage();
      renderExpenses();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((elem) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${elem.name} - $${elem.amount.toFixed(2)}</span>
        <button data-id="${elem.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
    updateTotal();
  }

  function updateTotal() {
    totalamt = calculateTotal();
    totalAmountDisplay.textContent = totalamt.toFixed(2);
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveToLocalStorage() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((exp) => exp.id !== expenseId);
      saveToLocalStorage();
      renderExpenses();
      updateTotal();
    }
  });
});
