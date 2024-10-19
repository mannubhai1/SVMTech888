document.addEventListener("DOMContentLoaded", () => {
  const bookedSlotsList = document.getElementById("booked-slots-list");

  const username = localStorage.getItem("currentUsername");
  if (!username) {
    alert("You need to log in to view your booked slots.");
    window.location.href = "login.html";
    return;
  }

  const bookedSlotsKey = `bookedSlots_${username}`;
  const bookedSlots = JSON.parse(localStorage.getItem(bookedSlotsKey)) || {};

  function renderBookedSlots() {
    bookedSlotsList.innerHTML = "";
    if (Object.keys(bookedSlots).length === 0) {
      bookedSlotsList.innerHTML = "<p>No booked slots found.</p>";
      return;
    }

    fetch("../public/faculty_data.json") // Update with the correct path to your JSON file
      .then((response) => response.json())
      .then((mentors) => {
        Object.keys(bookedSlots).forEach((key) => {
          const [mentorName, slot] = key.split("-");
          const mentor = mentors.find((m) => m.Name === mentorName);

          if (mentor) {
            const mentorCard = document.createElement("div");
            mentorCard.classList.add("mentor-card");
            mentorCard.innerHTML = `
              <img src="${mentor.ImageURL}" alt="${mentor.Name}" />
              <h3>${mentor.Name}</h3>
              <p>Slot: ${slot}</p>
              <button class="cancel-button" data-key="${key}">Cancel Booking</button>
            `;
            bookedSlotsList.appendChild(mentorCard);
          }
        });

        const cancelButtons = document.querySelectorAll(".cancel-button");
        cancelButtons.forEach((button) => {
          button.addEventListener("click", handleCancel);
        });
      })
      .catch((error) => console.error("Error fetching mentors data:", error));
  }

  function handleCancel(event) {
    const key = event.target.dataset.key;
    const confirmation = confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirmation) {
      delete bookedSlots[key];
      localStorage.setItem(bookedSlotsKey, JSON.stringify(bookedSlots));
      renderBookedSlots();
    }
  }

  renderBookedSlots();
});
