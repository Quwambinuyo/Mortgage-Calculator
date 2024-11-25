import {
  populateFormFromLocalStorage,
  saveFormDataToLocalStorage,
  clearFromStorage,
} from "./localstorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mortgage-form");
  const errorAmountDiv = document.querySelector(".error-amount");
  const errorYearsDiv = document.querySelector(".error-years");
  const errorInterestDiv = document.querySelector(".error-interest");
  const emptyDisplay = document.getElementById("empty-display");
  const filledDisplay = document.getElementById("filled-display");
  const modal = document.querySelector(".modal");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const totalPaymentEl = document.getElementById("total-payment");

  // Render error messages dynamically
  function renderErrorStates({ amount, years, interest }) {
    // Render amount error (show error only if invalid)
    errorAmountDiv.innerHTML = `
      <label for="amount">Mortgage Amount</label><br />
      <div class="inline-flex items-center border ${
        amount ? "border-yellow-500" : "border-red-600"
      } rounded focus-within:${
      amount ? "border-yellow-500" : "border-red-600"
    }">
        <span class="px-4 py-2 font-bold ${
          amount ? "bg-yellow-500" : "bg-red-600"
        }">£</span>
        <input
          type="number"
          id="amount"
          step="0.01"
          class="p-2 outline-none"
          placeholder="Enter an amount"
        />
      </div>
      ${
        amount ? "" : `<p class="text-red-600">Please enter a valid amount.</p>`
      }
    `;

    // Render years error (show error only if invalid)
    errorYearsDiv.innerHTML = `
      <label for="years">Mortgage Term (Years)</label><br />
      <div class="inline-flex items-center border ${
        years ? "border-yellow-500" : "border-red-600"
      } rounded focus-within:${years ? "border-yellow-500" : "border-red-600"}">
        <input
          type="number"
          id="years"
          step="1"
          class="p-2 outline-none"
          placeholder="Enter the number of years"
        />
        <span class="px-4 py-2 font-bold ${
          years ? "bg-yellow-500" : "bg-red-600"
        }">Years</span>
      </div>
      ${
        years
          ? ""
          : `<p class="text-red-600">Please enter a valid number of years.</p>`
      }
    `;

    // Render interest error (show error only if invalid)
    errorInterestDiv.innerHTML = `
      <label for="interest">Mortgage Interest Rate</label><br />
      <div class="inline-flex items-center border ${
        interest ? "border-yellow-500" : "border-red-600"
      } rounded focus-within:${
      interest ? "border-yellow-500" : "border-red-600"
    }">
        <input
          type="number"
          id="interest"
          step="0.01"
          class="p-2 outline-none"
          placeholder="Enter the interest rate"
        />
        <span class="px-4 py-2 font-bold ${
          interest ? "bg-yellow-500" : "bg-red-600"
        }">%</span>
      </div>
      ${
        interest
          ? ""
          : `<p class="text-red-600">Please enter a valid interest rate.</p>`
      }
    `;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amountInput = document.getElementById("amount");
    const yearsInput = document.getElementById("years");
    const interestInput = document.getElementById("interest");

    const amount = parseFloat(amountInput?.value || 0);
    const years = parseFloat(yearsInput?.value || 0);
    const interestRate = parseFloat(interestInput?.value || 0);

    const hasErrors = {
      amount: isNaN(amount) || amount <= 0,
      years: isNaN(years) || years <= 0,
      interest: isNaN(interestRate) || interestRate <= 0,
    };

    // Dynamically render errors
    renderErrorStates({
      amount: !hasErrors.amount,
      years: !hasErrors.years,
      interest: !hasErrors.interest,
    });

    if (hasErrors.amount || hasErrors.years || hasErrors.interest) {
      emptyDisplay.style.display = "flex";
      filledDisplay.style.display = "none";
      return;
    }

    modal.style.display = "flex";

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      monthlyInterestRate === 0
        ? amount / numberOfPayments
        : (amount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;

    setTimeout(() => {
      modal.style.display = "none";
      monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
      totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;

      // Save the calculated data to localStorage
      saveFormDataToLocalStorage(
        amount,
        years,
        interestRate,
        monthlyPayment.toFixed(2),
        totalPayment.toFixed(2)
      );

      emptyDisplay.style.display = "none";
      filledDisplay.style.display = "block";
    }, 2000);
  });

  // Set default error states on page load
  renderErrorStates({ amount: true, years: true, interest: true });

  // Load form data from localStorage when the page is loaded
  populateFormFromLocalStorage();

  // Clear saved data on button click
  document
    .querySelector(".clear-btn")
    .addEventListener("click", clearFromStorage);
});
