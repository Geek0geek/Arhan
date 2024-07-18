const USER_ID = "admin";
const PASSWORD = "sierra_7";
let attempts = 0;
const MAX_ATTEMPTS = 3;

window.onload = function() {
    generateCaptcha();
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
            generateCaptcha();
        }
    }
}

function playVideo() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
    document.getElementById("video").play();
}

function openEditor() {

    alert("Editor opened!");
}
