# MediCare — Online Doctor Appointment System

MediCare is a Django-based online doctor appointment system that allows patients to find doctors, view their specialties and availability, and book appointments online.

The project also includes separate patient and doctor panels, appointment scheduling, OTP verification, payment integration, background tasks with Celery, and a PostgreSQL database.

## ✨ Features

- Patient registration and authentication
- OTP verification via SMS
- Password reset
- Remember me functionality
- Doctor registration and profile management
- Doctor and patient dashboards
- Doctor specialty management
- Doctor search and filtering
- Province and gender filters
- Doctor favorites
- Doctor ratings and comments
- Weekly doctor schedules
- Multiple scheduling periods per day
- Schedule exceptions and unavailable dates
- Automatic appointment slot generation
- Appointment booking and cancellation
- Appointment status management
- Automatic appointment reminders
- Background tasks with Celery
- Periodic tasks with Celery Beat
- Redis message broker
- PostgreSQL database
- Payment integration
- FAQ and website rules
- Contact us
- Responsive Persian RTL interface

## 🛠️ Technologies

- Python
- Django
- PostgreSQL
- Redis
- Celery
- Celery Beat
- Tailwind CSS
- JavaScript
- AJAX
- Docker
- Docker Compose

## 📦 Project Structure

```text
doctor-appointment-system/
│
├── account_module/
├── doctors_module/
├── patient/
├── payment_module/
├── public_module/
├── home/
│
├── doctor_appointment_system/
│   ├── settings.py
│   ├── urls.py
│   ├── celery.py
│   └── ...
│
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

## 🚀 Run the Project with Docker

### Prerequisites

Make sure the following are installed:

- Docker
- Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/Amirmhdp/doctor-appointment-system.git
cd doctor-appointment-system
```

### 2. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
DB_NAME=doctor_appointment_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=db
DB_PORT=5432

CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

KAVENEGAR_API_KEY=your_kavenegar_api_key
KAVENEGAR_SENDER=your_kavenegar_sender
```

Replace the placeholder values with your own configuration.

> Never commit the `.env` file to the repository.

### 3. Build and start the containers

```bash
docker compose up --build
```

The following services will be started:

- Django
- PostgreSQL
- Redis
- Celery Worker
- Celery Beat

The application will be available at:

```text
http://localhost:8000
```

### 4. Apply migrations

Open another terminal and run:

```bash
docker compose exec web python manage.py migrate
```

### 5. Create a superuser

```bash
docker compose exec web python manage.py createsuperuser
```

The Django admin panel is available at:

```text
http://localhost:8000/admin/
```

### 6. Load initial data

If the `seed_data` management command is available:

```bash
docker compose exec web python manage.py seed_data
```

## 🔧 Useful Docker Commands

### Check running containers

```bash
docker compose ps
```

### View all logs

```bash
docker compose logs
```

### View Django logs

```bash
docker compose logs web
```

### View Celery Worker logs

```bash
docker compose logs celery_worker
```

### View Celery Beat logs

```bash
docker compose logs celery_beat
```

### View Redis logs

```bash
docker compose logs redis
```

### Stop the containers

```bash
docker compose down
```

### Stop containers and remove database volume

```bash
docker compose down -v
```

> Removing the volume permanently deletes the PostgreSQL data stored by Docker.

## 🧑‍💻 Django Management Commands

Django management commands can be executed inside the web container.

### Create migrations

```bash
docker compose exec web python manage.py makemigrations
```

### Apply migrations

```bash
docker compose exec web python manage.py migrate
```

### Create a superuser

```bash
docker compose exec web python manage.py createsuperuser
```

### Run the seed data command

```bash
docker compose exec web python manage.py seed_data
```

## 🐳 Docker Services

| Service | Description |
|---|---|
| `web` | Django application |
| `db` | PostgreSQL database |
| `redis` | Redis message broker |
| `celery_worker` | Executes background Celery tasks |
| `celery_beat` | Schedules periodic Celery tasks |

## ⚙️ Background Tasks

Celery is used to execute background tasks asynchronously.

The project uses:

- Redis as the message broker
- Celery Worker for executing tasks
- Celery Beat for scheduling periodic tasks

For example, appointment reminder tasks can be scheduled and executed automatically by Celery.

## 🔐 Environment Variables

Sensitive configuration is stored in environment variables instead of being hard-coded into the application.

Important environment variables include:

```text
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
CELERY_BROKER_URL
CELERY_RESULT_BACKEND
KAVENEGAR_API_KEY
KAVENEGAR_SENDER
```

## 📄 License

This project is developed for educational and portfolio purposes.