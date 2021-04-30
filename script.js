var Airtable = require("airtable");

var base = new Airtable({
	apiKey: "keyHlW6YblyFsAAJ0"
}).base(
	"appSzw07zflnZCky4"
);

base("namecard")
	.select({})
	.eachPage(gotPageOfCards, gotAllCards);

var cards = [];
var groupingcards = [];
var count=0;

function gotPageOfCards(records, fetchNextPage) {
	console.log("gotPageOfCards()");
	records.forEach(rec => {
		cards.push(rec.fields);
	});
	// cards.push(...records);

	fetchNextPage();
}

function gotAllCards(err) {
	console.log("gotAllCards()");

	if (err) {
		console.log("error loading data");
		console.error(err);
		return;
	}

	consoleLogCards();
	showCards("Design");
}

function consoleLogCards() {
	console.log("consoleLogCards()");
	// cards.forEach(card => {
	// 	console.log("card:", card);
	// });

	groupingcards = getGroup(cards, 'Field')

}

function getGroup(data, key) {
	let groups = {};
	data.forEach(card => {
		let value = card[key];
		groups[value] = groups[value] || [];
		groups[value].push(card);
	});
	return groups;
}

function showCards(type) {
	console.log("showCards()");
	let grcards = groupingcards[type];

	let content = document.getElementById("content");
	content.innerHTML = "";
	count=grcards.length;
	grcards.forEach((card,index) => {
		if (card.Name == 'Natalie Kendrick') {
			debugger;
		}
		let rote="";
		if(index<8){
			rote="rotate"+index;
		}else{
			rote="rotate"+index%8;
		}
		var div = document.createElement("div");
		var cardContainer = document.createElement("div");
		div.classList.add("container");
		div.classList.add(rote);
		div.onclick=function(){
			cardClick(this)
		};
		div.appendChild(cardContainer);
		content.appendChild(div);
		// document.body.appendChild(div);
		cardContainer.classList.add("card-container");

		var cardName = document.createElement("h2");
		cardName.classList.add("card-Name");
		cardName.innerText = card.Name;
		cardContainer.append(cardName);

		var cardField = document.createElement("h5");
		cardField.classList.add("card-Field");
		cardField.innerText = card.Field;
		cardContainer.append(cardField);

		var cardInstagram = document.createElement("p");
		cardInstagram.classList.add("card-Instagram");
		cardInstagram.innerText = card.Instagram;
		cardContainer.append(cardInstagram);

		var cardEmail = document.createElement("p");
		cardEmail.classList.add("card-Email");
		cardEmail.innerText = card.Email;
		cardContainer.append(cardEmail);

		if (Object.keys(card).includes("Photo")) {
			var cardPhoto = document.createElement("img");
			cardPhoto.classList.add("card-Photo");
			cardPhoto.src = card.Photo[0].url;
			cardContainer.append(cardPhoto);
		}
		else
		{
			var divimage = document.createElement("div");
			divimage.classList.add("card-divPhoto");
			cardContainer.append(divimage);
		}

		// cardContainer.classList.add(card.Field);

		// var filterDesign = document.querySelector(".Design");
		// filterDesign.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Design")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterArt = document.querySelector(".Art");
		// filterArt.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Art")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterIllustration = document.querySelector(".Illustration");
		// filterIllustration.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Illustration")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterFashion = document.querySelector(".Fashion");
		// filterFashion.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Fashion")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterPhotography = document.querySelector(".Photography");
		// filterPhotography.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Photography")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterMusic = document.querySelector(".Music");
		// filterMusic.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Music")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });

		// var filterOthers = document.querySelector(".Others");
		// filterOthers.addEventListener("click", function() {
		// 	if (cardContainer.classList.contains("Others")) {
		// 		cardContainer.style.background = "red";
		// 	} else {
		// 		cardContainer.style.background = "white";
		// 	}
		// });



	});
}
var index = 0;
function cardClick(self){
	  var card = $(self);
	  $(".container").addClass("top");
	  if(index < count) {
			$(self).removeClass("top").addClass("bottom");
			index++;
	  }
	  if(index == count) {
		$(".container").removeClass("bottom");
		index = 0;
	  }
	  shuffle(card);
}
function shuffle(card) {
	TweenLite.fromTo(
		card, 
		0.6, 
		{
		x:410, 
		y:-15, 
		ease: Expo.easeOut}, 
		{
		x:0,
		y:0,
		ease: Expo.easeIn});
};