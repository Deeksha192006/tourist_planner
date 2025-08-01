// Simulated backend storage using localStorage
const backend = {
    getDestinations: function() {
        const data = localStorage.getItem("touristDestinations");
        return data ? JSON.parse(data) : [];
    },
    saveDestinations: function(destinations) {
        localStorage.setItem("touristDestinations", JSON.stringify(destinations));
    },
    addDestination: function(destination) {
        const destinations = this.getDestinations();
        destinations.push(destination);
        this.saveDestinations(destinations);
    },
    removeDestination: function(index) {
        const destinations = this.getDestinations();
        destinations.splice(index, 1);
        this.saveDestinations(destinations);
    }
};

// UI Logic
const form = document.getElementById("destinationForm");
const input = document.getElementById("destinationInput");
const list = document.getElementById("destinationList");

function renderList() {
    const destinations = backend.getDestinations();
    list.innerHTML = "";

    destinations.forEach((dest, idx) => {
        const li = document.createElement("li");
        li.textContent = dest;

        const removeBtn = document.createElement("span");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => {
            backend.removeDestination(idx);
            renderList();
        };

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dest = input.value.trim();
    if(dest){
        backend.addDestination(dest);
        input.value = "";
        renderList();
    }
});

// Initial render
renderList();
