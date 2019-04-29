$(function (){
	let $flights = $('#flights');
	let $fname = $('#fname');
	let $fnameInput = '';
	let $lname = $('#lname');
	let $lnameInput = '';
	let $destination = $('#destination');
	let $destinationInput = '';
	let $dateTravelling = $('#date');
	let $dateTravellingInput = '';
	let $addDestinationButton = $('#add-destination');

	$.ajax({
		type: 'GET',
		url: 'http://www.filltext.com/?&rows=3&fname={firstName}&lname={lastName}&country={country}&date={date|1-1-2020,1-1-2025}',
		success: (flights) => {
			$.each(flights, (i, flight) => { 
				$flightDate = new Date(flight.date);

				formatDate = () => {
					month = '' + ($flightDate.getMonth() + 1),
					day = '' + ($flightDate.getDate()),
					year = '' + ($flightDate.getFullYear())

				if(month.length <2) month = '0' + month;
				if(day.length < 2) day = '0' + day;

				return [month, day, year].join('-');
				}

				$flights.append('<li>Name: '
				+ flight.fname + 
				' ' + flight.lname +
				' <br> Destination: '
				+ flight.country +
				' <br> Date: '
				+ formatDate() +
				'<p></li>');
			})
		}
	})

	$fname.on('input', () => {
		$fnameInput = $fname.val();
		console.log($fnameInput)
	})

	$lname.on('input', () => {
		$lnameInput = $lname.val();
	})
	
	$destination.on('input', () => {
		$destinationInput = $destination.val();	
	})

	$dateTravelling.on('input', () => {
		fullDate = $dateTravelling.val().split('-');
		year = fullDate.shift();
		fullDate.push(year);
		$dateTravellingInput = fullDate[0] + '-' + fullDate[1] + '-' + fullDate[2];
	})

	//Function for the Add button to add to the list and clear the inputs.
	$addDestinationButton.on('click', () => {
		$flights.append('<li>Name: '+ $fnameInput + ' ' + $lnameInput + '<br> Destination: '+ $destinationInput + '<br> Date: ' + $dateTravellingInput + '<p></li>')
		$fname.val('');
		$lname.val('');
		$destination.val('');
		$dateTravelling.val('');
	})

	
})