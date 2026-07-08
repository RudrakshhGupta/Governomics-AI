// ===========================
// Slider Values
// ===========================

["A", "B"].forEach(side => {

    const budget = document.getElementById("budget" + side);
    const duration = document.getElementById("duration" + side);

    budget.addEventListener("input", () => {
        document.getElementById("budget" + side + "Value").innerText =
            budget.value + "%";
    });

    duration.addEventListener("input", () => {
        document.getElementById("duration" + side + "Value").innerText =
            duration.value;
    });

});


// ===========================
// Store Results
// ===========================

let policyA = null;
let policyB = null;


// ===========================
// Predict Function
// ===========================

async function simulate(side) {

    const form = new FormData();

    form.append(
        "country",
        document.getElementById("compareCountry").value
    );

    form.append(
        "policy",
        document.getElementById("policy" + side).value
    );

    form.append(
        "budget",
        document.getElementById("budget" + side).value
    );

    form.append(
        "duration",
        document.getElementById("duration" + side).value
    );

    const response = await fetch("/predict", {

        method: "POST",

        body: form

    });

    const result = await response.json();

    if (side === "A") {

        policyA = result;

    } else {

        policyB = result;

    }

    updateTable();

}


// ===========================
// Buttons
// ===========================

document.getElementById("policyAForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    simulate("A");

});

document.getElementById("policyBForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    simulate("B");

});


// ===========================
// Update Table
// ===========================

function updateTable() {

    if (policyA) {

        document.getElementById("aSuccess").innerText =
            policyA["Success Probability"] + "%";

        document.getElementById("aGDP").innerText =
            (policyA["GDP Impact"] >= 0 ? "+" : "") +
            policyA["GDP Impact"] + "%";

        document.getElementById("aEmployment").innerText =
            (policyA["Employment Impact"] >= 0 ? "+" : "") +
            policyA["Employment Impact"] + "%";

        document.getElementById("aRisk").innerText =
            policyA["Implementation Risk"] + "%";

    }

    if (policyB) {

        document.getElementById("bSuccess").innerText =
            policyB["Success Probability"] + "%";

        document.getElementById("bGDP").innerText =
            (policyB["GDP Impact"] >= 0 ? "+" : "") +
            policyB["GDP Impact"] + "%";

        document.getElementById("bEmployment").innerText =
            (policyB["Employment Impact"] >= 0 ? "+" : "") +
            policyB["Employment Impact"] + "%";

        document.getElementById("bRisk").innerText =
            policyB["Implementation Risk"] + "%";

    }

    if (policyA && policyB) {

        compareResults();

    }

}


// ===========================
// Compare Results
// ===========================

function compareResults() {

    winner(
        "winnerSuccess",
        policyA["Success Probability"],
        policyB["Success Probability"],
        true
    );

    winner(
        "winnerGDP",
        policyA["GDP Impact"],
        policyB["GDP Impact"],
        true
    );

    winner(
        "winnerEmployment",
        policyA["Employment Impact"],
        policyB["Employment Impact"],
        true
    );

    winner(
        "winnerRisk",
        policyA["Implementation Risk"],
        policyB["Implementation Risk"],
        false
    );

    updateRecommendation();

}


// ===========================
// Winner Badge
// ===========================

function winner(id, a, b, higher = true) {

    const cell = document.getElementById(id);

    if (a === b) {

        cell.innerHTML =
            '<span class="winner-badge badge-tie">Tie</span>';

        return;

    }

    if (higher) {

        if (a > b) {

            cell.innerHTML =
                '<span class="winner-badge badge-a">Policy A</span>';

        } else {

            cell.innerHTML =
                '<span class="winner-badge badge-b">Policy B</span>';

        }

    }

    else {

        if (a < b) {

            cell.innerHTML =
                '<span class="winner-badge badge-a">Policy A</span>';

        } else {

            cell.innerHTML =
                '<span class="winner-badge badge-b">Policy B</span>';

        }

    }

}


// ===========================
// Recommendation
// ===========================

function updateRecommendation() {

    if (!policyA || !policyB) return;

    let scoreA = 0;
    let scoreB = 0;

    if (policyA["Success Probability"] > policyB["Success Probability"])
        scoreA++;
    else if (policyB["Success Probability"] > policyA["Success Probability"])
        scoreB++;

    if (policyA["GDP Impact"] > policyB["GDP Impact"])
        scoreA++;
    else if (policyB["GDP Impact"] > policyA["GDP Impact"])
        scoreB++;

    if (policyA["Employment Impact"] > policyB["Employment Impact"])
        scoreA++;
    else if (policyB["Employment Impact"] > policyA["Employment Impact"])
        scoreB++;

    if (policyA["Implementation Risk"] < policyB["Implementation Risk"])
        scoreA++;
    else if (policyB["Implementation Risk"] < policyA["Implementation Risk"])
        scoreB++;

    const overallWinner = document.getElementById("overallWinner");
    const recommendationText = document.getElementById("recommendationText");

    const policyAName = document.getElementById("policyA").value;
    const policyBName = document.getElementById("policyB").value;

    if (scoreA > scoreB) {

        overallWinner.innerHTML =
            "🏆 " + policyAName + " Recommended";

        recommendationText.innerHTML =
            "<strong>" + policyAName + "</strong> performs better across most indicators. It delivers stronger projected economic outcomes with a higher likelihood of successful implementation while maintaining comparatively lower implementation risk.";

    }

    else if (scoreB > scoreA) {

        overallWinner.innerHTML =
            "🏆 " + policyBName + " Recommended";

        recommendationText.innerHTML =
            "<strong>" + policyBName + "</strong> provides the stronger overall balance of policy success, GDP growth, employment generation and implementation feasibility according to the current simulation.";

    }

    else {

        overallWinner.innerHTML =
            "⚖️ Policies are Evenly Matched";

        recommendationText.innerHTML =
            "Both policies produce comparable outcomes across the evaluated metrics. The final decision should depend on long-term strategic priorities and policy objectives.";

    }

}