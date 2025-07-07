document.addEventListener("DOMContentLoaded", function () {
  let shareCount = 0;
  const maxShares = 5;

  const shareButton = document.getElementById("shareBtn");
  const shareCounter = document.getElementById("shareCounter");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("registrationForm");

  shareButton.addEventListener("click", function () {
    if (shareCount < maxShares) {
      shareCount++;
      shareCounter.textContent = `Click count: ${shareCount}/${maxShares}`;

      const message = "Hey Buddy, Join Tech For Girls Community!";
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");

      if (shareCount === maxShares) {
        shareCounter.textContent = "Sharing complete. Please continue.";
        submitBtn.disabled = false;
      }
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (shareCount < maxShares) {
      alert("Please complete sharing before submitting.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const file = document.getElementById("screenshot").files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      const fileData = reader.result;

      const data = {
        name: name,
        phone: phone,
        email: email,
        college: college,
        fileUrl: fileData
      };

      // 👇 Replace with YOUR OWN Google Apps Script Web App URL
      fetch("https://script.google.com/macros/s/AKfycbwak2FbFm5lSkLCVTPZNGXZgAfD9XcorDRdmxf5tuw/dev", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.text())
        .then((response) => {
          alert("🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!");
          form.reset();
          submitBtn.disabled = true;
          localStorage.setItem("submitted", "true");
          form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Error submitting the form.");
        });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a screenshot.");
    }
  });

  if (localStorage.getItem("submitted") === "true") {
    form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
    shareCounter.textContent = "Already submitted.";
  }
});
