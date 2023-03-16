const form = document.querySelector(".login-form");

const loginHandler = (e) => {
    e.preventDefault();
    const fData = new FormData(form);
    fetch("/proj/php/login.php", { method: "POST", body: fData })
        .then((data) => data.text())
        .then((res) => {
            try {
                return JSON.parse(res);
            } catch (error) {
                return { success: false };
            }
        })
        .then((res) => {
            if (res.success) {
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("pass", res.data.password);
                location.replace("profile.html");
            } else {
                alert("Credentials not match");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

const email = localStorage.getItem("email");
const pass = localStorage.getItem("pass");

if (email && pass) {
    location.replace("profile.html");
}