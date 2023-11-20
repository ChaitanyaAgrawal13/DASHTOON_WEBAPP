document.addEventListener("DOMContentLoaded", () => {
  const comicForm = document.getElementById("comicForm");
  const comicDisplayArea = document.getElementById("comicDisplay");

  comicForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const panelInputs = [];
    for (let i = 1; i <= 10; i++) {
      const panelInputValue = document.getElementById(`panel${i}`).value;
      panelInputs.push(panelInputValue);
    }

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: panelInputs.join("\n") }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("image")) {
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          comicDisplayArea.innerHTML = `<img src="${imageUrl}" alt="Generated Comic">`;
        } else {
          console.error(
            "Failed to generate comic. Invalid content type:",
            contentType
          );
          alert("Unable to generate your Comic, please try again.");
        }
      } else {
        console.error(
          "Failed to generate comic. Server returned:",
          response.status,
          response.statusText
        );
        alert("Unable to generate your Comic, please try again.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Unable to generate your Comic, please try again.");
    }
  });
});
