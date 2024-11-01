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



const tableBody = document.getElementById('transactionsTable');
transactions.forEach(transaction => {
    const row = document.createElement('tr');
});



function darkModeFunction() {
    var element = document.getElementById("body");
    if(element.classList.contains("darkmode")) {
        element.classList.remove("darkmode")
    }
    else {
        element.classList.add("darkmode");
    }
}