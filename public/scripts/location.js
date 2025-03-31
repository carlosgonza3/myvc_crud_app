// Loads data from database once page is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/location')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let content = '<table class="data-table" border="1" cellspacing="0" cellpadding="10">';
            content += '<tr><th>Id</th><th>Name</th><th>Address</th><th>City</th><th>Province</th><th>Postal Code</th><th>Phone</th><th>Web Address</th><th>Max Capacity</th><th>Actions</th></tr>';
            data.forEach(location => {
                content += `<tr>
                    <td>${location.id}</td>
                    <td>${location.name}</td>
                    <td>${location.address}</td>
                    <td>${location.city}</td>
                    <td>${location.province}</td>
                    <td>${location.postal_code}</td>
                    <td>${location.phone}</td>
                    <td><a href="${location.web_address}" target="_blank">${location.web_address}</a></td>
                    <td>${location.max_capacity}</td>
                    <td>
                        <a><span class="material-symbols-outlined trash" onClick="deleteLocation(${location.id})">delete</span></a>
                        <a><span class="material-symbols-outlined edit" onClick="editLocation(${location.id})">edit</span></a>
                    </td>
                </tr>`;
            });
            content += '</table>';
            document.querySelector('.content-area').innerHTML += content;
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Adds a location using data from the Modal
function addLocation() {
    const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        postal_code: document.getElementById('postal-code').value,
        phone_number: document.getElementById('phone-number').value,
        web_address: document.getElementById('web-address').value,
        capacity: parseInt(document.getElementById('capacity').value)
    };

    fetch('/api/location/add', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Location added successfully!');
            location.reload();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding location:', error);
        alert('An error occurred while adding the location.');
    });
}

// Deletes location using id as parameter
function deleteLocation(id) {
    if (!confirm('Are you sure you want to continue?')) {
        return;
    }
    fetch('/api/location/delete', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload();
        })
        .catch(error => console.error('Error deleting location:', error));
}

// Gets Location data using id to populate edit modal
function editLocation(id) {
    fetch(`/api/location/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching location data.');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            document.getElementById('edit-id').value = data.id;
            document.getElementById('edit-name').value = data.name;
            document.getElementById('edit-address').value = data.address;
            document.getElementById('edit-city').value = data.city;
            document.getElementById('edit-province').value = data.province;
            document.getElementById('edit-postal-code').value = data.postal_code;
            document.getElementById('edit-phone-number').value = data.phone;
            document.getElementById('edit-web-address').value = data.web_address;
            document.getElementById('edit-capacity').value = data.max_capacity;

            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        } else {
            alert('Error: Location not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching location data:', error);
        alert('An error occurred while fetching location data.');
    });
}

// Updates a location information from form data in Edit Modal
function updateLocation() {
    const locationData = {
        id: document.getElementById('edit-id').value,
        name: document.getElementById('edit-name').value,
        address: document.getElementById('edit-address').value,
        city: document.getElementById('edit-city').value,
        province: document.getElementById('edit-province').value,
        postal_code: document.getElementById('edit-postal-code').value,
        phone_number: document.getElementById('edit-phone-number').value,
        web_address: document.getElementById('edit-web-address').value,
        capacity: parseInt(document.getElementById('edit-capacity').value)
    };

    fetch('/api/location/update', {
        method: 'POST',
        body: JSON.stringify(locationData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            editModal.hide();
            location.reload();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error updating location:', error);
        alert('An error occurred while updating the location.');
    });
}

