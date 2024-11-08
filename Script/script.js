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

let incomeTotal = 0;
let expensesTotal = 0
let removeBtn, editBtn, addBtn, clearBtn;

function createTable(data = transactions) {
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
}



function typeFilter() {
    const type = document.getElementById("type").value;
    console.log("Dropdown selection value:", type);

    let filteredTransactions;

    if (type === "Expenses") {
        filteredTransactions = transactions.filter(transaction => transaction.type === "expense");
    } else if (type === "Income") {
        filteredTransactions = transactions.filter(transaction => transaction.type === "income");
    } else {
        filteredTransactions = transactions;
    }

    console.log("Filtered Transactions after selection:", filteredTransactions);
    createTable(filteredTransactions);
}


function filterChecker() {
    const input = document.querySelector(".input-wrapper .input").value.trim();
    const type = document.getElementById("type").value;
    const categories = document.querySelector("#categories").value;
    const date = document.querySelector("#date").value;

    // Log current filter values for debugging
    console.log("Filter Values ->", { input, type, categories, date });

    // Check if any filter is set to a non-default value
    const isAnyFilterActive = input !== "" || type !== "ignore" || categories !== "ignore" || date !== "ignore";

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
    this.classList.toggle("selected");
    const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");

    if (selectedRows.length > 0) {
        console.log("Row selected!");
        removeBtn.disabled = false;
        editBtn.disabled = false;
        removeBtn.classList.remove("disabled");
        editBtn.classList.remove("disabled");
    } else {
        console.log("No rows selected!");
        removeBtn.disabled = true;
        editBtn.disabled = true;
        removeBtn.classList.add("disabled");
        editBtn.classList.add("disabled");
    }
}


function income(){
    const text = document.createElement("p");
    const income = document.getElementsByClassName("income")
    transactions.forEach(cell => {
        if (cell.type == "income") {
            incomeTotal = cell.amount + incomeTotal;
        } 
    });
    text.textContent = "$" + incomeTotal;
    income[0].appendChild(text);
}

function expenses(){
    const text = document.createElement("p");
    const expenses = document.getElementsByClassName("expenses")
    transactions.forEach(cell => {
        if (cell.type == "expense") {
            expensesTotal = cell.amount + expensesTotal;
        }
    });
    text.textContent = "$" + expensesTotal;
    expenses[0].appendChild(text);
}

function balance(){
    const text = document.createElement("p");
    const balance = document.getElementsByClassName("balance")
    balanceTotal = incomeTotal - expensesTotal;
    text.textContent = "$" + balanceTotal;
    balance[0].appendChild(text);
}

function color(){
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


function darkModeFunction() {
    var element = document.getElementById("body"); //potentially to put at the start in the $document
    if(element.classList.contains("darkmode")) {
        element.classList.remove("darkmode")
    }
    else {
        element.classList.add("darkmode");
    }
}

function clearButton() {
    clearBtn = document.querySelector(".clear button");
    const input = document.querySelector(".input-wrapper .input");
    const categories = document.querySelector("#categories");
    const date = document.querySelector("#date");
    const type = document.getElementById("type");

    clearBtn.addEventListener("click", function() {
        input.value = "";
        categories.value = "ignore";
        date.value = "ignore";
        type.value = "ignore";

        filterChecker();
        createTable(transactions);
    });
}


function addButton(){

}

function removeButton(){
    const selectedRows = document.querySelectorAll("#transactionsTable tr.selected");
    removeBtn = document.querySelector(".remove-selected button");
}

function editButton(){

}


window.onload = function() {
    const type = document.getElementById("type");
    const inputField = document.querySelector(".input-wrapper .input");
    const categories = document.querySelector("#categories");
    const date = document.querySelector("#date");

    // Ensuring filterChecker is called whenever any filter input changes
    type.addEventListener("change", () => {
        filterChecker();
        typeFilter();  // Run typeFilter whenever type changes
    });
    inputField.addEventListener("input", filterChecker);
    categories.addEventListener("change", filterChecker);
    date.addEventListener("change", filterChecker);

    removeBtn = document.querySelector(".remove-selected button");
    editBtn = document.querySelector(".edit-selected button");
    addBtn = document.querySelector(".add-selected button");
    clearBtn = document.querySelector(".clear button");

    removeBtn.disabled = true;
    editBtn.disabled = true;
    addBtn.disabled = false;
    addBtn.classList.remove("disabled");
    clearBtn.disabled = true;

    createTable();
    color();
    income();
    expenses();
    balance();
    filterChecker();
    clearButton(); 
}


