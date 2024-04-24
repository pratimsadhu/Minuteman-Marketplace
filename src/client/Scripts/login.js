document.addEventListener('DOMContentLoaded', function () {
    const loginHeader = document.getElementById('loginHeader');
    const loginForm = document.getElementById('loginForm');
    const switchToSignup = document.getElementById('switchToSignup');

    // Signup form elements
    const signupHeader = document.getElementById('signupHeader');
    const signupForm = document.getElementById('signupForm');
    const switchToLogin = document.getElementById('switchToLogin');

    // Function to switch to signup form
    function switchToSignupForm(event) {
        event.preventDefault();
        loginHeader.classList.add('hidden');
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
        loginHeader.classList.remove('hidden');
        switchToSignup.classList.remove('hidden');
    }

    // Event listeners for switching forms
    switchToSignup.addEventListener('click', switchToSignupForm);
    switchToLogin.addEventListener('click', switchToLoginForm);
    // Create or open a local database
    const db = new PouchDB('user_data');

    // Function to validate login
    async function validateLoginForm(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Fetch user document from local database
            const userDoc = await db.get(username);

            // Check if password matches
            if (userDoc.password === password) {
                alert("Login successful!");
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        } catch (error) {
            alert("User not found. Please sign up first.");
        }
    }

    // Function to handle signup form submission
    async function validateSignupForm(event) {
        event.preventDefault(); // Prevent form submission

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        try {
            // Check if user already exists
            await db.get(newUsername);
            alert("Username already exists. Please choose a different username.");
        } catch (error) {
            // User does not exist, proceed with signup
            await db.put({
                _id: newUsername,
                password: newPassword
            });
            alert("Signup successful! You can now log in with your new account.");
        }
    }

    // Event listeners for form submissions
    loginForm.addEventListener('submit', validateLoginForm);

    signupForm.addEventListener('submit', validateSignupForm);
});
