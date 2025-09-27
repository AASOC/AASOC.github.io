let data = {};


let monthData;

async function initCalendar() {
	const response = await fetch("https://www.aasoced.moe/events.json");
	const data = await response.json();
	monthData = data["sept"]
	for (let day in monthData) {
		if (monthData[day].length !== 0) {
			document.getElementById(day).style.color = "#0c9dff";
			document.getElementById(day).style.background.color = "#0c9dff";
		}
		else {
			document.getElementById(day).style.color = "#898989";
		}
	}
}

window.onload = initCalendar;

function myFunction(element) {
	let textContent = element.textContent;
	let events = monthData[textContent]


	console.log(events.length)
	if (events.length === 0) {
	    document.getElementById("selectedDate").innerHTML = textContent + "  September";
	    document.getElementById("info").innerHTML = "No events on this day.";
	    return;
	}

	let text = "<ul>";
	for (let i = 0; i < events.length; i++) {
	 	text+= "<li>" + events[i]+ "</li>"
	}
	text += "<ul>";

	document.getElementById("info").innerHTML = text;
	document.getElementById("selectedDate").innerHTML = textContent + "  September";
	
}
