document.getElementById("pdfForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const statusEl = document.getElementById("status");

  const res = await fetch("https://dein-backend.onrender.com/send", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  statusEl.innerText = data.message;
});
