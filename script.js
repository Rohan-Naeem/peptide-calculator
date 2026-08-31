
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

                <h3>Calculation Result </h3>

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

                    resultBox.innerHTML = `

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