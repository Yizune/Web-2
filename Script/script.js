const transactions = [
    {
        id: "1",
        type: "income",
        amount: 3000,
        category: "Salary",
        date: "2024-09-01",
        description: "Monthly salary",
    },
    {
        id: "2",
        type: "income",
        amount: 500,
        category: "Freelance",
        date: "2024-09-05",
        description: "Freelance web development project",
    },
    {
        id: "3",
        type: "expense",
        amount: 150,
        category: "Food",
        date: "2024-09-06",
        description: "Grocery shopping",
    },
    {
        id: "4",
        type: "expense",
        amount: 75,
        category: "Entertainment",
        date: "2024-09-10",
        description: "Dinner with friends",
    },
    {
        id: "5",
        type: "expense",
        amount: 200,
        category: "Rent",
        date: "2024-09-15",
        description: "Monthly rent payment",
    },
    {
        id: "6",
        type: "expense",
        amount: 50,
        category: "Utilities",
        date: "2024-09-16",
        description: "Electricity bill",
    },
    {
        id: "7",
        type: "expense",
        amount: 100,
        category: "Transportation",
        date: "2024-09-18",
        description: "Monthly public transport pass",
    },
    {
        id: "8",
        type: "income",
        amount: 400,
        category: "Investment",
        date: "2024-09-20",
        description: "Dividends from investments",
    },
    {
        id: "9",
        type: "expense",
        amount: 120,
        category: "Food",
        date: "2024-09-22",
        description: "Takeout dinner",
    },
    {
        id: "10",
        type: "income",
        amount: 600,
        category: "Part-time Job",
        date: "2024-09-25",
        description: "Part-time job earnings",
    },
    {
        id: "11",
        type: "expense",
        amount: 40,
        category: "Entertainment",
        date: "2024-09-26",
        description: "Movie tickets",
    },
    {
        id: "12",
        type: "expense",
        amount: 180,
        category: "Shopping",
        date: "2024-09-27",
        description: "Clothing purchase",
    },
    {
        id: "13",
        type: "income",
        amount: 2000,
        category: "Salary",
        date: "2024-09-28",
        description: "Second monthly salary",
    },
    {
        id: "14",
        type: "expense",
        amount: 60,
        category: "Utilities",
        date: "2024-09-29",
        description: "Internet bill",
    },
    {
        id: "15",
        type: "expense",
        amount: 90,
        category: "Miscellaneous",
        date: "2024-09-30",
        description: "Gift for a friend",
    },
];

// FYI - Despite a lot of help I do understand every line written. There was complicated code that I refactored to my own needs and understandings.
// Would I be able to replicate the entire just like that? Nope. 
// Would I be able to do some parts of it? Well some of them I did myself and for those that I needed help with I do understand a lot better now and would at least have a clue of what to try.
// Do I at least have a better grasp and understanding of js? Yes. I actually found myself writting stuff myself which was nearly impossible on the last project and at the start of this one.
// Wouldn't say this was 50% my effort alone, but I would like to say it was somewhere close to it. Still better than nothing! 


let chart; 
let incomeTotal = 0;
let expensesTotal = 0
let removeBtn, editBtn, addBtn, clearBtn;
let filteredTransactions;
let editTransactionId = null;

