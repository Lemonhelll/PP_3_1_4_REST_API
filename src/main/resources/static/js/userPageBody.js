const url = '/api/user'

async function getUserPage() {
    let response = await fetch(url);

    if (response.ok) {
        let userJSONData = await response.json();
        fillTableBody(userJSONData);
    } else {
        alert(`HTTP Error, ${response.status}`)
    }
}

function fillTableBody(userData) {
    let tableRow = document.createElement("tr");
    let roleNames = []

    for (const role of userData.roles) {
        roleNames.push(" " + role.name.toString()
            .replaceAll('ROLE_', ''));

    }

    tableRow.innerHTML = `
                <tr>
                    <td class="text-center"> ${userData.firstName} </td>
                    <td class="text-center"> ${userData.lastName} </td>
                    <td class="text-center"> ${userData.email} </td>
                    <td class="text-center"> ${userData.age} </td>
                    <td class="text-center"> ${roleNames} </td>
                </tr>`
    document.getElementById(`tbody`)
        .append(tableRow);
}
getUserPage();