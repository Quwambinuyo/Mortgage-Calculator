// localstorage.js

// Get saved values from local storage and populate the form
export function populateFormFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("mortgageData"));
  if (storedData) {
    document.getElementById("amount").value = storedData.amount;
    document.getElementById("years").value = storedData.years;
    document.getElementById("interest").value = storedData.interestRate;
    document.getElementById("monthly-payment").textContent = `£${
      storedData.monthlyPayment || "0.00"
    }`;
    document.getElementById("total-payment").textContent = `£${
      storedData.totalPayment || "0.00"
    }`;

    document.getElementById("empty-display").style.display = "none";
    document.getElementById("filled-display").style.display = "block";
  }
}

// Save form data to localStorage
export function saveFormDataToLocalStorage(
  amount,
  years,
  interestRate,
  monthlyPayment,
  totalPayment
) {
  localStorage.setItem(
    "mortgageData",
    JSON.stringify({
      amount,
      years,
      interestRate,
      monthlyPayment,
      totalPayment,
    })
  );
}

// Clear all saved data from localStorage
export function clearFromStorage() {
  localStorage.removeItem("mortgageData");
  document.getElementById("empty-display").style.display = "flex";
  document.getElementById("filled-display").style.display = "none";
  document.getElementById("monthly-payment").textContent = "£0.00";
  document.getElementById("total-payment").textContent = "£0.00";

  // Reset form fields
  document.getElementById("amount").value = "";
  document.getElementById("years").value = "";
  document.getElementById("interest").value = "";
}