function createTable(data = transactions) {
    //This was beginning point so it was like all or mostly AI/help
    const tbody = document.querySelector("#transactionsTable tbody");
    tbody.innerHTML = ""; 
    data.forEach(transaction => {
        var tr = document.createElement("tr");
        tr.addEventListener("click", selectRow);
        Object.values(transaction).forEach(cell => {
            var td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    color();
    income();
    expenses();
    balance();
    calculateAndDrawChart();
}

//Half and half
document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById("addBtn");
    const removeBtn = document.getElementById("removeBtn");
    const editBtn = document.getElementById("editBtn");

    addBtn.onclick = function () {
        openPopup('add');
    };

    removeBtn.onclick = function () {
        const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");

        if (selectedRows.length > 1) {
            openPopup('remove', {
                message: "Are you sure you want to delete the selected rows?",
                onConfirm: function () {
                    selectedRows.forEach(row => row.remove());
                    closePopup();
                }
            });
        } else {
            openPopup('remove', {
                message: "Are you sure you want to delete the selected row?",
                onConfirm: function () {
                    selectedRows.forEach(row => row.remove());
                    closePopup();
                }
            });
        }
    };

    editBtn.onclick = function () {
        const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");
        if (selectedRows.length === 1) {
            editButton(selectedRows[0]);
        } else {
            alert("Please select only one row to edit.");
        }
    };
});

//Mostly me
function openPopup(type, options = {}) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTitle");
    const addTransactionForm = document.getElementById("addTransactionForm");
    const editTransactionForm = document.getElementById("editTransactionForm");
    const removeTransactionForm = document.getElementById("removeTransactionForm");
    const confirmAction = document.getElementById("confirmAction");

    if (type === 'add') {
        popupTitle.textContent = "Remove Transaction";
        addTransactionForm.style.display = "block";
        removeTransactionForm.style.display = "none";
        editTransactionForm.style.display = "none";
    } 
    else if (type === 'remove') {
        popupTitle.textContent = "Remove Transaction";
        addTransactionForm.style.display = "none";
        removeTransactionForm.style.display = "block";
        editTransactionForm.style.display = "none";

        document.getElementById("confirmationText").textContent = options.message || "Are you sure?";

        confirmAction.onclick = function () {
            options.onConfirm();
            closePopup();
        };
    }
    else {
        popupTitle.textContent = "Edit Transaction";
        addTransactionForm.style.display = "none";
        removeTransactionForm.style.display = "none";
        editTransactionForm.style.display = "block";

        confirmAction.onclick = confirmEdit;
    }

    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

//Shit ton of help 
function addButton() {
    const type = document.getElementById('addPopupType').value;
    const amount = parseFloat(document.getElementById('addPopupAmount').value);
    const category = document.getElementById('addPopupCategory').value;
    const date = document.getElementById('addPopupDate').value;
    const description = document.getElementById('addPopupDescription').value;

    if (!type || isNaN(amount) || !category || !date || !description) {
        alert("All fields must be filled out.");
        return;
    }

    const maxId = Math.max(...transactions.map(t => parseInt(t.id))) + 1;

    transactions.push({
        id: maxId.toString(),
        type: type,
        amount: amount,
        category: category,
        date: date,
        description: description
    });

    createTable(transactions);

    closePopup();
}

function editButton() {
    const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");

    if (selectedRows.length !== 1) {
        alert("Please select exactly one row to edit.");
        return;
    }

    const cells = selectedRows[0].querySelectorAll("td");
    editTransactionId = cells[0].textContent; // Store ID of the transaction being edited

    // Populate the popup form with the selected row's values
    document.getElementById('popupType').value = cells[1].textContent;
    document.getElementById('popupAmount').value = parseFloat(cells[2].textContent);
    document.getElementById('popupCategory').value = cells[3].textContent;
    document.getElementById('popupDate').value = cells[4].textContent;
    document.getElementById('popupDescription').value = cells[5].textContent;

    openPopup('edit'); // Open the edit popup
}

function confirmEdit() {
    const type = document.getElementById('popupType').value;
    const amount = parseFloat(document.getElementById('popupAmount').value);
    const category = document.getElementById('popupCategory').value;
    const date = document.getElementById('popupDate').value;
    const description = document.getElementById('popupDescription').value;

    if (!type || isNaN(amount) || !category || !date || !description) {
        alert("All fields must be filled out.");
        return;
    }

    // Find and update the transaction
    const transaction = transactions.find(t => t.id === editTransactionId);
    if (transaction) {
        transaction.type = type;
        transaction.amount = amount;
        transaction.category = category;
        transaction.date = date;
        transaction.description = description;
    }

    createTable(transactions); // Refresh the table with the updated values
    closePopup(); // Close the popup
}

function masterFilter() {
        //Mostly helps
    filteredTransactions = transactions.slice();

    const type = document.getElementById("type").value;
    const categories = document.getElementById("categories").value;
    const amount = document.getElementById("amount").value;
    const input = document.querySelector(".input-wrapper .input").value.toUpperCase();

    console.log("Dropdown selection value:", type);
    console.log("Dropdown selection value:", categories);
    console.log("Dropdown selection value:", amount);
    console.log("Dropdown selection value:", input);

    if (type !== "ignore") {
        if (type === "Expenses") {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "expense");
        } 
        else if (type === "Income") {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "income");
        } 
        //filteredTransactions = filteredTransactions.filter(transaction => transaction.type === type); -> for some reason doesn't work???
    }    
    if (categories !== "ignore") {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.category === categories);
    }
    if (amount !== "ignore") {
        if (amount === "ascAmount") {
            console.log("ascending amount");
            filteredTransactions = filteredTransactions.sort((a, b) => b.amount - a.amount);
        } 
        else if (amount === "descAmount") {
            console.log("desscending amount");
            filteredTransactions = filteredTransactions.sort((a, b) => a.amount - b.amount);
        } 
    }
    else if (categories === "ignore"){
        filteredTransactions = filteredTransactions.sort((a, b) => a.id - b.id);
    }

    if (input !== "") {
        filteredTransactions = filteredTransactions.filter(transaction => {
            return (
                transaction.type.toUpperCase().includes(input) ||
                transaction.category.toUpperCase().includes(input) ||
                transaction.description.toUpperCase().includes(input) ||
                transaction.date.includes(input) || 
                String(transaction.amount).includes(input) 
            );
        });
    }

    console.log("Filtered Transactions after selection:", filteredTransactions);
    createTable(filteredTransactions);
}


