(function() {
window.onload = init;
var startButton;
var ranges = [
{ start: 1, end: 100 },
{ start: 101, end: 200 },
{ start: 201, end: 300 },
{ start: 301, end: 400 },
{ start: 401, end: 500 }
];
function init() {
startButton = document.getElementById("startButton");
startButton.onclick = sendDataToWorkers;
}
function handleReceipt(event) {
let data = event.data;
data.index = ranges.findIndex(range => range.start === data.start && range.end === data.end);
// Update local storage and display results
updateLocalStorage(data);
displayResults();
}
function sendDataToWorkers() {
startButton.disabled = true;
ranges.forEach(range => {
let worker = new Worker('computeWorker.js');
worker.onmessage = handleReceipt;
worker.postMessage(range);
});
}
function updateLocalStorage(newData) {
// Retrieve existing results from local storage
let storedResults = JSON.parse(localStorage.getItem('results')) || [];
// Add new data to the stored results
storedResults.push(newData);
// Save the updated results to local storage
localStorage.setItem('results', JSON.stringify(storedResults));
}
let localStorageArray = [];
function displayResults() {
let itemsList = document.getElementById('items');
itemsList.innerHTML = ''; // Clear existing items
// Retrieve and display results from local storage
let storedResults = JSON.parse(localStorage.getItem('results')) || [];
// Track the current size of the array before adding new elements
let previousSize = localStorageArray.length;
storedResults.forEach(result => {
let formattedResult = `{"index":${result.index},"start":${result.start},"end":${result.end},"result":${result.result}}`;
let listItem = document.createElement('li');
listItem.textContent = formattedResult;
listItem.style.fontSize = '14px';
itemsList.appendChild(listItem);
// Add each result to the localStorageArray
localStorageArray.push(result);
});
// Only sort the newly added portion of the array
sortNewEntries(previousSize);
// Update accumulated result
let sum = storedResults.reduce((acc, item) => acc + item.result, 0);
document.getElementById('sum').textContent = sum;
// Display local storage results
displayLocalStorage();  // Call displayLocalStorage to work with the updated localStorageArray
}
function sortNewEntries(previousSize) {
// Sort only the new entries added to the array
let newEntries = localStorageArray.slice(previousSize);
newEntries.sort((a, b) => a.index - b.index);
// Update lastIndex to track the batch start
if (newEntries.length > 0) {
let firstIndex = newEntries[0].index;
newEntries.forEach((entry, i) => {
if (entry.index === firstIndex) {
entry.isFirstInBatch = i === 0; // Mark only the first entry of the batch
entry.commas = ','.repeat(entry.index); // Add commas based on the index
} else {
entry.isFirstInBatch = false; // Ensure others are not marked
entry.commas = ''; // No commas for non-first entries
}
});
}
// Merge the sorted new entries back into the original array
localStorageArray.splice(previousSize, newEntries.length, ...newEntries);
}
function displayLocalStorage() {
let storageItems = document.getElementById('storageItems');
storageItems.innerHTML = ''; // Clear existing items
// Display each result in the sorted array
localStorageArray.forEach((result, index) => {
let formattedResult = `${result.commas}{"index":${result.index},"start":${result.start},"end":${result.end},"result":${result.result}}`;
// Add a comma after each entry in a batch, except the last entry of the last batch
if (index < localStorageArray.length - 1) {
formattedResult += ','; // Add comma after the entry
}
let listItem = document.createElement('li');
listItem.textContent = formattedResult;
listItem.style.fontSize = '14px'; // Adjust the font size as needed
// Apply bullet to the first entry of each batch
if (result.isFirstInBatch) {
listItem.style.listStyleType = 'disc'; // Apply bullet
} else {
listItem.style.listStyleType = 'none'; // No bullet
}
storageItems.appendChild(listItem);
});
}
})();