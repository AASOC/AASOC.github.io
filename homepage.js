function formatDate(date){
	const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
	const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	const dayName = days[date.getDay()];
	const day = date.getDate();
	const month = months[date.getMonth()];

	let suffix
	if (day>3 && day<21) {
		suffix = "TH";
	} else {
		switch (day%10){
			case 1:
				suffix = "ST";
				break;
			case 2: 
				suffix = "ND";
				break;
			case 3: 
				suffix = "RD";
				break;
			default:
				suffix = "TH";
				break;
		}
	}


	return `${dayName} ${day}${suffix} ${month}`;
}

async function loadUpcoming() {
	const response = await fetch("https://www.aasoced.moe/events.json");
	const data = await response.json();
	const today = new Date();

	const events = data.events
	.filter(event => new Date(event.date) >= today)
	.slice(0,5);
	const container = document.getElementById("events");
	container.innerHTML += 
		events.map( event => `
		<div class="event">
		<img class="articleImg" src="images/${event.image}">
		<h3>${event.title.toUpperCase()}</h3>
		<p class="date"> ${formatDate(new Date(event.date))} ${event.time}</p>
		<p> ${event.desc} </br> Event Location: <a href=${event.locationmap}> ${event.location} </a></p>
		</div>

		`).join("");

	// NEED TO FIX THE CALENDAR BEFOREHAND; RESTRUCTURE WITH NEW EVENTS.JSON
	//			<a href="calendar.html">See our upcoming events for the month!</a>
	container.insertAdjacentHTML('beforeend', `
				<br />
				<hr />
		`);
} 

loadUpcoming();