function filterChecker() {
        //Me mostly
    const input = document.querySelector(".input-wrapper .input").value.trim();
    const type = document.getElementById("type").value;
    const categories = document.getElementById("categories").value;
    const amount = document.getElementById("amount").value;

    console.log("Filter Values ->", { input, type, categories, amount });

    const isAnyFilterActive = input !== "" || type !== "ignore" || categories !== "ignore" || amount !== "ignore";

    if (isAnyFilterActive) {
        clearBtn.disabled = false;
        clearBtn.classList.remove("disabled");
        console.log("Clear button enabled because a filter is active.");
    } else {
        clearBtn.disabled = true;
        clearBtn.classList.add("disabled");
        console.log("Clear button disabled because no filters are active.");
    }
}


function selectRow() {
        //AI
    this.classList.toggle("selected");
    const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");

    if (selectedRows.length > 0) {
        console.log("Row selected!");
        removeBtn.disabled = false;
        editBtn.disabled = false;
        removeBtn.classList.remove("disabled");
        editBtn.classList.remove("disabled");
    } 
    else {
        console.log("No rows selected!");
        removeBtn.disabled = true;
        editBtn.disabled = true;
        removeBtn.classList.add("disabled");
        editBtn.classList.add("disabled");
    }
}


function income() {
    //Half and half
    const incomeContainer = document.getElementsByClassName("income")[0];

    let text = incomeContainer.querySelector("p.income-total");

    if (!text) {
        text = document.createElement("p");
        text.classList.add("income-total"); 
        incomeContainer.appendChild(text);  
    }

    incomeTotal = 0;
    transactions.forEach(cell => {
        if (cell.type === "income") {
            incomeTotal += cell.amount;
        }
    });

    text.textContent = "$" + incomeTotal; 
}

function expenses(){
    //Me
    const expenseContainer = document.getElementsByClassName("expenses")[0];

    let text = expenseContainer.querySelector("p.expense-total");
    
    if (!text) {
        text = document.createElement("p");
        text.classList.add("expense-total"); 
        expenseContainer.appendChild(text);  
    }

    expensesTotal = 0;
    transactions.forEach(cell => {
        if (cell.type === "expense") {
            expensesTotal += cell.amount;
        }
    });
    
    text.textContent = "$" + expensesTotal;
}

