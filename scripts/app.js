import { loadFromLocalStorage, saveToLocalStorage } from "./localstorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mortgage-form");
  const amountInput = document.getElementById("amount");
  const yearsInput = document.getElementById("years");
  const interestInput = document.getElementById("interest");
  const emptyDisplay = document.getElementById("empty-display");
  const filledDisplay = document.getElementById("filled-display");
  const modal = document.querySelector(".modal");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const totalPaymentEl = document.getElementById("total-payment");

  // Load saved data on page load
  loadFromLocalStorage(
    amountInput,
    yearsInput,
    interestInput,
    monthlyPaymentEl,
    totalPaymentEl,
    emptyDisplay,
    filledDisplay
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const amount = parseFloat(amountInput.value);
    const years = parseFloat(yearsInput.value);
    const interestRate = parseFloat(interestInput.value);

    // Validate input
    if (
      isNaN(amount) ||
      isNaN(years) ||
      isNaN(interestRate) ||
      amount <= 0 ||
      years <= 0 ||
      interestRate <= 0
    ) {
      // Show empty display if inputs are invalid
      emptyDisplay.style.display = "flex";
      filledDisplay.style.display = "none";
      return;
    }

    // Show the modal
    modal.style.display = "flex";

    // Perform calculations while the modal is visible
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      monthlyInterestRate === 0
        ? amount / numberOfPayments
        : (amount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;

    // After 2 seconds, hide the modal and display the results
    setTimeout(() => {
      modal.style.display = "none";

      // Update results in the filled display
      monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
      totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;

      // Save the data and results to local storage
      saveToLocalStorage({
        amount,
        years,
        interest: interestRate,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
      });

      // Toggle displays
      emptyDisplay.style.display = "none";
      filledDisplay.style.display = "block";
    }, 2000); // Modal visible for 2 seconds
  });
});
