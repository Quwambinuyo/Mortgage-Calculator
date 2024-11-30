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
  const mortgageTypeContainer = document.querySelector(
    ".mortgage-type-container"
  );

  // Function to update error messages for invalid inputs
  function renderErrorStates({
    amount,
    years,
    interest,
    showTypeError,
    selectedType,
  }) {
    const currentAmount = document.getElementById("amount")?.value || "";
    const currentYears = document.getElementById("years")?.value || "";
    const currentInterest = document.getElementById("interest")?.value || "";

    // Error handling for the amount field
    errorAmountDiv.innerHTML = `
      <label for="amount">Mortgage Amount</label><br />
      <div class="inline-flex items-center border w-[100%] ${
        amount ? "border-yellow-500" : "border-red-600"
      } rounded">
        <span class="px-4 py-2 font-bold ${
          amount ? "bg-yellow-500" : "bg-red-600"
        }">£</span>
        <input
          type="number"
          id="amount"
          step="0.01"
          class="p-2 outline-none"
          placeholder="Enter an amount"
          value="${currentAmount}"
        />
      </div>
      ${
        amount ? "" : `<p class="text-red-600">Please enter a valid amount.</p>`
      }
    `;

    // Error handling for the years field
    errorYearsDiv.innerHTML = `
      <label for="years">Mortgage Term (Years)</label><br />
      <div class="flex items-center border w-full ${
        years ? "border-yellow-500" : "border-red-600"
      } rounded">
        <input
          type="number"
          id="years"
          step="1"
          class="p-2 outline-none w-full"
          placeholder="Enter the number of years"
          value="${currentYears}"
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

    // Error handling for the interest field
    errorInterestDiv.innerHTML = `
      <label for="interest">Mortgage Interest Rate</label><br />
      <div class="flex items-center border w-full ${
        interest ? "border-yellow-500" : "border-red-600"
      } rounded">
        <input
          type="number"
          id="interest"
          step="0.01"
          class="p-2 outline-none w-full"
          placeholder="Enter the interest rate"
          value="${currentInterest}"
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

    // Error handling for the mortgage type
    mortgageTypeContainer.innerHTML = `
      <h3 class="font-bold">Mortgage Type</h3>
      <div class="flex gap-2 p-3 border border-gray-500">
        <input
          type="radio"
          name="mortgage-type"
          id="repayment-total"
          value="monthly-payment"
           ${selectedType === "monthly-payment" ? "checked" : ""}
        />
        <label for="repayment-total">Repayment</label>
      </div>
      <div class="flex gap-2 p-3 border border-gray-500">
        <input
          type="radio"
          name="mortgage-type"
          id="repayment-interest"
          value="interest-only"
           ${selectedType === "interest-only" ? "checked" : ""}
        />
        <label for="repayment-interest">Interest Only</label>
      </div>
      ${
        showTypeError
          ? `<p class="text-red-500 mortgage-msg">Please select a mortgage type</p>`
          : ""
      }
    `;
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amountInput = document.getElementById("amount");
    const yearsInput = document.getElementById("years");
    const interestInput = document.getElementById("interest");
    const mortgageType = document.querySelector(
      'input[name="mortgage-type"]:checked'
    );

    const amount = parseFloat(amountInput?.value || 0);
    const years = parseFloat(yearsInput?.value || 0);
    ``;
    const interestRate = parseFloat(interestInput?.value || 0);

    const hasErrors = {
      amount: isNaN(amount) || amount <= 0,
      years: isNaN(years) || years <= 0,
      interest: isNaN(interestRate) || interestRate <= 0,
    };

    renderErrorStates({
      amount: !hasErrors.amount,
      years: !hasErrors.years,
      interest: !hasErrors.interest,
      showTypeError: !mortgageType,
      selectedType: mortgageType ? mortgageType.value : null,
    });

    if (
      hasErrors.amount ||
      hasErrors.years ||
      hasErrors.interest ||
      !mortgageType
    ) {
      emptyDisplay.style.display = "flex";
      filledDisplay.style.display = "none";
      return;
    }

    modal.style.display = "flex";

    let totalPayment = 0,
      monthlyPayment = 0;

    if (mortgageType.value === "monthly-payment") {
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = years * 12;
      monthlyPayment =
        monthlyInterestRate === 0
          ? amount / numberOfPayments
          : (amount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      totalPayment = monthlyPayment * numberOfPayments;
    } else if (mortgageType.value === "interest-only") {
      const monthlyInterestRate = interestRate / 100 / 12;
      monthlyPayment = amount * monthlyInterestRate;
      totalPayment = monthlyPayment * 12 * years;
    }

    setTimeout(() => {
      modal.style.display = "none";
      monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
      totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;

      saveFormDataToLocalStorage(
        amount,
        years,
        interestRate,
        monthlyPayment.toFixed(2),
        totalPayment.toFixed(2),
        mortgageType?.value
      );

      emptyDisplay.style.display = "none";
      filledDisplay.style.display = "block";
    }, 2000);
  });

  renderErrorStates({
    amount: true,
    years: true,
    interest: true,
    showTypeError: false, // Initially no error message
    selectedType: null,
  });

  populateFormFromLocalStorage();

  document
    .querySelector(".clear-btn")
    .addEventListener("click", clearFromStorage);
});
