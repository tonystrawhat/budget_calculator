function saveUserData(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert("User already exists!");
        return;
    }

    // Save user data to local storage
    localStorage.setItem(username, password);
    window.location.href="login.html";

    alert("Registration successful!");
}



//login check user  and password
// Function to handle user login
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    // Check if user exists and password matches
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        // Redirect to dashboard.html or perform other actions
        window.location.href = "dashboard.html";
        // After successful login
        localStorage.setItem('loggedInUser', username);
    } else {
        alert("Invalid username or password!");
    }
}

// Attach the login function to the login form submission event
document.getElementById("loginForm").addEventListener("submit", loginUser);




