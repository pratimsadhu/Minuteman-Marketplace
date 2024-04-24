document.addEventListener('DOMContentLoaded', function () {
    // Login form elements
    const loginForm = document.getElementById('loginForm');
    const switchToSignup = document.getElementById('switchToSignup');

    // Signup form elements
    const signupHeader = document.getElementById('signupHeader');
    const signupForm = document.getElementById('signupForm');
    const switchToLogin = document.getElementById('switchToLogin');

    // Function to switch to signup form
    function switchToSignupForm(event) {
        event.preventDefault();
        loginForm.classList.add('hidden');
        switchToSignup.classList.add('hidden');
        signupHeader.classList.remove('hidden');
        signupForm.classList.remove('hidden');
    }

    // Function to switch to login form
    function switchToLoginForm(event) {
        event.preventDefault();
        signupHeader.classList.add('hidden');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        switchToSignup.classList.remove('hidden');
    }

    // Event listeners for switching forms
    switchToSignup.addEventListener('click', switchToSignupForm);
    switchToLogin.addEventListener('click', switchToLoginForm);

    // Function to validate login form
    async function validateLoginForm(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Mock data for validation
        const mockUsername = "user";
        const mockPassword = "password";

        // Simulate authentication using async function
        try {
            await fakeAuthenticate(username, password, mockUsername, mockPassword);
            alert("Login successful!");
        } catch (error) {
            alert("Incorrect username or password. Please try again.");
        }
    }

    // Function to validate signup form
    async function validateSignupForm(event) {
        event.preventDefault(); // Prevent form submission

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Validation for username and password
        if (newUsername === "" || newPassword === "") {
            alert("Please enter both a username and a password.");
            return;
        }

        // Mock data for signup
        const mockExistingUsername = "user";

        // Check if username already exists
        if (newUsername === mockExistingUsername) {
            alert("Username already exists. Please choose a different username.");
            return;
        }

        // Simulate signup process using async function
        try {
            await fakeSignup(newUsername, newPassword);
            alert("Signup successful! You can now log in with your new account.");
        } catch (error) {
            alert("Signup failed. Please try again.");
        }
    }

    // Function to simulate authentication
    async function fakeAuthenticate(username, password, mockUsername, mockPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === mockUsername && password === mockPassword) {
                    resolve();
                } else {
                    reject(new Error("Authentication failed"));
                }
            }, 1000); // Simulate delay for authentication
        });
    }

    // Function to simulate signup process
    async function fakeSignup(newUsername, newPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Here you can add your actual signup logic, like sending data to a server
                // For now, let's just resolve the promise after a short delay to simulate success
                resolve();
            }, 1000); // Simulate delay for signup process
        });
    }

    // Event listeners for form submissions
    loginForm.addEventListener('submit', validateLoginForm);
    signupForm.addEventListener('submit', validateSignupForm);
});
