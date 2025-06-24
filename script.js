const form = document.getElementById("pdfForm");
const statusMessage = document.getElementById("status-message");
const submitButton = form.querySelector("button[type='submit']");


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
// Nutzer informieren und Button deaktivieren
    statusMessage.style.color = "black";
    statusMessage.textContent = "⏳ Dein PDF wird generiert und versendet, dies kann bis zu 2 Minuten dauern. Bitte nicht erneut klicken.";
    submitButton.disabled = true;
    
    try {
        const res = await fetch("https://rethink-pdf-backend.onrender.com/send", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.status === "ok") {
            statusMessage.style.color = "green";
            statusMessage.textContent = "✅ Dein Buch ist auf dem Weg zu dir.";
        } else {
            statusMessage.style.color = "red";
            statusMessage.textContent = "❌ Fehler: " + data.message;
        }
    } catch (err) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "❌ Es gab ein technisches Problem bitte versuche es miteinem anderen Browser oder im Inkoknito-Modus.";
        console.error(err);
    }

 // Button wieder aktivieren nach 2 Minuten (120 Sekunden)
    setTimeout(() => {
        submitButton.disabled = false;
    }, 180000);
    
});
