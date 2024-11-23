// Navigation function for the dashboard buttons
function navigateTo(page) {
    if (page === 'index') {
        window.location.href = 'index.html'; // Navigates back to the first page
    } else if (page === 'main') {
        window.location.href = 'main.html';  // Navigates to the dashboard
    } else if (page === 'tutorials') {
        window.location.href = 'tutorials.html';  // Navigates to the tutorials page
    } else if (page === 'quiz') {
        window.location.href = 'quiz.html';  // Navigates to the quiz page
    } else {
        // For energy details pages
        window.location.href = page + '.html';
    }
}

// Function to go back to the previous page in history
function goBack() {
    window.history.back();  // This navigates back to the previous page
}
