document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.opacity = "1"; // Make button visible
      scrollToTopBtn.style.pointerEvents = "auto"; // Enable button clicks
    } else {
      scrollToTopBtn.style.opacity = "0"; // Hide button
      scrollToTopBtn.style.pointerEvents = "none"; // Disable button clicks
    }
  };

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mentorList = document.getElementById("mentor-list");

  // Maximum number of unique mentors a user can book
  const MAX_MENTORS = 3;

  const username = localStorage.getItem("currentUsername");
  if (!username) {
    alert("Username is required to book slots!");
    window.location.href = "login.html";
    return;
  }

  const bookedSlotsKey = `bookedSlots_${username}`;
  const bookedSlots = JSON.parse(localStorage.getItem(bookedSlotsKey)) || {};

  function countBookedSlots() {
    return Object.keys(bookedSlots).length;
  }

  // Slot Collision Check
  function hasCollision(selectedSlot) {
    return Object.keys(bookedSlots).some((key) => {
      return key.includes(selectedSlot);
    });
  }

  // To check if the user has already booked a slot with the same mentor
  function hasBookedSlotWithMentor(mentorName) {
    return Object.keys(bookedSlots).some((key) => key.startsWith(mentorName));
  }

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

        if (bookedSlots[mentorSlotKey]) {
          slotButton.classList.add("booked");
          slotButton.style.backgroundColor = "grey";
          slotButton.textContent = `${slot} (booked)`;
        }

        // Event listener to book a slot
        slotButton.addEventListener("click", () => {
          if (slotButton.classList.contains("booked")) {
            alert("This slot is already booked.");
          } else if (countBookedSlots() >= MAX_MENTORS) {
            alert(`You can only book up to ${MAX_MENTORS} different mentors.`);
          } else if (hasCollision(slot)) {
            alert(
              `You already have a booking in the time frame: ${slot}. Please choose a different slot.`
            );
          } else if (hasBookedSlotWithMentor(mentor.Name)) {
            alert(
              `You can only book one slot with ${mentor.Name}. Please choose a different mentor.`
            );
          } else {
            const confirmBooking = confirm(
              `Do you want to book the slot ${slot} with ${mentor.Name}?`
            );
            if (confirmBooking) {
              slotButton.classList.add("booked");
              slotButton.style.backgroundColor = "grey";
              slotButton.textContent = `${slot} (booked)`;

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

  fetch("../public/faculty_data.json")
    .then((response) => response.json())
    .then((data) => {
      renderMentors(data);
    })
    .catch((error) => {
      console.error("Error fetching the mentor data:", error);
    });
});
