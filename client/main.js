// This function is called when the button is clicked
function getLocation() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // If the browser supports geolocation, call showPosition. 
        navigator.geolocation.getCurrentPosition(showPosition, () => {}, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
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

function getWeightOfDeviceType() {
    // Get device info
    let deviceInfo = navigator.userAgent;
    // Display device info in HTML
    document.getElementById("deviceInfo").innerHTML = `Device Info: ${deviceInfo}`;

    // If the device is a mobile device, return a weight of 1
    if (deviceInfo.includes("Mobile")) {
        document.getElementById("deviceType").innerHTML = `Device Type: Mobile`;
        return 1;
    } else {
        document.getElementById("deviceType").innerHTML = `Device Type: not Mobile`;
        // If the device is not a mobile device, return a weight of 0.5
        return 0.5;
    }
}