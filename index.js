fetch("./public/faculty_data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const mentorList = document.getElementById("mentor-list");
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

      // Mentor Details
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

      // Set the maximum length
      const maxLength = 80;

      // Truncate the text if it exceeds the maximum length
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

        slotButton.addEventListener("click", () => {
          if (slotButton.classList.contains("booked")) {
            slotButton.classList.remove("booked");
            slotButton.style.backgroundColor = "";
            slotButton.textContent = slot;
          } else {
            slotButton.classList.add("booked");
            slotButton.style.backgroundColor = "grey";
            slotButton.textContent = `${slot} (booked)`;
          }
        });

        timeSlotsDiv.appendChild(slotButton);
      });

      mentorCard.appendChild(mentorTopDiv);
      mentorCard.appendChild(mentorBottomDiv);
      mentorList.appendChild(mentorCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching the mentor data:", error);
  });
