
# Lab Management System



Welcome to the Lab Management System repository! This web project aims to provide a comprehensive solution for managing labs, lab reports, and lab-related problems. With this system, you can easily add, edit, and delete labs, search for lab reports, mark problems as done, and much more.

## Features

- Add new labs to the system.
- Delete existing labs from the database.
- Edit lab details such as name, location.
- Search for specific lab reports or lab using id or name.
- Mark lab-related problems as resolved or done.
- View statistics of the system at home page.
- Add new pc to lab.

## Getting Started

Follow these steps to set up and run the Lab Management System on your local machine.

### Prerequisites

- Python 3.x
- Git (optional)

### Installation

1. Clone the repository to your local machine using Git:

   ```
   git clone https://github.com/your-username/lab-management-system.git
   ```

   Alternatively, you can download the repository as a ZIP file and extract it.

2. Navigate to the project directory:

   ```
   cd lab-management-system
   ```

3. Create a virtual environment:

   For Windows:

   ```
   python -m venv venv
   venv\Scripts\activate
   ```

   For macOS and Linux:

   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

4. Install the required libraries:

   ```
   pip install -r requirements.txt
   ```

### Running the Server

1. Make migrations for the database:

   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

2. Start the development server:

   ```
   python manage.py runserver
   ```

3. Access the Lab Management System in your web browser at `http://127.0.0.1:8000/`.

## Usage

- Navigate through the web interface to access different features and functionalities.
- Use the provided options to add, edit, or delete labs.
- Search for lab reports and manage lab-related problems.
- Monitor lab statistics on the home page.

## Contributors

This project was developed by
- [Ahmed M. Hany](https://github.com/ahmedmo112)
- [Mohamed Ehab](https://github.com/MoEhab27) (UI/UX Designer)
- [Ahmed Reda](https://github.com/ahmedreda153)
- [Shahd Salah](https://github.com/Unicorn2105)
- [Salma Mohamed](https://github.com/salma12004)
- [Shrouk Tarek](https://github.com/shroukk7)

## Screenshots

![Screenshot 2023-08-14 043550](https://github.com/ahmedmo112/lab-managment-system/assets/78311079/390f6c30-4c2e-4bb9-a40c-0309c77bb68c)
![Screenshot 2023-08-14 043605](https://github.com/ahmedmo112/lab-managment-system/assets/78311079/04c42fbe-1cf1-40c1-8e6e-5d2aab041d4b)
![Screenshot 2023-08-14 043636](https://github.com/ahmedmo112/lab-managment-system/assets/78311079/6ca22c49-aec7-4097-b993-403a4542df32)
![Screenshot 2023-08-14 043654](https://github.com/ahmedmo112/lab-managment-system/assets/78311079/4bc75003-7cd1-409c-959c-79202724c2ad)
![Screenshot 2023-08-14 043709](https://github.com/ahmedmo112/lab-managment-system/assets/78311079/14dc6765-3fc5-48a7-b265-b3a56272e9f8)




