let toggle = document.querySelector(".toggle")
let togglePath = document.querySelector(".togglePath")
let signUpPath = document.getElementById("signUpPath")//container in the toggle
let signInPath = document.getElementById("signInPath")// container in the toggle
let signUpName = document.getElementById("signUpName")
let signUpEmail = document.getElementById("signUpEmail")
let signUpPassword = document.getElementById("signUpPassword")
let signInEmail = document.getElementById("signInEmail")
let signInPassword = document.getElementById("signInPassword")
let registe = document.getElementById("registe")//the button in sign up form
let logIn = document.getElementById("logIn") //the button in sign in in form
let logOut = document.getElementById("logOut")
let signUp = document.getElementById("signUp") //the form for sign up
let signIn = document.getElementById("signIn") //the form for sign in


let userList = [];
let left = 0;


if(localStorage.getItem("user") == null){
    userList = []
}else{
    userList = JSON.parse(localStorage.getItem("user"))
}

function goToSignUp() {
    left = 50;
    toggle.style.left = left +"%";
    toggle.style.borderRadius = "100px 0 0 100px";
    togglePath.style.borderRadius = "100px 0 0 100px";
    signUpPath.classList.add("d-none")
    signInPath.classList.remove("d-none")
    signUp.classList.remove("d-none")
}

function goToSignIn(){
    left = 0;
    toggle.style.left = left;
    toggle.style.borderRadius = "0 100px 100px 0";
    togglePath.style.borderRadius = "0 100px 100px 0";
    signUpPath.classList.remove("d-none")
    signInPath.classList.add("d-none")
    signUp.classList.add("d-none")
}

function addUser(){
    let checkReapet = userList.findIndex((el)=>{
        return el.name == signUpName.value && el.email == signUpEmail.value 
    })
    let regName = /^[A-Za-z]{3,}$/ 
    let regEmail = /^\w{3,20}@[a-zA-Z_-]{3,15}\.[a-zA-Z]{2,3}$/ 
    if(regName.test(signUpName.value) == true){
        if(regEmail.test(signUpEmail.value) == true){
            if(checkReapet == -1 ){
                let userInfo = {
                    name : signUpName.value ,
                    email : signUpEmail.value ,
                    password: signUpPassword.value
                }
                userList.push(userInfo)
                localStorage.setItem( "user" , JSON.stringify(userList))
                goToSignIn()
            }else{
                document.getElementById("Reapeted").classList.remove("d-none")
            }
        }else{
            document.getElementById("InvalidEmail").classList.remove("d-none")
        }
    }else{
        document.getElementById("InvalidName").classList.remove("d-none")
    }
}

function userLogIn() {
    let checkExist = userList.find((el)=>{
        return el.password == signInPassword.value && el.email == signInEmail.value 
    })
    if(checkExist == undefined){
        document.getElementById("failLog").classList.remove("d-none")
    }else{
        localStorage.setItem("currentUser" , checkExist.name)
        window.location.href ="welcome.html"
    }
}

function deleteUser() {
    localStorage.removeItem("currentUser")
    window.location.href ="index.html"
}

document.getElementById("signInGo")?.addEventListener("click" , goToSignIn)
document.getElementById("signUpGo")?.addEventListener("click" ,goToSignUp)
registe?.addEventListener("click" , addUser)
logIn?.addEventListener("click" , userLogIn)
logOut?.addEventListener("click" , deleteUser)

//success log in 
if(localStorage.getItem("currentUser") !== null){
    document.getElementById("welcomeMsg").innerHTML = "Hi, " + localStorage.getItem("currentUser").toUpperCase()
}