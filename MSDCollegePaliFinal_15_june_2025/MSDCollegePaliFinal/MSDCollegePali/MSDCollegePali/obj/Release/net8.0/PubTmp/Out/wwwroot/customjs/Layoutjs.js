
function updateClock() {
    const now = new Date();
    // Format date parts
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    // Format time parts
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, '0');

    const formatted = `${day}, ${month} ${date}, ${year} | ${hours}:${minutes}:${seconds} ${ampm}`;
    $('#Timer').text(formatted);
}

$(document).ready(function () {
    updateClock();
    setInterval(updateClock, 1000);
});


function LunchInquery() {
    $('#exampleModalLong').modal('show');
}
function HideLunchInquery() {
    $('#exampleModalLong').modal('hide');
}
