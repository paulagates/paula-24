document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("rsvp-form");
    const submitBtn = form.querySelector('button[type="submit"]');

    const mascot = document.querySelector(".go-mascot");
    let isWaving = false;

    setInterval(() => {
      if (!isWaving) {
        mascot.style.transform = "scale(1.2) rotate(15deg)";
        isWaving = true;
        setTimeout(() => {
          mascot.style.transform = "scale(1) rotate(0deg)";
          isWaving = false;
        }, 500);
      }
    }, 3000);

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Compilando...';
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/xjkrdblz", {
          method: "POST",
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Build Success!';
            submitBtn.style.background = "#27ca3f";
          }, 1000);

          setTimeout(() => {
            submitBtn.innerHTML = '<i class="bi bi-rocket me-2"></i>RSVP Enviado!';
          }, 2000);


        } else {
          showError();
        }
      } catch (err) {
        console.error(err);
        showError();
      }

      function showError() {
        submitBtn.innerHTML = '<i class="bi bi-x-octagon me-2"></i>Falha no Build';
        submitBtn.style.background = "#dc3545";
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>go run rsvp.go';
          submitBtn.style.background = "";
        }, 4000);
      }
    });
  });