function balance(){
        //Me
    const balanceContainer = document.getElementsByClassName("balance")[0];

    let text = balanceContainer.querySelector("p.balance-total");
    
    if (!text) {
        text = document.createElement("p");
        text.classList.add("balance-total"); 
        balanceContainer.appendChild(text);  
    }
    
    let balanceTotal = 0;
    balanceTotal = incomeTotal - expensesTotal;
    text.textContent = "$" + balanceTotal; 
}

function color(){
        //Me
    const cells = document.querySelectorAll("#transactionsTable td")
    cells.forEach(cell => {
        if (cell.textContent == "income") {
            cell.style.color = "green";
        }
        else if(cell.textContent == "expense"){
            cell.style.color = "red"
        }
    });
}

function clearButton() {
        //Me mostly
    clearBtn = document.querySelector(".clear button");
    const input = document.querySelector(".input-wrapper .input");
    const amount = document.getElementById("amount");
    const type = document.getElementById("type");
    const categories = document.getElementById("categories");

    clearBtn.addEventListener("click", function() {
        input.value = "";
        amount.value = "ignore";
        type.value = "ignore";
        categories.value = "ignore";

        filterChecker();
        masterFilter();
        createTable(filteredTransactions);
    });
}

function clearChart() {
    //AI
    // Dispose of the chart if it exists to prevent duplication
    if (chart) {
        chart.dispose();
        chart = null;  // Clear the chart reference
    }
}

function setChartBackground() {
    //AI
    // Check dark mode status and apply background color
    const isDarkMode = document.body.classList.contains("darkmode");
    if (chart) {
        chart.background().fill(isDarkMode ? "#1E201E" : "#dbdbdb");
    }
}

function calculateAndDrawChart() {
    //Fully taken from inernet - Modified by AI
    // Clear the previous chart to avoid duplicates
    clearChart();

    // Calculate totals
    let incomeTotal = 0;
    let expensesTotal = 0;
    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            incomeTotal += transaction.amount;
        } else if (transaction.type === "expense") {
            expensesTotal += transaction.amount;
        }
    });

    // Create the chart
    const data = anychart.data.set([
        ["Income", incomeTotal],
        ["Expenses", expensesTotal],
    ]);

    chart = anychart.pie(data);  // Store the chart in the global variable

    const palette = anychart.palettes.distinctColors();
    palette.items([{ color: "#5D9C59" }, { color: "#DF2E38" }]);
    chart.palette(palette);

    chart.title("Income vs Expenses");

    setChartBackground();  // Set the initial background based on mode

    chart.container("chart-container");
    chart.draw();
}

function darkModeFunction() {
    // Youtube
    var element = document.getElementById("body");
    if (element.classList.contains("darkmode")) {
        element.classList.remove("darkmode");
    } else {
        element.classList.add("darkmode");
    }
    setChartBackground();
}


window.onload = function() {
    //Me 
    const type = document.getElementById("type");
    const categories = document.getElementById("categories");
    const amount = document.getElementById("amount");
    const input = document.querySelector(".input-wrapper .input");

    removeBtn = document.querySelector(".remove-selected button");
    editBtn = document.querySelector(".edit-selected button");
    addBtn = document.querySelector(".add-selected button");
    clearBtn = document.querySelector(".clear button");

    removeBtn.disabled = true;
    editBtn.disabled = true;
    addBtn.disabled = false;
    addBtn.classList.remove("disabled");
    clearBtn.disabled = true;

    type.addEventListener("change", () => {
        filterChecker();
        masterFilter(); 
    });
    categories.addEventListener("change", () => {
        filterChecker();
        masterFilter(); 
    });
    amount.addEventListener("change", () => {
        filterChecker();
        masterFilter(); 
    });
    input.addEventListener("input", () => {
        filterChecker();
        masterFilter(); 
    });

    createTable();
    filterChecker();
    clearButton(); 
}