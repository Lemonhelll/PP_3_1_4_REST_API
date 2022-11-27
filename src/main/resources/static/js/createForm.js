const createUserURL = '/api/create-user/'
const createForm = document.getElementById('createForm');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let roles = []

    for (let i = 0; i < createForm.roles.options.length; i++) {
        if (createForm.roles.options[i].selected) roles.push({
            id: createForm.roles.options[i].value,
            name: "ROLE_" + createForm.roles.options[i].text
        })
    }

    let user = {
        firstName: $('#add-user-first-name').val(),
        lastName: $('#add-user-last-name').val(),
        age: $('#add-user-age').val(),
        email: $('#add-user-email').val(),
        username: $('#add-user-username').val(),
        password: $('#add-user-password').val(),
        roles: roles
    }

    const method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    fetch(createUserURL, method)
        .then(() => {
            $('#createForm').trigger("reset");
            $(`.nav-tabs a[href="#tab-1"]`).tab("show");
            getAdminPage();
        })
})