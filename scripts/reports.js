const phpPath = "reports/"

//Global Function

function reset(queryNum) {
    document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: none;');
    document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: flex;');
    document.getElementById(`results-${queryNum}`).innerHTML = '';
}

// Query 7 Functions

function query7(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Location Id</th>
                            <th>Location Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Phone Number</th>
                            <th>Web Address</th>
                            <th>Type</th>
                            <th>Max Capacity</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.LocationId}</td>
                    <td>${entry.LocationName}</td>
                    <td>${entry.Address}</td>
                    <td>${entry.City}</td>
                    <td>${entry.Province}</td>
                    <td>${entry.PostalCode}</td>
                    <td>${entry.PhoneNumbers}</td>
                    <td>${entry.WebAddress}</td>
                    <td>${entry.Type}</td>
                    <td>${entry.MaxCapacity}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}


// Query 8 Functions

function query8(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Location Name</th>
                            <th>Club Member Record Id</th>
                            <th>Club Member First Name</th>
                            <th>Club Member Last Name</th>
                            <th>Date of Birth</th>
                            <th>SSN</th>
                            <th> Medicare Number</th>
                            <th>Telephone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Secondary Family Member First Name</th>
                            <th>Secondary Family Member Last Name</th>
                            <th>Secondary Family Member Telephone</th>
                            <th>Secondary Family Member Relationship Type</th
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.LocationName}</td>
                    <td>${entry.ClubMemberRecordId}</td>
                    <td>${entry.ClubMemberFirstName}</td>
                    <td>${entry.ClubMemberLastName}</td>
                    <td>${entry.DateOfBirth}</td>
                    <td>${entry.SSN}</td>
                    <td>${entry.MedicareNum}</td>
                    <td>${entry.Telephone}</td>
                    <td>${entry.Address}</td>
                    <td>${entry.City}</td>
                    <td>${entry.Province}</td>
                    <td>${entry.PostalCode}</td>
                    <td>${entry.SecondaryFirstName}</td>
                    <td>${entry.SecondaryLastName}</td>
                    <td>${entry.SecondaryTelephone}</td>
                    <td>${entry.RelationshipType}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 9 Functions

function query9(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Session Date</th>
                            <th>Session Time</th>
                            <th>Session Address</th>
                            <th>Session Type</th>
                            <th>Team Name</th>
                            <th>Coach First Name</th>
                            <th> Choach Last Name</th>
                            <th>Score Team A</th>
                            <th>Score Team B</th>
                            <th>Player First Name</th>
                            <th>Player Last Name</th>
                            <th>Player Role</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.SessionDate}</td>
                    <td>${entry.SessionTime}</td>
                    <td>${entry.SessionAddress}</td>
                    <td>${entry.SessionType}</td>
                    <td>${entry.TeamName}</td>
                    <td>${entry.CoachFirstName}</td>
                    <td>${entry.CoachLastName}</td>
                    <td>${entry.scoreteamA}</td>
                    <td>${entry.scoreteamB}</td>
                    <td>${entry.PlayerFirstName}</td>
                    <td>${entry.PlayerLastName}</td>
                    <td>${entry.PlayerRole}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 10 Function

function query10(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Club Member Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.ClubMemberRecordId}</td>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 11 Function

function query11(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Location</th>
                            <th>Training Sessions</th>
                            <th>Players Trained</th>
                            <th>Game Sessions</th>
                            <th>Players in Games</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.LocationName}</td>
                    <td>${entry.TotalTrainingSessions}</td>
                    <td>${entry.TrainingPlayerCount}</td>
                    <td>${entry.TotalGameSessions}</td>
                    <td>${entry.GamePlayerCount}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 12 Function

function query12(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Club Member ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Join Date</th>
                            <th>Telephone</th>
                            <th>Email Address</th>
                            <th>Location Name</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.ClubMemberRecordId}</td>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.Age}</td>
                    <td>${entry.Join_date}</td>
                    <td>${entry.Telephone}</td>
                    <td>${entry.EmailAddress}</td>
                    <td>${entry.LocationName}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 13 and 14 Function
function query13_14(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Club Member ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Telephone</th>
                            <th>Email Address</th>
                            <th>Location Name</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.ClubMemberRecordId}</td>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.Age}</td>
                    <td>${entry.Telephone}</td>
                    <td>${entry.EmailAddress}</td>
                    <td>${entry.LocationName}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 15 Function
function query15(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Telephone</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.Telephone}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 16 Function
function query16(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>Club Member ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Telephone</th>
                            <th>Email Address</th>
                            <th>Location Name</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.ClubMemberRecordId}</td>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.Age}</td>
                    <td>${entry.Telephone}</td>
                    <td>${entry.EmailAddress}</td>
                    <td>${entry.LocationName}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 17 Function
function query17(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.TreasurerStartDate}</td>
                    <td>${entry.TreasurerEndDate}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}

// Query 18 Function
function query18(queryNum) {
    fetch(`${phpPath}query${queryNum}.php`)
        .then(response => response.json())
        .then(data => {
                let table = document.getElementById(`results-${queryNum}`);
                table.innerHTML += `
                        <tr> 
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Telephone</th>
                            <th>Email Address</th>
                        </tr>`;
            data.forEach(entry => {
                table.innerHTML += `<tr>
                    <td>${entry.FirstName}</td>
                    <td>${entry.LastName}</td>
                    <td>${entry.Telephone}</td>
                    <td>${entry.EmailAddress}</td>
                </tr>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
        document.getElementById(`get-report-${queryNum}`).setAttribute('style', 'display: none;');
        document.getElementById(`get-report-${queryNum}-reset`).setAttribute('style', 'display: flex;');
}