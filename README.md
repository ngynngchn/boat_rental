# BOAT RENTAL DASHBOARD

This is a web application that helps to manage the rental of boats. Users can log in, add new boats, and create reservations. The app provides an overview of all boats and reservations and allows the user to edit or delete existing ones.

## Features

### **Authentication**

- Users can create a new account and log in to the application via email using tokens.
- Two-factor authentication (TFA) is enabled for extra security.

### **Dashboard**

- Displays the total amount of boats and reservations.
- Shows the available boats for the current day.

### **Boats Overview**

- Displays all available boats.
- Allows the user to add a new boat by clicking a button.
- Clicking on a boat leads the user to a detail page with more information about the selected boat.

### **Boat Details**

- Displays all information regarding the boat, including a picture of the boat.
- Provides buttons to delete the boat or edit the boat information.

### **Reservation Overview**

- Displays all reservations.
- Allows the user to add a new reservation by clicking a button.
- Clicking on a reservation leads the user to a detail page with more information about the selected reservation.

### **Reservation Details**

- Displays all information regarding the reservation, including a picture of the booked boat.
- Provides buttons to delete the reservation or edit the reservation information.

### **"Add a Reservation" Page**

- Allows the user to add a new reservation.
- Provides a form to add the name, email, start and end date, boat, and payment status.
  Displays all boats available and when selected, shows disabled and open dates.
- Upon submission, the user is redirected to the reservation overview page.

### **"Add a Boat" Page**

- Allows the user to add a new boat.
- Provides a form to add the name, type, builder, build date, and a method to upload a picture.
- Upon submission, the user is redirected to the boat overview page.

## TECH STACK:

- React.js
- SCSS
- Node.js
- Express.js
- MongoDB
- Mail Mockup with mailtrap.io

## **TODO**:

[ ] Implement validation for each input field
[ ] Add a card which display how many boats are available as of today
[ ] Reservation Form needs disabled dates
[x] Reservation Form should select the selected Boat from the sidebar

[x] BoatCard Images are too small
[x] Boat Form needs to be adjusted
[x] Finish Reservation Details Page
[ ] Implement a Filter in Boat overview to show which boats have reservations
[ ] Boat Details and Reservstion Details Edits should be send to the backend

[ ] Fix Numbers(for boats and bookins), as currently the No. is determined by length of array; so if a booking is deleted, the index will be different
[ ] Add a link in the email to let the user go to the page to enter their code
[ ] Add "Reset Password" function for the user in case he wants to change it or has forgotten it
