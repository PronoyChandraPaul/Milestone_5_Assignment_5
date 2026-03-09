let issues = [];
const container = document.getElementById("issuesContainer");
const loading = document.getElementById("loading");
const issueCount = document.getElementById("issueCount");

// this is load issues section

async function loadIssues(type) {

loading.classList.remove("hidden");

const res = await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
);

const data = await res.json();

issues = data.data;

// this is filter section

let filteredIssues = issues;

if(type === "open"){
filteredIssues = issues.filter(issue => issue.status === "open");
}

if(type === "closed"){
filteredIssues = issues.filter(issue => issue.status === "closed");
}

// this is count section

issueCount.innerText = filteredIssues.length;

// this is display section
displayIssues(filteredIssues);

loading.classList.add("hidden");

}

// this is display issues section
function displayIssues(data){

  container.innerHTML = "";

  data.forEach(issue => {

    //  border color 
    
    let borderColor = "border-emerald-500";
  
    if (issue.status === "closed") {
      borderColor = "border-purple-500";
    }

  });

}

// this is priority color section

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



// this is card click modal section

// this is modal section

// this is labels section

// this is close modal section

// this is tabs section

// this is default load section 

// this is add issue section 
