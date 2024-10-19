# SVMTech888

Pixel Wizard, a dynamic web development event, brings together tech enthusiasts and coding wizards for an immersive experience in the digital realm. Designed to showcase the latest trends and innovations in web development, the event offers a platform for participants to hone their skills, exchange ideas, and collaborate on cutting-edge projects.

# SVMTech888 Project

Welcome to the SVMTech888 project! This project is a web application for booking slots with mentors, managing bookings, and providing relevant information.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Directory Structure](#directory-structure)
- [How to Run the Project](#how-to-run-the-project)
- [Usage](#usage)
- [License](#license)

## Features

- **User Authentication**: Allows users to sign up and log in to manage their bookings securely.
- **Slot Booking**: Users can view available slots and book them with their chosen mentor.
- **View Booked Slots**: Users can see their currently booked slots and cancel them if necessary.
- **Booking Constraints**: Ensures that a user cannot book the same slot as another user, maintaining the integrity of the booking system.
- **FAQs**: A dedicated page for frequently asked questions to assist users in navigating the application.

## Prerequisites

Before you begin, ensure you have the following installed:

- A modern web browser (e.g., Chrome, Firefox)
- A code editor (e.g., Visual Studio Code, Sublime Text)
- (Optional) A local server environment (like XAMPP or MAMP) if you want to serve files over HTTP.

## Directory Structure

This project has the following directory structure:

````
SVMTech888/
├── htmlFiles/
│   ├── booking.html
│   ├── bookedSlots.html
│   ├── faqs.html
│   ├── login.html
│   ├── signup.html
├── public/
│   ├── faculty_data.json
├── scriptFiles/
│   ├── booking.js
│   ├── bookedSlots.js
│   ├── login.js
│   ├── signup.js
├── stylingFiles/
│   ├── index.css
│   ├── bookedSlots.css
│   ├── faqs.css
│   ├── login.css
│   ├── signup.css
│   ├── navbar.css
├── README.md


## How to Run the Project

1. **Clone the Repository** (if applicable):
   If you haven't already cloned the project, you can do so using:
   ```bash
   git clone https://github.com/mannubhai1/SVMTech888

2. **Navigate to the Project Directory**:
    You can use the `cd` command to move into the project directory:
    ```bash
    cd SVMTech888/htmlFiles

3. **Open the Project Files**:
    You can open the project files in a code editor like Visual Studio Code using:
    ```bash
    code .

4. **Run the Project**:
    You can run the project by opening the `singup.html` file in a web browser.


## Usage

### User Registration
- **Sign Up**: Navigate to the signup page to create a new account. Fill in the required details, and upon successful registration, you will be redirected to the login page.

### User Login
- **Log In**: Use your credentials to log in via the login page. Successful login grants access to your dashboard, where you can manage your bookings.

### Booking Your Slots
- **Book a Slot**: On the booking page, view the available slots for different mentors. Select a slot that works for you and confirm your booking. The system checks for existing bookings and prevents double bookings.

### Booking Constraints
- **No Double Booking**: Each user can only book slots based on their own availability, ensuring fair access to mentors.

### Booked Slots
- **View Booked Slots**: Go to the booked slots page to see all the slots you have reserved. You can cancel a booking if needed.

### FAQs
- **Frequently Asked Questions**: Access the FAQs page for common queries regarding the application, booking process, and user support.
````
