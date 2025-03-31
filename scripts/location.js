
// Creates and Populates Table when page is loaded
document.addEventListener('DOMContentLoaded',()=> {
    fetch('php/fetch_locations.php')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let content = '<table class="data-table" border=1 cellspacing="0" cellpadding="10">';
            content += '<tr><th>Id</th><th>Name</th><th>Address</th><th>City</th><th>Province</th><th>Postal Code</th><th>Phone</th><th>Web Address</th><th>Max Capacity</th> <th>Actions</th></tr>';
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
                    <a> <span class="material-symbols-outlined trash" onClick="deleteLocation(${location.id})">delete</span> </a>
                    <a> <span class="material-symbols-outlined edit" onClick="editLocation(${location.id})">edit</span> </a>

                    </td>
                </tr>`;
            });
            content += '</table>';
            document.querySelector('.content-area').innerHTML += content;
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Adds a location from form data in Create Modal
function addLocation() {
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('province', document.getElementById('province').value);
    formData.append('postal_code', document.getElementById('postal-code').value);
    formData.append('phone_number', document.getElementById('phone-number').value);
    formData.append('web_address', document.getElementById('web-address').value);
    formData.append('capacity', document.getElementById('capacity').value);

    httpPostRequest("add_location.php", formData, "Add");
}

// Deletes a location using the id as identifier
function deleteLocation(targetId) {
    if (!confirm("Are you sure you want to continue?")) {
        return; 
    }
    const formData = new FormData();
    formData.append('id', targetId);

    httpPostRequest("remove_location.php", formData, "Delete");
}

// Gets Location data using id to populate edit modal
function editLocation(id) {
  fetch(`php/get_location.php?id=${id}`)
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          document.getElementById('edit-id').value = data.location.id;
          document.getElementById('edit-name').value = data.location.name;
          document.getElementById('edit-address').value = data.location.address;
          document.getElementById('edit-city').value = data.location.city;
          document.getElementById('edit-province').value = data.location.province;
          document.getElementById('edit-postal-code').value = data.location.postal_code;
          document.getElementById('edit-phone-number').value = data.location.phone;
          document.getElementById('edit-web-address').value = data.location.web_address;
          document.getElementById('edit-capacity').value = data.location.max_capacity;

          const editModal = new bootstrap.Modal(document.getElementById('editModal'));
          editModal.show();
      } else {
          alert('Error fetching location: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error fetching location data:', error);
      alert('An error occurred while fetching location data.');
  });
}

// Updates a location information from form data in Edit Modal
function updateLocation() {
    const formData = new FormData();
    formData.append('id', document.getElementById('edit-id').value);
    formData.append('name', document.getElementById('edit-name').value);
    formData.append('address', document.getElementById('edit-address').value);
    formData.append('city', document.getElementById('edit-city').value);
    formData.append('province', document.getElementById('edit-province').value);
    formData.append('postal_code', document.getElementById('edit-postal-code').value);
    formData.append('phone_number', document.getElementById('edit-phone-number').value);
    formData.append('web_address', document.getElementById('edit-web-address').value);
    formData.append('capacity', document.getElementById('edit-capacity').value);

    httpPostRequest("update_location.php", formData, "Update");
}

// Generic function that creates and sends an http post request using a given php file and a formData object, action used for error log
function httpPostRequest(phpFile, formData, action) {
    fetch(`php/${phpFile}`, {
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
        console.error(`Error performing action: ${action} in location:`, error);
        alert(`An error occurred while performing action: ${action} in location.`);
    });
}