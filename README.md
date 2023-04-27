# BOAT RENTAL

## Features

- Navigation
  - **Dashboard**
    - Display total amount of boats
    - Display total amounts of reservations
    - Display available boats for today
  - **Boats Overview**
    - Display of all boats
    - Button that leads to "Add a boat page"
  - **Reservation Overview**
    - Display of all reservations
    - Button that leads to "Add a reservation"

### **"Add a reservation" page**

- form to add name, email, start and end date, boat and status about payment
- component on the side that displays all boats available and when selected show disabled and open dates
- upon submit the user should be lead back to the reservation overview page

### **"Add a boat" page**

- form to add name, type, builder, build date, and a method to upload a picture
- implement validation for each input field
- upon submit the user should be lead back to the reservation overview page

### **Details Page**

- details about boat or reservation can be viewed, edited and deleted

## TODO:

[ ] Add a card which display how many boats are available as of today
[ ] Reservation Form needs disabled dates
[x] Reservation Form should select the selected Boat from the sidebar

[x] BoatCard Images are too small
[x] Boat Form needs to be adjusted
[x] Finish Reservation Details Page
[ ] Implement a Filter in Boat overview to show which boats have reservations

[ ] Fix Numbers(for boats and bookins), as currently the No. is determined by length of array;
so if a booking is deleted, the index will be different
