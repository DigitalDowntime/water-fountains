// This function is called when the button is clicked
function getLocation() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // If the browser supports geolocation, call showPosition. 
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // If the browser does not support geolocation, display an alert
        alert("Geolocation is not supported by this browser.");
    }
}

// This function is called when the browser supports geolocation
function showPosition(position) {
    // Get latitude and longitude from the position object passed in
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Display coordinates in HTML
    document.getElementById("latitude").innerHTML = `Latitude: ${latitude}`;
    document.getElementById("longitude").innerHTML = `Longitude: ${longitude}`;
}

