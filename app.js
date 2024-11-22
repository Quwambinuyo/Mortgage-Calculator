document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mortgage-form");
  const amountInput = document.getElementById("amount");
  const yearsInput = document.getElementById("years");
  const interestInput = document.getElementById("interest");
  const emptyDisplay = document.getElementById("empty-display");
  const filledDisplay = document.getElementById("filled-display");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const totalPaymentEl = document.getElementById("total-payment");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const amount = parseFloat(amountInput.value);
    const years = parseFloat(yearsInput.value);
    const interestRate = parseFloat(interestInput.value);

    if (
      isNaN(amount) ||
      isNaN(years) ||
      isNaN(interestRate) ||
      amount <= 0 ||
      years <= 0 ||
      interestRate <= 0
    ) {
      // Show the empty-display if inputs are invalid or not filled
      emptyDisplay.style.display = "flex";
      filledDisplay.style.display = "none";
      return;
    }

    // Calculate monthly payments and total payments
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      monthlyInterestRate === 0
        ? amount / numberOfPayments // If interest rate is 0
        : (amount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;

    // Update the results in the filled-display
    monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;

    // Show the filled-display and hide the empty-display
    emptyDisplay.style.display = "none";
    filledDisplay.style.display = "block";
  });
});
