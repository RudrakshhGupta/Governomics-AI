// ==============================
// Slider Values
// ==============================

const budgetSlider = document.getElementById("budgetSlider");
const durationSlider = document.getElementById("durationSlider");

if (budgetSlider) {
    budgetSlider.addEventListener("input", () => {
        document.getElementById("budgetValue").innerText = budgetSlider.value + "%";
    });
}

if (durationSlider) {
    durationSlider.addEventListener("input", () => {
        document.getElementById("durationValue").innerText = durationSlider.value;
    });
}

// ==============================
// Simulation Form
// ==============================

const simulationForm = document.getElementById("simulationForm");

if (simulationForm) {

    simulationForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(simulationForm);

        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        // Update cards

        document.getElementById("successResult").innerText =
            result["Success Probability"] + "%";

        const success = document.getElementById("successResult");
const gdp = document.getElementById("gdpResult");
const employment = document.getElementById("employmentResult");
const risk = document.getElementById("riskResult");

success.innerText = result["Success Probability"] + "%";

gdp.innerText =
    (result["GDP Impact"] >= 0 ? "+" : "") +
    result["GDP Impact"] + "%";

employment.innerText =
    (result["Employment Impact"] >= 0 ? "+" : "") +
    result["Employment Impact"] + "%";

risk.innerText =
    result["Implementation Risk"] + "%";

// Colors

gdp.style.color =
    result["GDP Impact"] >= 0 ? "#22C55E" : "#EF4444";

employment.style.color =
    result["Employment Impact"] >= 0 ? "#22C55E" : "#EF4444";

risk.style.color =
    result["Implementation Risk"] < 40 ? "#22C55E" :
    result["Implementation Risk"] < 70 ? "#F59E0B" : "#EF4444";

        updateConfidence(result["Success Probability"]);
updateInsights(

    result["Success Probability"],

    result["GDP Impact"],

    result["Employment Impact"],

    result["Implementation Risk"]

)
updateChart(

    result["Success Probability"],

    result["GDP Impact"],

    result["Employment Impact"],

    result["Implementation Risk"]

);
    });

}

// ==============================
// Confidence Bar
// ==============================

function updateConfidence(score) {

    score = Number(score);

    document.getElementById("confidenceValue").innerText =
        score + "%";

    document.getElementById("confidenceFill").style.width =
        score + "%";

    let color = "#22C55E";
    let message = "Excellent confidence.";

    if (score < 80) {
        color = "#84CC16";
        message = "Good confidence.";
    }

    if (score < 60) {
        color = "#EAB308";
        message = "Moderate confidence.";
    }

    if (score < 40) {
        color = "#F97316";
        message = "Low confidence.";
    }

    if (score < 20) {
        color = "#EF4444";
        message = "Very low confidence.";
    }

    document.getElementById("confidenceFill").style.background = color;

    document.getElementById("confidenceText").innerText = message;

}function updateInsights(success, gdp, employment, risk){

    // Policy Assessment

    if(success >= 80){

        document.getElementById("assessmentText").innerText =
        "The selected policy has a high probability of successful implementation.";

    }else if(success >= 60){

        document.getElementById("assessmentText").innerText =
        "The policy appears viable with moderate implementation challenges.";

    }else{

        document.getElementById("assessmentText").innerText =
        "The policy has a relatively low probability of achieving its objectives.";

    }


    // Economic Outlook

    document.getElementById("economicText").innerText =
    `Projected GDP Impact: ${gdp}% | Employment Impact: ${employment}%`;


    // Risk

    if(risk < 30){

        document.getElementById("riskText").innerText =
        "Implementation risk is low due to favourable conditions.";

    }else if(risk < 60){

        document.getElementById("riskText").innerText =
        "Moderate implementation risks should be considered.";

    }else{

        document.getElementById("riskText").innerText =
        "High implementation risk. Careful planning is recommended.";

    }


    // Recommendation

    if(success > risk){

        document.getElementById("recommendationText").innerText =
        "The model recommends proceeding with this policy.";

    }else{

        document.getElementById("recommendationText").innerText =
        "Consider increasing the budget or adjusting the implementation duration.";

    }

}// ==============================
// Chart.js
// ==============================

let projectionChart = null;

function updateChart(success, gdp, employment, risk){

    const ctx = document.getElementById("projectionChart");

    if(projectionChart){
        projectionChart.destroy();
    }

    projectionChart = new Chart(ctx,{

        type:"bar",

        data:{

            labels:[
                "Success",
                "GDP",
                "Employment",
                "Risk"
            ],

            datasets:[{

                data:[
                    success,
                    gdp,
                    employment,
                    risk
                ],

                backgroundColor:[
                    "#12B5CB",
                    "#163A5F",
                    "#22C55E",
                    "#EF4444"
                ],

                borderRadius:10

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}// ==============================
// PDF REPORT
// ==============================

const pdfButton = document.getElementById("downloadPDF");

if(pdfButton){

    pdfButton.addEventListener("click", generatePDF);

}

function generatePDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Colors

    const navy = [22,58,95];
    const teal = [18,181,203];

    // Title

    doc.setFont("helvetica","bold");
    doc.setFontSize(24);
    doc.setTextColor(...navy);

    doc.text("Governomics",20,25);

    doc.setFontSize(14);
    doc.setTextColor(...teal);

    doc.text("AI Policy Simulation Report",20,34);

    // Line

    doc.setDrawColor(...teal);
    doc.line(20,40,190,40);

    // Inputs

    doc.setFontSize(12);
    doc.setTextColor(0,0,0);

    doc.text("Country:",20,55);
    doc.text(document.getElementById("country").value,70,55);

    doc.text("Policy:",20,65);
    doc.text(document.getElementById("policy").value,70,65);

    doc.text("Budget:",20,75);
    doc.text(
        document.getElementById("budgetSlider").value+" % GDP",
        70,
        75
    );

    doc.text("Duration:",20,85);
    doc.text(
        document.getElementById("durationSlider").value+" Years",
        70,
        85
    );

    // Divider

    doc.line(20,95,190,95);

    // Results

    doc.setFont("helvetica","bold");

    doc.text("Simulation Results",20,108);

    doc.setFont("helvetica","normal");

    doc.text(
        "Success Probability:",
        20,
        122
    );

    doc.text(
        document.getElementById("successResult").innerText,
        95,
        122
    );

    doc.text(
        "GDP Impact:",
        20,
        134
    );

    doc.text(
        document.getElementById("gdpResult").innerText,
        95,
        134
    );

    doc.text(
        "Employment Impact:",
        20,
        146
    );

    doc.text(
        document.getElementById("employmentResult").innerText,
        95,
        146
    );

    doc.text(
        "Implementation Risk:",
        20,
        158
    );

    doc.text(
        document.getElementById("riskResult").innerText,
        95,
        158
    );

    // Divider

    doc.line(20,168,190,168);

    // AI Insights

    doc.setFont("helvetica","bold");

    doc.text("AI Policy Insights",20,182);

    doc.setFont("helvetica","normal");

    doc.text(
        document.getElementById("assessmentText").innerText,
        20,
        195,
        {maxWidth:170}
    );

    doc.text(
        document.getElementById("economicText").innerText,
        20,
        208,
        {maxWidth:170}
    );

    doc.text(
        document.getElementById("riskText").innerText,
        20,
        221,
        {maxWidth:170}
    );

    doc.text(
        document.getElementById("recommendationText").innerText,
        20,
        234,
        {maxWidth:170}
    );

    // Footer

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
        "Generated by Governomics • Simulate Before You Implement",
        20,
        285
    );

    doc.save("Governomics_Report.pdf");

}