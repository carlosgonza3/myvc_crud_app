
## Initialization Procedure

### 1. Configure Local Database Connection
- Establish a local database using **MySQL**.
- Collect and document the following database credentials:
  - **Host** – Database host address
  - **User** – Database username
  - **Password** – Database password
  - **Database Name** – Name of the database to be used

### 2. Execute SQL Script and Create Database Schema
- Launch your preferred SQL editor and connect to the database.
- Execute the following command, ensuring that `nameOfDatabase` is replaced with the actual name of the created database:
  ```sql
  USE nameOfDatabase;
  ```
- Copy and paste the SQL commands provided in `./MySQL/dbSetup.sql`.
- Run the script to create the required database schema.

### 3. Create Environment Configuration File
- Navigate to the project’s root directory and create a new file named `.env`.
- Add the following entries to the `.env` file, replacing placeholders with the appropriate values:
  ```
  DB_HOST=Host
  DB_USER=User
  DB_PASSWORD=Password
  DB_NAME=DatabaseName
  ```

### 4. Start Server
- Open the Terminal application and navigate to the root directory of the project.
- Run the initialization command:
  ```
  PHP -S localhost:8000
  ```
- Open a web browser and search for:
  ```
  http://localhost:8000/index.html
  ```

### 5. Enjoy the MYVC Management System
