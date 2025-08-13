//for handling csv file
const uploadBtn = document.querySelector("button.CSV");
const fileInput = document.querySelector("#csvFileInput");
const fileMessageDisplay = document.querySelector("#fileNameDisplay");
const fileContentDisplay = document.querySelector("#csv-display");

uploadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stops from submitting
  fileInput.click(); // lets me enter a csv file
});

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(e) {
  const file = e.target.files[0];
  fileContentDisplay.textContent = ""; // empties previous content
  fileMessageDisplay.textContent = ""; // clears any default messages

  // confirm file existence
  if (file) {
    fileNameDisplay.textContent = `Selected file: ${file.name}`; // shows the name of selected file
  } else {
    fileNameDisplay.textContent = "no file selected";
  }

  //reads the file and activating alert system
  const reader = new FileReader();
  reader.onload = () => {
    const csvDisplay = document.getElementById("csv-display");
    csvDisplay.innerHTML = ""; // clear previous rows

    const rows = reader.result.split("\n").filter((row) => row.trim() !== ""); // split & remove empty lines
    const headers = rows[0].split(",");
    

    async function getData() {
      try {
        const response = await fetch("http://localhost:3000/upload-CSV", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvData: reader.result }),
        });
        if (response.ok) {
          console.log("The request was successfull");
        } else {
          throw new Error(`response status: ${response.status}`);
        }

        const responseData = await response.json();
        const SuspiciousCount = responseData.SuspiciousCount;
        console.log(SuspiciousCount);
        document.getElementById('count').textContent = SuspiciousCount;
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();

    for (let i = 1; i < rows.length; i++) {
      // skip header row
      const values = rows[i].split(",").map((val) => val.trim()); // split & clean up values
      const tr = document.createElement("tr");

      values.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });

      csvDisplay.appendChild(tr);
    }
  };
  reader.onerror = () => {
  showMessage("Error reading the file. Please try again");
  };
reader.readAsText(file);
}


// give message to a user
function showMessage(message, type) {
  fileMessageDisplay.textContent = message;
  fileMessageDisplay.style.color = type === "error" ? "red" : "green";
};
