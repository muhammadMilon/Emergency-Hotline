// Emergency services data
const emergencyServices = [
    {
        id: 1,
        name: "National Emergency Number",
        description: "National Emergency",
        number: "999",
        category: "All",
        icon: "fas fa-exclamation-triangle",
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        image: "./assets/emergency.png"
    },
    {
        id: 2,
        name: "Police Helpline Number",
        description: "Police",
        number: "999",
        category: "Police",
        icon: "fas fa-shield-alt",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        image: "./assets/police.png"
    },
    {
        id: 3,
        name: "Fire Service Number",
        description: "Fire Service",
        number: "999",
        category: "Fire",
        icon: "fas fa-fire-extinguisher",
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        image: "./assets/fire-service.png"
    },
    {
        id: 4,
        name: "Ambulance Service",
        description: "Ambulance",
        number: "1994-999999",
        category: "Health",
        icon: "fas fa-ambulance",
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        image: "./assets/ambulance.png"
    },
    {
        id: 5,
        name: "Women & Child Helpline",
        description: "Women & Child Helpline",
        number: "109",
        category: "Help",
        icon: "fas fa-hands-helping",
        bgColor: "bg-pink-100",
        iconColor: "text-pink-600",
        image: "./assets/emergency.png"
    },
    {
        id: 6,
        name: "Anti-Corruption Helpline",
        description: "Anti-Corruption",
        number: "106",
        category: "Govt.",
        icon: "fas fa-gavel",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        image: "./assets/emergency.png"
    },
    {
        id: 7,
        name: "Electricity Helpline",
        description: "Electricity Outage",
        number: "16216",
        category: "Electricity",
        icon: "fas fa-bolt",
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
        image: "./assets/emergency.png"
    },
    {
        id: 8,
        name: "BRAC Helpline",
        description: "BRAC",
        number: "16445",
        category: "NGO",
        icon: "fas fa-heart",
        bgColor: "bg-indigo-100",
        iconColor: "text-indigo-600",
        image: "./assets/brac.png"
    },
    {
        id: 9,
        name: "Bangladesh Railway Helpline",
        description: "Bangladesh Railway",
        number: "163",
        category: "Travel",
        icon: "fas fa-train",
        bgColor: "bg-gray-100",
        iconColor: "text-gray-600",
        image: "./assets/Bangladesh-Railway.png"
    }
];


// Global variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];
let likedServices = new Set();

// DOM elements
const heartCountElement = document.getElementById('heartCount');
const coinCountElement = document.getElementById('coinCount');
const copyCountElement = document.getElementById('copyCount');
const cardsContainer = document.getElementById('cardsContainer');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Initialize the application
function init() {
    renderCards();
    updateCounters();
    setupEventListeners();
}

// Render emergency service cards
function renderCards() {
    cardsContainer.innerHTML = '';
    
    emergencyServices.forEach(service => {
        const card = createServiceCard(service);
        cardsContainer.appendChild(card);
    });
}

// Create individual service card
function createServiceCard(service) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bg-white rounded-xl shadow-lg p-8 card-hover';
    
    const isLiked = likedServices.has(service.id);
    
    cardDiv.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <div class="p-4 rounded-2xl ${service.bgColor}">
                <img src="${service.image}" alt="${service.name}" class="w-10 h-10 object-cover rounded-full">
            </div>
            <button class="heart-btn heart-icon ${isLiked ? 'liked' : 'text-gray-400'}" data-service-id="${service.id}">
                <i class="fas fa-heart text-xl"></i>
            </button>
        </div>
        
        <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-800 mb-1">${service.name}</h3>
            <p class="text-gray-600">${service.description}</p>
        </div>
        
        <div class="mb-4">
            <div class="text-2xl font-bold text-gray-800 mb-2">${service.number}</div>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${service.category}</span>
        </div>
        
        <div class="flex space-x-2">
            <button class="copy-btn btn-secondary flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2" data-number="${service.number}">
                <i class="fas fa-copy"></i>
                <span>Copy</span>
            </button>
            <button class="call-btn btn-primary text-white flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2" 
                    data-service-name="${service.name}" data-service-number="${service.number}">
                <i class="fas fa-phone"></i>
                <span>Call</span>
            </button>
        </div>
    `;
    
    return cardDiv;
}


// Setup event listeners
function setupEventListeners() {
    // Heart button clicks
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.heart-btn')) {
            const heartBtn = e.target.closest('.heart-btn');
            const serviceId = parseInt(heartBtn.dataset.serviceId);
            toggleHeart(serviceId, heartBtn);
        }
    });
    
    // Copy button clicks
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.copy-btn')) {
            const copyBtn = e.target.closest('.copy-btn');
            const number = copyBtn.dataset.number;
            copyToClipboard(number);
        }
    });
    
    // Call button clicks
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.call-btn')) {
            const callBtn = e.target.closest('.call-btn');
            const serviceName = callBtn.dataset.serviceName;
            const serviceNumber = callBtn.dataset.serviceNumber;
            makeCall(serviceName, serviceNumber);
        }
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);
}

// Toggle heart functionality
function toggleHeart(serviceId, heartBtn) {
    heartCount++;
    updateCounters();
}

// Copy to clipboard functionality
async function copyToClipboard(number) {
    try {
        await navigator.clipboard.writeText(number);
        alert(`Hotline number ${number} copied to clipboard!`);
        copyCount++;
        updateCounters();
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(`Hotline number ${number} copied to clipboard!`);
        copyCount++;
        updateCounters();
    }
}

// Call functionality
function makeCall(serviceName, serviceNumber) {
    if (coinCount < 20) {
        alert('Insufficient coins! You need at least 20 coins to make a call.');
        return;
    }
    
    alert(`Calling ${serviceName} at ${serviceNumber}`);
    
    coinCount -= 20;
    
    const currentTime = getCurrentTime();
    const historyItem = {
        serviceName: serviceName,
        serviceNumber: serviceNumber,
        time: currentTime
    };
    
    callHistory.unshift(historyItem);
    
    updateCounters();
    updateHistoryDisplay();
}

// Get current local time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

// Update counters display
function updateCounters() {
    heartCountElement.textContent = heartCount;
    coinCountElement.textContent = coinCount;
    copyCountElement.textContent = copyCount;
}

// Update history display
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');

    if (callHistory.length === 0) {
        historyList.innerHTML = '<p class="text-gray-500 text-center py-8">No calls made yet</p>';
        return;
    }
    
    historyList.innerHTML = '';

    callHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-2';

        const leftDiv = document.createElement('div');
        leftDiv.innerHTML = `
            <div class="font-medium text-gray-800 text-sm">${item.serviceName}</div>
            <div class="text-gray-600 text-xs">${item.serviceNumber}</div>
        `;

        const rightDiv = document.createElement('div');
        rightDiv.className = 'text-gray-500 text-xs';
        rightDiv.textContent = item.time;

        historyItem.appendChild(leftDiv);
        historyItem.appendChild(rightDiv);

        historyList.appendChild(historyItem);
    });
}

// Clear history functionality
function clearHistory() {
    callHistory = [];
    updateHistoryDisplay();
    alert('Call history cleared successfully!');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
