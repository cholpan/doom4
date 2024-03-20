const list = document.querySelector(".list");
const modalBtn = document.querySelector(".header button");
const showModal = document.querySelector(".modal-window");

const USER_API = "https://64340de21c5ed06c958dd2da.mockapi.io/users";

function getUsers() {
  fetch(USER_API)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      displayUsers(data);
    });
}

getUsers();

function displayUsers(data) {
  data.map((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user";

    const nameText = document.createElement("h2");
    nameText.textContent = user.name;
    const agtext = document.createElement("p");
    agtext.className = "age";
    agtext.textContent = user.age;
    const job = document.createElement("p");
    job.textContent = user.job;
    const opt = document.createElement("p");
    opt.textContent = user.experience;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

deleteBtn.addEventListener("click",()=>{
    deleteUser(user.id)
});

    userDiv.append(nameText);
    userDiv.append(agtext);
    userDiv.append(job);
    userDiv.append(opt);
    list.append(userDiv);
    userDiv.append(deleteBtn)
  });
}

modalBtn.addEventListener("click", () => {
  showModal.style.display = "flex";
});

const inputs = document.querySelectorAll(".add-user input");
const submitbtn = document.querySelector(".buttons button");
const data = {};

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const { name, value } = e.target;

    data[name] = value;
  });
});

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(data);

  fetch(USER_API, {
    method: "POST",
    body: JSON.stringify({ ...data, age: +data.age, id: "1" }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      showModal.style.display = "none";
      list.innerHTML = "";
      getUsers();
    });
});


function deleteUser(id){
    fetch(USER_API + id,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((data)=> data.json())
    .then(()=>{
        getUsers();
    })
}

