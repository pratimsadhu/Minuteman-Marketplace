document.addEventListener('DOMContentLoaded', function () {
    // Login form elements
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
        loginHeader.classList.remove('hidden');
        signupHeader.classList.add('hidden');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        switchToSignup.classList.remove('hidden');
    }

    // Event listeners for switching forms
    switchToSignup.addEventListener('click', switchToSignupForm);
    switchToLogin.addEventListener('click', switchToLoginForm);
});
