//for csv file 
const uploadBtn = document.querySelector('button.CSV');
const fileInput = document.querySelector('#csvFileInput');
const fileNameDisplay = document.querySelector('#fileNameDisplay');

uploadBtn.addEventListener('click', (e) => {
  e.preventDefault(); // stops from submitting
  fileInput.click(); // lets me enter a csv file
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]; // retrieves the first file selected in a file input element
    if (file)
    {
        fileNameDisplay.textContent = `Selected file: ${file.name}`;
    }
    else 
    {
        fileNameDisplay.textContent = "no file selected";
    }
});