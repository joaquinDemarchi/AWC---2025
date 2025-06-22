
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (email === 'admin@gmail.com' && password === 'admin123') {
            window.location.href = 'admin/admin.html';
        } else {
            window.location.href = 'index.html';
        }
    });
});
