
This project works in conjunction with the BackendForCRM, a Django-based backend. Please refer to the BackendForCRM repository for setup and running instructions.

### Backend (BackendForCRM) README

```markdown
# BackendForCRM

This repository contains the backend for the AuctionCRM application, built using Django with SQLite3 and Django Rest Framework. 

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Running the Backend Server](#running-the-backend-server)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [License](#license)
7. [Frontend Information](#frontend-information)

## Prerequisites
- Python (v3.8 or later)
- pip (latest version)
- virtualenv (latest version)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AshB4/BackendForCRM.git
cd BackendForCRM
2. Create a Virtual Environment
bash
Copy code
python -m venv venv
3. Activate the Virtual Environment
On Windows:
bash
Copy code
venv\Scripts\activate
On macOS and Linux:
bash
Copy code
source venv/bin/activate
4. Install Dependencies
bash
Copy code
pip install -r requirements.txt
5. Apply Migrations
bash
Copy code
python manage.py migrate
6. Create a Superuser
bash
Copy code
python manage.py createsuperuser
Follow the prompts to create a superuser account.

Running the Backend Server
1. Start the Development Server
bash
Copy code
python manage.py runserver
The backend will run on http://localhost:8000.

Alternative Download Method
If you prefer to download the backend as a ZIP file:

Download the ZIP file:
Go to the GitHub repository for BackendForCRM and click on the "Code" button. Select "Download ZIP" to download the project as a ZIP file.

Extract the ZIP file:
Once the ZIP file is downloaded, extract its contents to a folder on your computer.

Navigate to the Project Folder:
Open a terminal or command prompt and navigate to the folder where the BackendForCRM project is located.

Install Requirements and Start Server:
Follow steps 2-7 as listed above to activate the virtual environment, install dependencies, apply migrations, create a superuser, and start the development server.

Project Structure
bash
Copy code
BackendForCRM/
├── be_crm/
├── env/
├── mybe/
├── staticfiles/
├── db.sqlite3
├── info.py
├── initial_data.json
├── manage.py
├── requirements.txt
├── seed_db.py
└── README.md
Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.

License
This project is licensed under the MIT License. See the LICENSE file for details.
