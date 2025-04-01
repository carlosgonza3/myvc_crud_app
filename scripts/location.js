const phpPath = "location/"

// Creates and Populates Table when page is loaded
document.addEventListener('DOMContentLoaded',()=> {
    fetch(`${phpPath}fetch_locations.php`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let content = '<table class="data-table" border=1 cellspacing="0" cellpadding="10">';
            content += `<tr> 
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Max Capacity</th>
                            <th>Phone Number</th>
                            <th>Web Address</th>
                            <th>Actions
                            </th>
                        </tr>`;
            data.forEach(location => {
                content += `<tr>
                    <td>${location.LocationId}</td>
                    <td>${location.Name}</td>
                    <td>${location.Type}</td>
                    <td>${location.Address}</td>
                    <td>${location.City}</td>
                    <td>${location.Province}</td>
                    <td>${location.PostalCode}</td>
                    <td>${location.MaxCapacity}</td>
                    <td>${location.PhoneNumbers}</td>
                    <td><a href="${location.WebAddress}" target="_blank">${location.WebAddress}</a></td>
                    <td>
                        <a> <span class="material-symbols-outlined trash" onClick="deleteLocation(${location.LocationId})">delete</span> </a>
                        <a> <span class="material-symbols-outlined edit" onClick="getLocation(${location.LocationId})">edit</span> </a>
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
    formData.append('type', document.getElementById('type').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('province', document.getElementById('province').value);
    formData.append('postal-code', document.getElementById('postal-code').value);
    formData.append('capacity', document.getElementById('capacity').value);
    formData.append('phone-number', document.getElementById('phone-number').value);
    formData.append('web-address', document.getElementById('web-address').value);

    httpPostRequest("add_location.php", formData, "Add");
}

// Deletes a location using the id as identifier
function deleteLocation(targetId) {
    if (!confirm("Are you sure you want to delete this location? This action cannot be undone.")) {
        return;
    }
    const formData = new FormData();
    formData.append('id', targetId);

    httpPostRequest("remove_location.php", formData, "Delete");
}

// Gets Location data using id to populate edit modal
function getLocation(id) {
    console.log(id);    
  fetch(`${phpPath}get_location.php?id=${id}`)
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          document.getElementById('edit-id').value = data.location.LocationId;
          document.getElementById('edit-name').value = data.location.Name;
          document.getElementById('edit-type').value = data.location.Type;
          document.getElementById('edit-address').value = data.location.Address;
          document.getElementById('edit-city').value = data.location.City;
          document.getElementById('edit-province').value = data.location.Province;
          document.getElementById('edit-postal-code').value = data.location.PostalCode;
          document.getElementById('edit-capacity').value = data.location.MaxCapacity;
          document.getElementById('edit-phone').value = data.location.PhoneNumbers;
          document.getElementById('edit-web-address').value = data.location.WebAddress;

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
    formData.append('type', document.getElementById('edit-type').value);
    formData.append('address', document.getElementById('edit-address').value);
    formData.append('city', document.getElementById('edit-city').value);
    formData.append('province', document.getElementById('edit-province').value);
    formData.append('postal-code', document.getElementById('edit-postal-code').value);
    formData.append('phone-number', document.getElementById('edit-phone').value);
    formData.append('web-address', document.getElementById('edit-web-address').value);
    formData.append('capacity', document.getElementById('edit-capacity').value);

    httpPostRequest("update_location.php", formData, "Update");
}

// Generic function that creates and sends an http post request using a given php file and a formData object, action used for error log
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
        console.error(`Error performing action: ${action} in location:`, error);
        alert(`An error occurred while performing action: ${action} in location.`);
    });
}