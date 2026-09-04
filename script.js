/* =========================================================
   PEPTIDE CALC — JAVASCRIPT
   ========================================================= */


/* =========================================================
   CALCULATOR
   ========================================================= */

const calculatorForm = document.getElementById(
    "peptideCalculatorForm"
);

const resultBox = document.getElementById(
    "calculatorResult"
);


/* =========================================================
   QUICK PICK BUTTONS
   ========================================================= */

const quickPickButtons = document.querySelectorAll(
    ".quick-pick"
);


quickPickButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const targetId =
                button.getAttribute("data-target");

            const value =
                button.getAttribute("data-value");


            const targetInput =
                document.getElementById(targetId);


            if (!targetInput) {
                return;
            }


            /* Put selected value into input */

            targetInput.value = value;


            /* Remove active state from
               other buttons for same input */

            quickPickButtons.forEach(
                function (item) {

                    if (
                        item.getAttribute("data-target")
                        === targetId
                    ) {

                        item.classList.remove(
                            "active"
                        );

                    }

                }
            );


            /* Highlight selected button */

            button.classList.add("active");


            /* Trigger input event */

            targetInput.dispatchEvent(
                new Event("input", {
                    bubbles: true
                })
            );

        }
    );

});


/* =========================================================
   CALCULATE
   ========================================================= */

if (calculatorForm && resultBox) {

    calculatorForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -----------------------------------------
               GET INPUT VALUES
            ----------------------------------------- */

            const peptideAmount = parseFloat(
                document.getElementById(
                    "peptideAmount"
                ).value
            );


            const diluentVolume = parseFloat(
                document.getElementById(
                    "diluentVolume"
                ).value
            );


            const desiredAmount = parseFloat(
                document.getElementById(
                    "desiredAmount"
                ).value
            );


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (
                isNaN(peptideAmount) ||
                isNaN(diluentVolume) ||
                isNaN(desiredAmount)
            ) {

                showError(
                    "Please enter a value in all fields."
                );

                return;
            }


            if (
                peptideAmount <= 0 ||
                diluentVolume <= 0 ||
                desiredAmount <= 0
            ) {

                showError(
                    "Please enter values greater than zero."
                );

                return;
            }


            /* -----------------------------------------
               CALCULATE CONCENTRATION
            ----------------------------------------- */

            const concentration =
                peptideAmount / diluentVolume;


            /* -----------------------------------------
               CALCULATE REQUIRED VOLUME
            ----------------------------------------- */

            const requiredVolume =
                desiredAmount / concentration;


            /* -----------------------------------------
               DISPLAY RESULT
            ----------------------------------------- */

            resultBox.innerHTML = `

                <div class="result-top">

                    <span class="result-icon">
                        ✓
                    </span>

                    <span class="result-label">
                        CALCULATED RESULT
                    </span>

                </div>

                <h3>
                    Calculation Result
                </h3>

                <p>
                    Concentration:
                </p>

                <div class="result-value">
                    ${formatNumber(concentration)}
                </div>

                <p>
                    Required volume:
                </p>

                <div class="result-value">
                    ${formatNumber(requiredVolume)}
                </div>

                <p>
                    These are mathematical results based
                    on the values entered.
                </p>

            `;

        }
    );


    /* =====================================================
       RESET
       ===================================================== */

    calculatorForm.addEventListener(
        "reset",
        function () {

            setTimeout(
                function () {

                    /* Remove active Quick Picks */

                    quickPickButtons.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Reset result */

                    resultBox.innerHTML = `

                        <div class="result-top">

                            <span class="result-icon">
                                ✓
                            </span>

                            <span class="result-label">
                                CALCULATED RESULT
                            </span>

                        </div>

                        <h3>
                            Result
                        </h3>

                        <p>
                            Enter your values and click Calculate.
                        </p>

                    `;

                },
                0
            );

        }
    );

}


/* =========================================================
   ERROR MESSAGE
   ========================================================= */

function showError(message) {

    if (!resultBox) {
        return;
    }


    resultBox.innerHTML = `

        <div class="result-top">

            <span class="result-icon">
                !
            </span>

            <span class="result-label">
                CHECK YOUR INPUT
            </span>

        </div>

        <h3>
            Please Check Your Input
        </h3>

        <p>
            ${message}
        </p>

    `;

}


/* =========================================================
   NUMBER FORMATTING
   ========================================================= */

function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "0";
    }


    return Number(
        number.toFixed(6)
    ).toString();

}