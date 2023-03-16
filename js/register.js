const form = document.querySelector(".register-form")
const handleSubmit = (e) => {

    e.preventDefault()
    const fData = new FormData(form)

    fetch("/proj/php/register.php", { method: "POST", body: fData })
        .then(data => data.text())
        .then(res => {
            try {
                return JSON.parse(res)
            } catch (error) {
                return { success: false }
            }

        })
        .then(res => {
            if (res.success) {
                location.replace("login.html")
            } else {
                alert("User Already Exists")
            }
        })
        .catch(error => {
            console.error(error);
        });

}



const email = localStorage.getItem("email");
const pass = localStorage.getItem("pass");

if (email && pass) {
    location.replace("profile.html");
}