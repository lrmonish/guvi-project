let state = {}
let details = {}

const logout = () => {
    location.replace("login.html");
    localStorage.clear();
};


const email = localStorage.getItem("email");
const pass = localStorage.getItem("pass");

if (email && pass) {
    const fData = new FormData()
    fData.append("email", email)
    fData.append("password", pass)
    fetch("/proj/php/profile.php", { method: "POST", body: fData })
        .then((data) => data.text())
        .then((res) => {
            try {
                return JSON.parse(res);
            } catch (error) {
                return { success: false };
            }
        })
        .then((res) => {
            if (!res.success) {
                // logout()
            } else {
                state = res.data
                user_name.textContent = state.name
            }
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    logout();
}



const user_name = document.querySelector(".user-name")
const age = document.querySelector("input[name=age]")
const dob = document.querySelector("input[name=dob]")
const number = document.querySelector("input[name=number]")

const updateUI = () => {
    age.value = details.age
    dob.value = details.dob
    number.value = details.number
}

const update = (e) => {
    e.preventDefault()
    const form = document.querySelector("form")

    const formdata = new FormData(form)


    fetch("/proj/php/profile.php", { method: "UPDATE", body: formdata })
        .then((data) => data.text())
        .then((res) => {
            try {
                return JSON.parse(res);
            } catch (error) {
                return { success: false };
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });

}