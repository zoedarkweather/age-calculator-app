const form = document.querySelector("form");
const dateInputs = document.querySelectorAll("input");

for (const dateInput of dateInputs) {
    dateInput.addEventListener("focus", (e) => {
        let inputID = e.target.getAttribute("id");   
        clearError(inputID);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let day = "";
    let month = "";
    let year = "";
    
    for (const dateInput of dateInputs) {        
        const inputID = dateInput.getAttribute("id");
        clearError(inputID);

        if (!dateInput.validity.valid) {
            showError(inputID);
        } else if (isNaN(dateInput.value)) {
            showError(inputID, "Please enter a number");
        } else {
            if (parseInt(dateInput.value) <= 0) {
                showError(inputID);
            }

            switch (inputID) {
                case "day":
                    day = dateInput.value;
                    if (parseInt(day) > 31) {
                        showError(inputID);
                    }
                    break;
                case "month":
                    month = dateInput.value;
                    if (parseInt(month) > 12) {
                        showError(inputID);
                    }
                    break;
                case "year":
                    year = dateInput.value;
                    const today = new Date()
                    if (parseInt(year) > today.getFullYear()) {
                        showError(inputID, "Must be in the past")
                        return;
                    }
                    break;
                default:
                    break;                    
            }
        }        
    }
    
    const dateEntered = new Date(`${month}/${day}/${year}`); 

    //If an invalid date with a day < 32 is entered,  
    //JS will make it a valid date in the next month.
    //This checks to see if the date entered doesn't 
    //== the date created by the Date constructor, and
    //makes such a date invalid.
    if (dateEntered.getDate() !== parseInt(day)) {
        showError("day", "Must be a valid date");                  
    } else {
        calculateAge(dateEntered)      
    }       
});

function showError(inputID, errorMsg = "") {
    const dateInput = document.querySelector(`#${inputID}`); 
    const errorPara = document.querySelector(`#${inputID} + p`);

    if (errorMsg === "") {            
  
        if (dateInput.validity.valueMissing) {
            errorMsg = "This field is required";
        } else if (dateInput.validity.tooShort) {
            errorMsg = `Please enter a ${inputID} in the correct format`;
        } else {
            errorMsg = `Must be a valid ${inputID}`;
        }
    }

    errorPara.textContent = errorMsg;
    dateInput.classList.add("input-error");  
}

function clearError(inputID) {
    const dateInput = document.querySelector(`#${inputID}`);  
    const errorPara = document.querySelector(`#${inputID} + p`);
    errorPara.textContent = "";
    dateInput.classList.remove("input-error");
}

function calculateAge(dateEntered) { 
    const today = new Date();
    const age = today - dateEntered;

    const years = Math.floor(age/31556952000);
    const months = Math.floor((age - years * 31556952000) / 2629746000);
    const days = Math.floor((age - years * 31556952000 - months * 2629746000) / 86400000);

    const yearOutput = document.querySelector(".age-years");
    const monthOutput = document.querySelector(".age-months");
    const dayOutput = document.querySelector(".age-days");

    yearOutput.textContent = years;
    monthOutput.textContent = months;
    dayOutput.textContent = days;
}
