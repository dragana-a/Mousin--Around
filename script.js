let score = 0;
let highscore = 0;

var catID = 0;
var cheeseID = 0;

let displayCheese;
let displayCat;

let chtime = 800;
let ctime = 1000;

//start the game and creates instances of cheese and cats
function startGame() {
	document.getElementById( 'board' ).innerHTML = '';

	//make cheese every 8ms
	displayCheese = setInterval( () => makeCheese(), chtime );
	//make cat every 9ms
	displayCat = setInterval( () => makeCat(), ctime );
}

//reload the page
function Reset() {
	location.reload();
}

//called when a cat it clicked, ends game resets score
function endGame() {
	if (score > highscore){
		highscore = score; 
		document.getElementById( 'highscore' ).textContent = highscore;
	}

	score = 0;
	document.getElementById( 'score' ).textContent = score;

	//stop cat and cheese ganeration
	clearInterval( displayCat );
	clearInterval( displayCheese );

	document.getElementById( 'board' ).innerHTML = '';


	//gameover text screen
	gameboard = document.getElementById( 'board' );
	const svgNS = "http://www.w3.org/2000/svg";

	let msg = document.createElementNS( svgNS, "text" );
	msg.setAttribute( "x", "50" );
	msg.setAttribute( "y", "200" );
	msg.setAttribute( "fill", "red" );
	msg.setAttribute( "stroke", "black" );
	msg.setAttribute( "font-size", "90" );

	msg.textContent = "G A M E O V E R !"
	gameboard.appendChild( msg );

	//triple skulls after game over
	let skull = document.createElementNS( svgNS, "text" );
	skull.setAttribute( "x", "220" );
	skull.setAttribute( "y", "350" );
	skull.setAttribute( "font-size", "80" );

	skull.textContent = "\u{1F480} \u{1F480} \u{1F480}";
	gameboard.appendChild( skull );

}

//create cheese object, randomly display on game board
function makeCheese() {
	gameboard = document.getElementById( 'board' );
	const svgNS = "http://www.w3.org/2000/svg";

    //make the cheese
	let cheese = document.createElementNS( svgNS, "polygon" );
	cheese.setAttribute( "id", "cheese" + cheeseID );
	cheese.setAttribute( "class", "cheese" );
	cheese.setAttribute( "points", "50,5 5,95 95,95" );
	cheese.setAttribute( "fill", "yellow" );
	cheese.setAttribute( "stroke", "orange" );
	cheese.setAttribute( "stroke-width", "5" );

	//move to a random location
	//max x and y minus the objects size for coordinate range
	const X = 800 - 190;
	const Y = 500 - 190;
	const randomX = Math.random() * X;
	const randomY = Math.random() * Y;

	//move to new location, onclick delete
	cheese.setAttribute( "transform", `translate(${randomX}, ${randomY})` );
	cheese.setAttribute( "onclick", "deleteCheeseElement(this.id)" );

	cheeseID++;
	gameboard.appendChild( cheese );

	//cheesel lives for every 2 seconds
	//for every missed cheese, lose 1 point, score cant go below 0
	setTimeout( () => {
		if ( document.getElementById( cheese.id ) ) {
			score--;
			document.getElementById( 'score' ).textContent = score;
			if ( score <= "0" ) {
				score = 0;
				document.getElementById( 'score' ).textContent = score;
			}
			cheese.remove()
		}
	}, 2000 );

}


function makeCat() {

	gameboard = document.getElementById( 'board' );
	const svgNS = "http://www.w3.org/2000/svg";

    //make the cat
	let cat = document.createElementNS( svgNS, "polygon" );
	cat.setAttribute( "id", "cat" + catID );
	cat.setAttribute( "class", "cat" );
	cat.setAttribute( "points", "5,5 5,105 55,155 105,155 155,105 155,5 105,55 55,55" );
	cat.setAttribute( "stroke", "black" );
	cat.setAttribute( "stroke-width", "5" );
	cat.setAttribute( "fill", "gray" );

	//move to a random location
	//max x and y minus the objects size for coordinate range
	const X = 800 - 105;
	const Y = 500 - 155;
	const randomX = Math.random() * X;
	const randomY = Math.random() * Y;

	//move to new location, onclick delete
	cat.setAttribute( "transform", `translate(${randomX}, ${randomY})` );
	cat.setAttribute( "onclick", "deleteCatElement(this.id)" );

	catID++;
	gameboard.appendChild( cat );

	//cat dissapear after every 5 sec
	setTimeout( () => {
		cat.remove();
	}, 5000 );

}

//onclick event when cheese is clicked, adds point, deletes cheese
function deleteCheeseElement( cheeseID ) {
	score++;
	document.getElementById( 'score' ).textContent = score;
	let node = document.getElementById( cheeseID );
	node.parentNode.removeChild( node );
}

//onclick event for cat, ends game
function deleteCatElement( catID ) {
	let node = document.getElementById( catID );
	node.parentNode.removeChild( node );
	endGame();
}

form.addEventListener('submit', function(event) {

	event.preventDefault();

//for every boxed thats checked the time is changed and the game is restarted

	if (document.getElementById('cb_easy').checked) {
		ctime = 1000; 
		chtime = 1000;
		startGame();
		
	}
	if (document.getElementById('cb_medium').checked) {
		ctime = 900;
		chtime = 800;
		startGame();
	}
	if (document.getElementById('cb_hard').checked) {
		ctime = 700;
		chtime = 600;
		startGame();
	}
});
	
let checkboxes = document.querySelectorAll('.checkbox');

// stops multiple boxes being clicked
//for each check box its given a click listener

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
	//each box is an item, and checks if it was clicked
        checkboxes.forEach(function(item) {
	    //stops multiple boxes from being clicked
            if (item !== checkbox) {
                item.checked = false; 
            }
        });
    });
});