// Tab Logic
function openTab(evt, tabName) {
    var i, panel, btn;
    panel = document.getElementsByClassName("tool-panel");
    for (i = 0; i < panel.length; i++) {
        panel[i].className = panel[i].className.replace(" active", "");
    }
    btn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < btn.length; i++) {
        btn[i].className = btn[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}

// Global Chart Variable
let myChart = null;

// Formatter
const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

// 1. Turnover Logic with CHART
function calcTurnover() {
    const salary = parseFloat(document.getElementById('t_salary').value) || 0;
    const hiring = parseFloat(document.getElementById('t_hiring').value) || 0;
    const days = parseFloat(document.getElementById('t_days').value) || 0;

    if (salary <= 0 || hiring < 0 || days < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const dailyRate = salary / 260;
    const vacancyCost = dailyRate * days * 0.5;
    const productivityLoss = (salary / 12) * 3 * 0.5; // Assuming 3 month ramp up
    const total = hiring + vacancyCost + productivityLoss;

    document.getElementById('t_total').innerText = money.format(total);
    document.getElementById('t_vacancy').innerText = money.format(vacancyCost);
    document.getElementById('t_prod').innerText = money.format(productivityLoss);
    document.getElementById('t_result').style.display = 'block';

    // DRAW CHART
    const ctx = document.getElementById('turnoverChart').getContext('2d');

    // Destroy previous chart if exists
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Hiring Costs', 'Vacancy Loss', 'Productivity Ramp-up'],
            datasets: [{
                data: [hiring, vacancyCost, productivityLoss],
                backgroundColor: [
                    '#667eea', // Purple
                    '#ecc94b', // Yellow
                    '#ed8936'  // Orange
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Breakdown of Financial Loss'
                }
            }
        }
    });
}

