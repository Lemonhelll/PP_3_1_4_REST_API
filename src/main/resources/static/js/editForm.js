const editForm = document.getElementById('editForm');
const idField = document.getElementById('edit-id');
const fistNameField = document.getElementById('edit-firstName');
const lastNameField = document.getElementById('edit-lastName');
const emailField = document.getElementById('edit-email');
const ageField = document.getElementById('edit-age');
const loginField = document.getElementById('edit-username');
const passwordField = document.getElementById('edit-password');

async function editFormFill(id) {
    const userByIdURL = '/api/users/' + id;
    let userResponse = await fetch(userByIdURL);
    if (userResponse.ok) {
        let userJSONData =
            await userResponse.json().then(user => {
                idField.value = `${user.id}`;
                fistNameField.value = `${user.firstName}`;
                lastNameField.value = `${user.lastName}`;
                emailField.value = `${user.email}`;
                ageField.value = `${user.age}`;
                loginField.value = `${user.username}`;
                getRolesForEditForm();
            })

    } else {
        alert(`HTTP Error, ${userResponse.status}`)
    }
}

async function updateUser() {
    const url = '/api/update-user/' + idField.value
    let roles = [];

    for (let i = 0; i < editForm.selectRolesName.options.length; i++) {
        if (editForm.selectRolesName.options[i].selected) roles.push({
            id: editForm.selectRolesName.options[i].value
        })
    }

    let user = {
        id: idField.value,
        firstName: fistNameField.value,
        lastName: lastNameField.value,
        email: emailField.value,
        age: ageField.value,
        username: loginField.value,
        password: passwordField.value,
        roles: roles

    }

    const method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    await fetch(url, method).then(() => {
        $('#edit-close-btn').click();
        getAdminPage();
    })
}

async function getRolesForEditForm() {
    const getRolesURL = '/api/get-roles/'
    let rolesResponse = await fetch(getRolesURL);

    if (rolesResponse.ok) {
        let rolesJSONData =
            await rolesResponse.json().then(roles => {
                let roleUser = roles[0];
                let roleAdmin = roles[1];
                editForm.selectRolesName.options[0] = new Option('USER', `${roleUser.id}`)
                editForm.selectRolesName.options[1] = new Option('ADMIN', `${roleAdmin.id}`)

            })
    } else {
        alert(`HTTP Error, ${rolesResponse.status}`)
    }
}