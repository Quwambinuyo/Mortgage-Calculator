// Function to save data to local storage
export const saveToLocalStorage = (data) => {
  localStorage.setItem("mortgageData", JSON.stringify(data));
};

// Function to load data from local storage
export const loadFromLocalStorage = (
  amountInput,
  yearsInput,
  interestInput,
  monthlyPaymentEl,
  totalPaymentEl,
  emptyDisplay,
  filledDisplay
) => {
  const savedData = JSON.parse(localStorage.getItem("mortgageData"));
  if (savedData) {
    // Populate input fields with saved values
    amountInput.value = savedData.amount || "";
    yearsInput.value = savedData.years || "";
    interestInput.value = savedData.interest || "";

    // Update results display if saved results exist
    if (savedData.monthlyPayment && savedData.totalPayment) {
      monthlyPaymentEl.textContent = `£${savedData.monthlyPayment}`;
      totalPaymentEl.textContent = `£${savedData.totalPayment}`;
      emptyDisplay.style.display = "none";
      filledDisplay.style.display = "block";
    }
  }
};