// 2. ROI Logic
function calcROI() {
    const cost = parseFloat(document.getElementById('r_cost').value) || 0;
    const people = parseFloat(document.getElementById('r_people').value) || 0;
    const salary = parseFloat(document.getElementById('r_salary').value) || 0;
    const boost = (parseFloat(document.getElementById('r_boost').value) || 0) / 100;

    if (cost <= 0 || people <= 0 || salary <= 0 || boost <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const gain = (salary * people) * boost;
    const net = gain - cost;
    const roi = (net / cost) * 100;

    document.getElementById('r_net').innerText = money.format(net);
    document.getElementById('r_gain').innerText = money.format(gain);
    document.getElementById('r_percent').innerText = roi.toFixed(1) + "%";

    const netEl = document.getElementById('r_net');
    netEl.className = net >= 0 ? "big-number success-text" : "big-number danger-text";

    document.getElementById('r_result').style.display = 'block';
}

// 3. Funnel Logic
function calcFunnel() {
    const hires = parseFloat(document.getElementById('f_hires').value) || 0;
    const rOffer = parseFloat(document.getElementById('f_ratio_offer').value) || 0;
    const rInterview = parseFloat(document.getElementById('f_ratio_interview').value) || 0;
    const rScreen = parseFloat(document.getElementById('f_ratio_screen').value) || 0;

    if (hires <= 0 || rOffer <= 0 || rInterview <= 0 || rScreen <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const offersNeeded = Math.ceil(hires * 1.2);
    const interviewsNeeded = offersNeeded * rOffer;
    const screensNeeded = interviewsNeeded * rInterview;
    const applicantsNeeded = screensNeeded * rScreen;

    document.getElementById('f_applicants').innerText = applicantsNeeded.toLocaleString();
    document.getElementById('f_screens').innerText = screensNeeded.toLocaleString();
    document.getElementById('f_interviews').innerText = interviewsNeeded.toLocaleString();
    document.getElementById('f_offers').innerText = offersNeeded.toLocaleString();

    document.getElementById('f_result').style.display = 'block';
}

// 4. Bradford Logic
function calcBradford() {
    const spells = parseFloat(document.getElementById('b_spells').value) || 0;
    const days = parseFloat(document.getElementById('b_days').value) || 0;

    if(spells <= 0 || days <= 0) {
        alert("Please enter valid positive numbers for both fields.");
        return;
    }

    const score = (spells * spells) * days;

    const scoreEl = document.getElementById('b_score');
    const msgEl = document.getElementById('b_message');

    scoreEl.innerText = score;

    if(score <= 50) {
        scoreEl.style.color = "#38a169"; // Green
        msgEl.innerText = "No Concern. Within acceptable limits.";
        msgEl.style.backgroundColor = "#c6f6d5";
        msgEl.style.color = "#22543d";
    } else if (score <= 200) {
        scoreEl.style.color = "#d69e2e"; // Orange
        msgEl.innerText = "Attention Required. Monitor pattern.";
        msgEl.style.backgroundColor = "#feebc8";
        msgEl.style.color = "#744210";
    } else if (score <= 400) {
        scoreEl.style.color = "#dd6b20"; // Dark Orange
        msgEl.innerText = "Action Required. Consider verbal/written warning.";
        msgEl.style.backgroundColor = "#fbd38d";
        msgEl.style.color = "#7b341e";
    } else {
        scoreEl.style.color = "#e53e3e"; // Red
        msgEl.innerText = "Severe. Grounds for disciplinary hearing.";
        msgEl.style.backgroundColor = "#fed7d7";
        msgEl.style.color = "#822727";
    }

    document.getElementById('b_result').style.display = 'block';
}

// 5. Compa-Ratio Logic
function calcCompa() {
    const salary = parseFloat(document.getElementById('c_salary').value) || 0;
    const min = parseFloat(document.getElementById('c_min').value) || 0;
    const max = parseFloat(document.getElementById('c_max').value) || 0;

    if (salary <= 0 || min <= 0 || max <= 0 || min >= max) {
        alert("Please enter valid numbers. Note: Minimum must be less than Maximum.");
        return;
    }

    const midpoint = (min + max) / 2;
    const ratio = (salary / midpoint) * 100;

    document.getElementById('c_ratio').innerText = ratio.toFixed(1) + "%";

    const msgEl = document.getElementById('c_message');
    const bar = document.getElementById('c_bar');

    const rangeSpan = max - min;
    const positionInRange = ((salary - min) / rangeSpan) * 100;
    const visualWidth = Math.max(0, Math.min(100, positionInRange));

    bar.style.width = visualWidth + "%";

    if(ratio < 80) {
        msgEl.innerText = "Below Market (Risk of attrition)";
        bar.style.background = "#e53e3e";
    } else if (ratio >= 80 && ratio <= 120) {
        msgEl.innerText = "Market Competitive";
        bar.style.background = "#38a169";
    } else {
        msgEl.innerText = "Above Market (Premium)";
        bar.style.background = "#3182ce";
    }

    document.getElementById('c_result').style.display = 'block';
}

// 6. Interview Generator Logic
function genQuestions() {
    const comp = document.getElementById('i_competency').value;
    const level = document.getElementById('i_level').value;
    const list = document.getElementById('i_questions_list');
    const indic = document.getElementById('i_indicators');

    // Database of Questions (Expanded V2.0)
    const db = {
        'resilience': {
            'entry': [
                "Tell me about a time you received critical feedback. How did you handle it?",
                "Describe a situation where a project didn't go as planned. What was your immediate reaction?",
                "Tell me about a time you had to learn a new skill very quickly to complete a task.",
                "Describe a time you were overwhelmed by your workload. How did you prioritize?"
            ],
            'mid': [
                "Describe a time you had to pivot your team's strategy due to a sudden market change.",
                "Tell me about a significant failure in your career. What specific steps did you take to recover?",
                "Tell me about a time you had to deliver results with significantly fewer resources than you requested.",
                "Describe a time you had to keep your team motivated during a period of uncertainty or layoffs."
            ],
            'exec': [
                "Share an example of a time you led an organization through a crisis. How did you maintain morale?",
                "Describe a situation where you had to make a high-stakes decision with incomplete information.",
                "Tell me about a time you faced intense scrutiny from the board or investors. How did you respond?",
                "Describe a time you had to rebuild trust with a client or department after a major breach."
            ],
            'psych': "Look for: Internal Locus of Control (taking responsibility) vs. External Blaming. Candidates should demonstrate 'Growth Mindset'—viewing failure as data rather than a personal deficit."
        },
        'conflict': {
            'entry': [
                "Tell me about a time you disagreed with a peer. How did you resolve it?",
                "Describe a time you had to work with a difficult personality.",
                "Tell me about a time you felt a supervisor treated you unfairly. How did you address it?",
                "Describe a time there was a miscommunication that caused an error. How did you fix it?"
            ],
            'mid': [
                "Describe a situation where you had to mediate a dispute between two direct reports.",
                "Tell me about a time you had to push back against a senior manager's decision.",
                "Describe a time you had to negotiate with a stakeholder who was initially hostile to your idea.",
                "Tell me about a time you had to align two departments with competing KPIs."
            ],
            'exec': [
                "Tell me about a time you navigated a political conflict between departments.",
                "Describe how you handle misalignment between the board's vision and operational reality.",
                "Tell me about a time you had to dissolve a partnership or fire a key vendor.",
                "Describe a time you had to manage a 'culture clash' during a merger or acquisition."
            ],
            'psych': "Look for: Emotional Regulation and 'I' statements. High-potential candidates focus on the solution, not the drama. Watch for Empathy—can they articulate the other person's perspective?"
        },
        'leadership': {
            'entry': [
                "Tell me about a time you took initiative outside of your job description.",
                "Describe a time you had to persuade others to adopt your idea.",
                "Tell me about a time you stepped up to lead when the designated leader was absent.",
                "Describe a time you mentored or trained a peer who was struggling."
            ],
            'mid': [
                "Describe a time you had to deliver bad news to your team. How did you frame it?",
                "Tell me about how you developed an underperforming employee into a top performer.",
                "Describe a time you had to build a team from scratch. What traits did you look for?",
                "Tell me about a time you delegated a task that you really wanted to do yourself."
            ],
            'exec': [
                "Describe your philosophy on organizational culture. How do you operationalize it?",
                "Tell me about a strategic risk you took that paid off. What was your calculation?",
                "Describe the most difficult personnel decision (layoffs/restructuring) you have ever made.",
                "Tell me about a time you had to sacrifice short-term profits for long-term vision."
            ],
            'psych': "Look for: Transformational Leadership traits (vision, inspiration) vs. Transactional traits (rewards/punishment). Do they speak about 'We' or 'I'? True leaders share credit."
        },
        'innovation': {
            'entry': [
                "Tell me about a process you improved in your last role.",
                "Describe a creative solution you found to a routine problem.",
                "Tell me about a time you challenged the 'status quo' or the way things were always done.",
                "Describe a time you identified a mistake in a standard procedure."
            ],
            'mid': [
                "Describe a time you championed a new technology or tool despite resistance.",
                "Tell me about a time you identified a gap in the market or workflow.",
                "Describe a time you created an environment where it was safe for your team to fail.",
                "Tell me about a product or initiative you launched from concept to execution."
            ],
            'exec': [
                "How do you foster a culture of innovation in a risk-averse environment?",
                "Describe a time you disrupted your own business model to stay competitive.",
                "Tell me about a time you greenlit a 'moonshot' project. What was the outcome?",
                "Describe how you ensure your organization stays agile as it scales."
            ],
            'psych': "Look for: Openness to Experience (Big 5 Trait). Candidates should demonstrate curiosity and the ability to connect unrelated concepts (divergent thinking)."
        },
        'integrity': {
            'entry': [
                "Tell me about a time you were asked to do something you felt was unethical.",
                "Describe a time you made a mistake that no one else noticed. What did you do?",
                "Tell me about a time you had to admit you didn't know the answer.",
                "Describe a time you saw a colleague cutting corners. How did you handle it?"
            ],
            'mid': [
                "Describe a time you had to enforce a policy that made you unpopular.",
                "Tell me about a time you prioritized long-term reputation over short-term gain.",
                "Describe a time you discovered a discrepancy in financial or performance data.",
                "Tell me about a time you had to give honest feedback to a friend/colleague that risked the friendship."
            ],
            'exec': [
                "Describe a situation where transparency could have hurt the stock price/brand. How did you handle it?",
                "Tell me about a time your values conflicted with business objectives.",
                "Describe a time you took public responsibility for a systemic failure in your organization.",
                "Tell me about a time you turned down a profitable opportunity because it didn't align with company values."
            ],
            'psych': "Look for: Consistency and Moral Courage. Watch for hesitation or 'rehearsed' answers. Authentic integrity often involves admitting to vulnerability or difficulty in the decision."
        }
    };
    let html = "<ul style='padding-left: 20px;'>";
    if(db[comp] && db[comp][level]) {
        db[comp][level].forEach(q => {
            html += `<li style='margin-bottom: 10px; font-weight:500;'>“${q}”</li>`;
        });
    }
    html += "</ul>";

    list.innerHTML = html;
    indic.innerText = db[comp]['psych'];

    document.getElementById('i_result').style.display = 'block';
}
