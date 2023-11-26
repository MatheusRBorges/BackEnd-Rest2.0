let users = [];

function addUser(event) {
  event.preventDefault();
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name !== "" && email !== "") {
    const user = {
      name: name,
      email: email
    };

    users.push(user);
    nameInput.value = "";
    emailInput.value = "";

    displayUsers();
  }
}

function displayUsers() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = tableBody.insertRow();

    const nameCell = row.insertCell(0);
    nameCell.textContent = user.name;

    const emailCell = row.insertCell(1);
    emailCell.textContent = user.email;

    const actionsCell = row.insertCell(2);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = () => deleteUser(index);

    actionsCell.appendChild(deleteButton);
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  displayUsers();
}

const form = document.getElementById("userForm");
form.addEventListener("submit", addUser);

displayUsers();