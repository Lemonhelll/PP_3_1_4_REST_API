function addNewUserFormOptions() {
    createForm.roles.options[0] = new Option('USER', `1`);
    createForm.roles.options[1] = new Option('ADMIN', `2`);
}

addNewUserFormOptions();