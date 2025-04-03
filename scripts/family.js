const phpPath = "family/"

function httpPostRequest(phpFile, formData, action) {
    fetch(`${phpPath}${phpFile}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            location.reload();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error =>{
        console.error(`Error performing action: ${action} in personnel:`, error);
        alert(`An error occurred while performing action: ${action} in personnel.`);
    });
}


document.addEventListener('DOMContentLoaded',()=> {
    fetch(`${phpPath}fetch_family.php`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let content = '<table class="data-table" border=1 cellspacing="0" cellpadding="10">';
            content += `<tr> 
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>SSN</th>
                            <th>MedicareNum</th>
                            <th>Telephone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Family Record ID</th>
                            <th>Role</th>
                        </tr>`;
            data.forEach(family => {
                content += `<tr>
                    <td>${family.PersonId}</td>
                    <td>${family.FirstName}</td>
                    <td>${family.LastName}</td>
                    <td>${family.DateOfBirth}</td>
                    <td>${family.Gender}</td>
                    <td>${family.SSN}</td>
                    <td>${family.MedicareNum}</td>
                    <td>${family.Telephone}</td>
                    <td>${family.Address}</td>
                    <td>${family.City}</td>
                    <td>${family.Province}</td>
                    <td>${family.PostalCode}</td>
                    <td>${family.FamilyRecordId}</td>
                    <td>
                        <a> <span class="material-symbols-outlined trash" onClick="deleteFamily(${family.PersonId})">delete</span> </a>
                        <a> <span class="material-symbols-outlined edit" onClick="getFamily(${family.PersonId})">edit</span> </a>
                    </td>
                </tr>`;
            });
            content += '</table>';
            document.querySelector('.content-area').innerHTML += content;
        })
        .catch(error => console.error('Error fetching data:', error));
});

function addFamily() {
    const formData = new FormData();
    formData.append('FirstName', document.getElementById('first-name').value);
    formData.append('LastName', document.getElementById('last-name').value);
    formData.append('DateOfBirth', document.getElementById('dob').value);
    formData.append('Gender', document.getElementById('gender').value);
    formData.append('SSN', document.getElementById('ssn').value);
    formData.append('MedicareNum', document.getElementById('medicare').value);
    formData.append('Telephone', document.getElementById('phone').value);
    formData.append('EmailAddress', document.getElementById('email').value);
    formData.append('Address', document.getElementById('address').value);
    formData.append('City', document.getElementById('city').value);
    formData.append('Province', document.getElementById('province').value);
    formData.append('PostalCode', document.getElementById('postal-code').value);

    httpPostRequest("add_family.php", formData, "Add");
}

function updateFamily() {
    const formData = new FormData();
    formData.append('PersonId', document.getElementById('edit-id').value);
    formData.append('FirstName', document.getElementById('edit-first-name').value);
    formData.append('LastName', document.getElementById('edit-last-name').value);
    formData.append('DateOfBirth', document.getElementById('edit-dob').value);
    formData.append('Gender', document.getElementById('edit-gender').value);
    formData.append('SSN', document.getElementById('edit-ssn').value);
    formData.append('MedicareNum', document.getElementById('edit-medicare').value);
    formData.append('Telephone', document.getElementById('edit-phone').value);
    formData.append('EmailAddress', document.getElementById('edit-email').value);
    formData.append('Address', document.getElementById('edit-address').value);
    formData.append('City', document.getElementById('edit-city').value);
    formData.append('Province', document.getElementById('edit-province').value);
    formData.append('PostalCode', document.getElementById('edit-postal-code').value);

    httpPostRequest("update_family.php", formData, "Update");
}

function getFamily(id) {
    console.log(id)
    fetch(`${phpPath}get_family.php?id=` + id)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('edit-id').value = data.personnel.PersonId;
                document.getElementById('edit-first-name').value = data.personnel.FirstName;
                document.getElementById('edit-last-name').value = data.personnel.LastName;
                document.getElementById('edit-dob').value = data.personnel.DateOfBirth;
                document.getElementById('edit-gender').value = data.personnel.Gender;
                document.getElementById('edit-ssn').value = data.personnel.SSN;
                document.getElementById('edit-medicare').value = data.personnel.MedicareNum;
                document.getElementById('edit-phone').value = data.personnel.Telephone;
                document.getElementById('edit-email').value = data.personnel.EmailAddress;
                document.getElementById('edit-address').value = data.personnel.Address;
                document.getElementById('edit-city').value = data.personnel.City;
                document.getElementById('edit-province').value = data.personnel.Province;
                document.getElementById('edit-postal-code').value = data.personnel.PostalCode;
                const editModal = new bootstrap.Modal(document.getElementById('editModal'));
                editModal.show();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error fetching personnel data:', error));
}

function deleteFamily(id) {
    if (!confirm("Are you sure you want to delete this family member? This action cannot be undone.")) {
        return;
    }
    const formData = new FormData();
    formData.append('PersonId', id);
    httpPostRequest("remove_family.php", formData, "Delete");
}