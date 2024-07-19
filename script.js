const USER_ID = "admin";
const PASSWORD = "sierra_7";
let attempts = 0;
const MAX_ATTEMPTS = 3;

let users = {};
let notespaces = {};

window.onload = function() {
    generateCaptcha();
    loadNotespaces();
};

function generateCaptcha() {
    const captcha = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById("captcha").innerText = captcha;
}

function validateLogin() {
    const userId = document.getElementById("user-id").value;
    const password = document.getElementById("password").value;
    const captchaInput = document.getElementById("captcha-input").value;
    const captcha = document.getElementById("captcha").innerText;

    if (userId === USER_ID && password === PASSWORD && captchaInput === captcha) {
        alert("Login successful!");
        openEditor();
    } else {
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
            playVideo();
        } else {
            alert(`Login failed! Attempts left: ${MAX_ATTEMPTS - attempts}`);
            resetForm();
            generateCaptcha();
        }
    }
}

function resetForm() {
    document.getElementById("user-id").value = '';
    document.getElementById("password").value = '';
    document.getElementById("captcha-input").value = '';
}

function playVideo() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
    document.getElementById("video").play();
}

function openEditor() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("editor").classList.remove("hidden");
}

function showRegisterForm() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
}

function hideRegisterForm() {
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
}

function registerUser() {
    const newUserId = document.getElementById("new-user-id").value;
    const newPassword = document.getElementById("new-password").value;

    if (users[newUserId]) {
        alert("User ID already exists. Please choose a different User ID.");
    } else {
        users[newUserId] = newPassword;
        alert("Registration successful! You can now log in.");
        hideRegisterForm();
    }
}

function saveNote() {
    const note = document.getElementById("note").value;
    const notespace = document.getElementById("note-space").value;

    if (!notespace) {
        alert("Please select or create a notespace.");
        return;
    }

    if (!notespaces[notespace]) {
        notespaces[notespace] = [];
    }

    notespaces[notespace].push(note);
    updateGitHub(notespace, notespaces[notespace]);
}

function updateGitHub(notespace, notes) {
    // Replace with your actual GitHub repo information and access token
    const repo = 'your-repo';
    const owner = 'your-username';
    const path = `${notespace}.json`;
    const token = 'your-github-token';

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token
