document.addEventListener("DOMContentLoaded", () => {
  const mentorList = document.getElementById("mentor-list");

  // Maximum number of slots a user can book
  const MAX_BOOKINGS = 3; // Change this value to your desired limit

  // Retrieve the username from localStorage
  const username = localStorage.getItem("currentUsername");
  if (!username) {
    alert("Username is required to book slots!");
    window.location.href = "login.html";
    return; // Stop execution if no username is found
  }

  // Load booked slots from local storage for the specific user
  const bookedSlotsKey = `bookedSlots_${username}`;
  const bookedSlots = JSON.parse(localStorage.getItem(bookedSlotsKey)) || {};

  // Function to count the total booked slots for the user
  function countBookedSlots() {
    return Object.keys(bookedSlots).length;
  }

  // Function to render mentors and time slots
  function renderMentors(data) {
    mentorList.innerHTML = "";
    data.forEach((mentor) => {
      const mentorCard = document.createElement("div");
      mentorCard.classList.add("mentor-card");

      const mentorTopDiv = document.createElement("div");
      const mentorImage = document.createElement("img");
      mentorTopDiv.appendChild(mentorImage);
      mentorImage.src = mentor.ImageURL;
      mentorImage.alt = `${mentor.Name}'s picture`;
      mentorImage.classList.add("mentor-image");

      const mentorName = document.createElement("h3");
      mentorTopDiv.appendChild(mentorName);
      mentorTopDiv.classList.add("mentor-top");
      mentorName.textContent = mentor.Name;

      const mentorBottomDiv = document.createElement("div");
      mentorBottomDiv.classList.add("mentor-bottom");

      // Mentor Experience
      const mentorExperience = document.createElement("p");
      mentorBottomDiv.appendChild(mentorExperience);
      const experienceText = `Experience: ${mentor.Qualifications} years`;

      const maxLength = 80;
      if (experienceText.length > maxLength) {
        const truncatedText = experienceText.slice(0, maxLength) + "...";
        mentorExperience.textContent = truncatedText;

        const readMoreLink = document.createElement("span");
        readMoreLink.textContent = " Read more";
        readMoreLink.style.color = "blue";
        readMoreLink.style.cursor = "pointer";
        readMoreLink.addEventListener("click", () => {
          mentorExperience.textContent = experienceText;
          readMoreLink.style.display = "none";
        });

        mentorExperience.appendChild(readMoreLink);
      } else {
        mentorExperience.textContent = experienceText;
      }

      // Time Slots
      const timeSlotsDiv = document.createElement("div");
      mentorBottomDiv.appendChild(timeSlotsDiv);
      timeSlotsDiv.classList.add("time-slots");
      const slots = [
        "1 PM - 2 PM",
        "2 PM - 3 PM",
        "3 PM - 4 PM",
        "4 PM - 5 PM",
      ];

      slots.forEach((slot) => {
        const slotButton = document.createElement("button");
        slotButton.classList.add("time-slot");
        slotButton.textContent = slot;
        slotButton.dataset.slot = slot; // Store the slot info in a data attribute

        // Unique key for each mentor-slot combination
        const mentorSlotKey = `${mentor.Name}-${slot}`;

        // Check if the slot is already booked by the user
        if (bookedSlots[mentorSlotKey]) {
          slotButton.classList.add("booked");
          slotButton.style.backgroundColor = "grey";
          slotButton.textContent = `${slot} (booked)`;
        }

        // Handle booking a slot
        slotButton.addEventListener("click", () => {
          if (slotButton.classList.contains("booked")) {
            alert("This slot is already booked.");
          } else if (countBookedSlots() >= MAX_BOOKINGS) {
            alert(`You can only book up to ${MAX_BOOKINGS} slots.`);
          } else {
            // Confirmation dialog
            const confirmBooking = confirm(
              `Do you want to book the slot ${slot} with ${mentor.Name}?`
            );
            if (confirmBooking) {
              // Mark as booked
              slotButton.classList.add("booked");
              slotButton.style.backgroundColor = "grey";
              slotButton.textContent = `${slot} (booked)`;

              // Store the booking in local storage for the specific user
              bookedSlots[mentorSlotKey] = true;
              localStorage.setItem(bookedSlotsKey, JSON.stringify(bookedSlots));
            }
          }
        });

        timeSlotsDiv.appendChild(slotButton);
      });

      mentorCard.appendChild(mentorTopDiv);
      mentorCard.appendChild(mentorBottomDiv);
      mentorList.appendChild(mentorCard);
    });
  }

  // Fetch the mentor data
  fetch("../public/faculty_data.json")
    .then((response) => response.json())
    .then((data) => {
      renderMentors(data);
    })
    .catch((error) => {
      console.error("Error fetching the mentor data:", error);
    });
});
