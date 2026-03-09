let issues = [];
const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");
const issueCount = document.getElementById("issueCount");

/* Load Issues */

async function loadIssues(type) {

spinner.classList.remove("hidden");

const res = await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
);

const data = await res.json();

issues = data.data;

/* Filter */

let filteredIssues = issues;

if(type === "open"){
filteredIssues = issues.filter(issue => issue.status === "open");
}

if(type === "closed"){
filteredIssues = issues.filter(issue => issue.status === "closed");
}

/* Count */

issueCount.innerText = filteredIssues.length;

/* Display */

displayIssues(filteredIssues);

spinner.classList.add("hidden");

}

/* Display Issues */

function displayIssues(data){

container.innerHTML = "";

data.forEach(issue => {

/* Border color */

let borderColor = "border-emerald-500";

if(issue.status === "closed"){
borderColor = "border-purple-500";
}

/* Priority color */

let priorityColor = "bg-red-50 text-red-500 border-red-100";

if(issue.priority.toLowerCase() === "medium"){
priorityColor = "bg-amber-50 text-amber-500 border-amber-100";
}

if(issue.priority.toLowerCase() === "low"){
priorityColor = "bg-green-50 text-green-500 border-green-100";
}

const card = document.createElement("div");

card.className =
`bg-white rounded-lg shadow-sm border-t-4 ${borderColor} overflow-hidden cursor-pointer`;

card.innerHTML = `

<div class="p-5">

<div class="flex justify-between items-center mb-4">

<div class="w-8 h-8 border-2 border-dashed border-emerald-400 rounded-full flex items-center justify-center">

${issue.status === "open" ? "✅" : ""}
${issue.status === "closed" ? "✔️" : ""}

</div>

<span class="text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${priorityColor}">
${issue.priority}
</span>

</div>

<h3 class="font-bold text-gray-800 text-lg leading-tight">
${issue.title}
</h3>

<p class="text-gray-400 text-sm mt-2 mb-4">
${issue.description}
</p>

<div class="flex gap-2 flex-wrap">

${issue.labels?.map(label => `
<span class="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-200 uppercase italic">
${label}
</span>
`).join("")}

</div>

</div>

<div class="border-t border-gray-100 p-4 bg-white">

<p class="text-xs text-gray-400">
#${issue.id ?? "new"} by ${issue.author}
</p>

<p class="text-xs text-gray-400 mt-1">
${issue.createdAt}
</p>

</div>

`;

/* Card click modal */

card.addEventListener("click", () => openModal(issue));

container.appendChild(card);

});

}

/* Modal */

function openModal(issue){

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalAuthor").innerText = issue.author;
document.getElementById("modalDate").innerText = issue.createdAt;
document.getElementById("modalDesc").innerText = issue.description;
document.getElementById("modalAssignee").innerText = issue.author;

document.getElementById("modalPriority").innerText = issue.priority;

/* Status */

const status = document.getElementById("modalStatus");

status.innerText = issue.status;

if(issue.status === "open"){

status.className =
"px-3 py-1 rounded-md text-white text-xs font-semibold bg-green-500";

}
else{

status.className =
"px-3 py-1 rounded-md text-white text-xs font-semibold bg-purple-500";

}

/* Labels */

const labels = document.getElementById("modalLabels");

labels.innerHTML =
issue.labels?.map(label => `
<span class="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
${label}
</span>
`).join("") || "";

/* Show modal */

  document.getElementById("modal").classList.remove("hidden");
modal.classList.add("flex");

}

/* Close modal */

function closeModal(){

document.getElementById("modal").classList.add("hidden");

}

/* Search */

async function searchIssue(){

const text = document.getElementById("searchInput").value;

spinner.classList.remove("hidden");

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();

issueCount.innerText = data.data.length;

displayIssues(data.data);

spinner.classList.add("hidden");

}

/* Tabs */

function changeTab(type,btn){

document.querySelectorAll(".tabBtn").forEach(button=>{

button.classList.remove("bg-red-500","text-white");

button.classList.add("bg-gray-300","text-gray-700");

});

btn.classList.remove("bg-gray-300","text-gray-700");

btn.classList.add("bg-red-500","text-white");

loadIssues(type);

}

/* Default load */

loadIssues("all");

/* New Issue Modal */

function openNewIssueModal(){

const modal = document.getElementById("newIssueModal");

modal.classList.remove("hidden");
modal.classList.add("flex");

}


function closeNewIssueModal(){

const modal = document.getElementById("newIssueModal");

modal.classList.add("hidden");
modal.classList.remove("flex");

}


/* Add Issue */

function addIssue(){

const title = document.getElementById("issueTitle").value;

const desc = document.getElementById("issueDesc").value;

const priority = document.getElementById("issuePriority").value;

const newIssue = {

id: Date.now(),

title: title,

description: desc,

priority: priority,

author: "You",

status: "open",

createdAt: "Today",

labels: ["new"]

};

issues.unshift(newIssue);

/* Update UI */

displayIssues(issues);

issueCount.innerText = issues.length;

closeNewIssueModal();

}
