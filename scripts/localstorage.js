// // Function to save form data to localStorage
// // The data is saved under the name "mortgageData" in localStorage
// export function saveFormDataToLocalStorage(
//   amount, // Mortgage amount
//   years, // Term in years
//   interestRate, // Interest rate
//   monthlyPayment, // Calculated monthly payment
//   totalPayment // Calculated total payment
// ) {
//   // Store the data as a JSON string in localStorage
//   localStorage.setItem(
//     "mortgageData",
//     JSON.stringify({
//       amount, // Save the mortgage amount
//       years, // Save the term
//       interestRate, // Save the interest rate
//       monthlyPayment, // Save the monthly payment
//       totalPayment, // Save the total payment
//     })
//   );
// }

// // Function to load saved data from localStorage and display it in the form
// // This uses the stored name "mortgageData"
// export function populateFormFromLocalStorage() {
//   const storedData = JSON.parse(localStorage.getItem("mortgageData")); // Get and parse the data from localStorage
//   if (storedData) {
//     // If data exists, populate the form and display values
//     document.getElementById("amount").value = storedData.amount; // Set the amount field
//     document.getElementById("years").value = storedData.years; // Set the years field
//     document.getElementById("interest").value = storedData.interestRate; // Set the interest rate field

//     // Display the calculated results
//     document.getElementById("monthly-payment").textContent = `£${
//       storedData.monthlyPayment || "0.00" // Use the saved monthly payment or 0.00 if missing
//     }`;
//     document.getElementById("total-payment").textContent = `£${
//       storedData.totalPayment || "0.00" // Use the saved total payment or 0.00 if missing
//     }`;

//     // Hide the "empty" display and show the results display
//     document.getElementById("empty-display").style.display = "none";
//     document.getElementById("filled-display").style.display = "block";
//   }
// }

// // Function to clear saved data from localStorage and reset the form
// export function clearFromStorage() {
//   localStorage.removeItem("mortgageData"); // Remove the data from localStorage

//   // Show the "empty" display and hide the results display
//   document.getElementById("empty-display").style.display = "flex";
//   document.getElementById("filled-display").style.display = "none";

//   // Reset the displayed payment values to £0.00
//   document.getElementById("monthly-payment").textContent = "£0.00";
//   document.getElementById("total-payment").textContent = "£0.00";

//   // Clear the input fields
//   document.getElementById("amount").value = ""; // Clear the amount field
//   document.getElementById("years").value = ""; // Clear the years field
//   document.getElementById("interest").value = ""; // Clear the interest rate field
// }

// Function to save form data to localStorage
// The data is saved under the name "mortgageData" in localStorage
export function saveFormDataToLocalStorage(
  amount, // Mortgage amount
  years, // Term in years
  interestRate, // Interest rate
  monthlyPayment, // Calculated monthly payment
  totalPayment, // Calculated total payment
  mortgageType // Selected mortgage type (Repayment or Interest Only)
) {
  // Store the data as a JSON string in localStorage
  localStorage.setItem(
    "mortgageData",
    JSON.stringify({
      amount, // Save the mortgage amount
      years, // Save the term
      interestRate, // Save the interest rate
      monthlyPayment, // Save the monthly payment
      totalPayment, // Save the total payment
      mortgageType, // Save the selected mortgage type
    })
  );
}

// Function to load saved data from localStorage and display it in the form
// This uses the stored name "mortgageData"
export function populateFormFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("mortgageData")); // Get and parse the data from localStorage
  if (storedData) {
    // If data exists, populate the form and display values
    document.getElementById("amount").value = storedData.amount; // Set the amount field
    document.getElementById("years").value = storedData.years; // Set the years field
    document.getElementById("interest").value = storedData.interestRate; // Set the interest rate field

    // Set the selected mortgage type radio button
    if (storedData.mortgageType) {
      const radioInput = document.querySelector(
        `input[name="mortgage-type"][value="${storedData.mortgageType}"]`
      );
      if (radioInput) {
        radioInput.checked = true;
      }
    }

    // Display the calculated results
    document.getElementById("monthly-payment").textContent = `£${
      storedData.monthlyPayment || "0.00" // Use the saved monthly payment or 0.00 if missing
    }`;
    document.getElementById("total-payment").textContent = `£${
      storedData.totalPayment || "0.00" // Use the saved total payment or 0.00 if missing
    }`;

    // Hide the "empty" display and show the results display
    document.getElementById("empty-display").style.display = "none";
    document.getElementById("filled-display").style.display = "block";
  }
}

// Function to clear saved data from localStorage and reset the form
export function clearFromStorage() {
  localStorage.removeItem("mortgageData"); // Remove the data from localStorage

  // Show the "empty" display and hide the results display
  document.getElementById("empty-display").style.display = "flex";
  document.getElementById("filled-display").style.display = "none";

  // Reset the displayed payment values to £0.00
  document.getElementById("monthly-payment").textContent = "£0.00";
  document.getElementById("total-payment").textContent = "£0.00";

  // Clear the input fields
  document.getElementById("amount").value = ""; // Clear the amount field
  document.getElementById("years").value = ""; // Clear the years field
  document.getElementById("interest").value = ""; // Clear the interest rate field

  // Clear the selected mortgage type radio button
  const mortgageTypeRadios = document.querySelectorAll(
    'input[name="mortgage-type"]'
  );
  mortgageTypeRadios.forEach((radio) => (radio.checked = false));
}
