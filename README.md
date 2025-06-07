🧾 AuctionCRM
A full-stack CRUD practice app using React and Django REST — themed as an auction client management system.

🔍 Overview
AuctionCRM is a mock CRM-style web app built to practice full-stack development using React for the front end and Django REST Framework for the backend. It allows basic Create, Read, Update, and Delete operations on client and auction item data, simulating workflows used in inventory and sales management systems.

🛠️ Features
📋 Client Management – Add, edit, delete client records

📦 Auction Inventory – Manage items up for bid

🔁 RESTful Integration – Frontend communicates with a Django REST API

🔐 CORS Configured – Cross-origin requests handled via django-cors-headers

🧪 Learning-Friendly Setup – Ideal for developers practicing full-stack CRUD workflows

💻 Tech Stack
Frontend:
React.js (v18)
Axios
React Router
FontAwesome Icons
CSS3
Backend:
Django (3.2.12)
Django REST Framework (DRF)
django-cors-headers
jsonfield for flexible model fields

🚀 Getting Started
🧩 Clone Both Repos
bash
# Frontend
git clone https://github.com/AshB4/AuctionCRM.git
cd AuctionCRM
npm install

bash
# Backend (in a separate terminal)
git clone https://github.com/AshB4/BackendForCrm.git
cd BackendForCrm
pip install -r requirements.txt
python manage.py runserver
⚠️ Make sure the Django server is running at http://localhost:8000 or update Axios endpoints if different.

🔧 Frontend Environment Variables
You can optionally create a .env file for the frontend to configure API URLs:

env
REACT_APP_API_BASE_URL=http://localhost:8000
▶️ Run the Frontend
bash
npm start
The app will open at http://localhost:3000

📌 Project Status
Actively maintained as a CRUD sandbox and full-stack learning project. Could be extended with:

Authentication with JWT

Search, filter, and pagination

📄 License
MIT License
