var playingstatus = false; //false  not play true playing
var score;
var action;
var timeremaining;
var correct_ans;

//if we click on start/reset button
document.getElementById("startreset").onclick = function() {
	//if we are playing(reset button)
	if (playingstatus == true) {
		//reload page
		location.reload();
	}
	//if we are not playing(play button)
	else {
		//set to play mode
		playingstatus = true;
		//set score to 0
		score = 0;
		document.getElementById("scorevalue").innerHTML = score;
		//show coundown box
		show("timeremaining");
		timeremaining = 60;
		hide("gameover");
		document.getElementById("timerremainingvalue").innerHTML = timeremaining;
		//change button to reset
		document.getElementById("startreset").innerHTML = "Reset Game";
		//reduce time by 1sec in loop
		startCoundown();

		//if there are time left
		//yes continue
		generateQA();
		//No game over

		//generate new question
	}
};

// function

// start counter
function startCoundown() {
	action = setInterval(function() {
		timeremaining -= 1;
		document.getElementById("timerremainingvalue").innerHTML = timeremaining;
		if (timeremaining == 0) {
			//game over
			stopCountdown();
			show("gameover");
			document.getElementById("gameover").innerHTML =
				"<p>Game over!</p><p>Your score is " + score + ".</p>";
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playingstatus = false;
			document.getElementById("startreset").innerHTML = "Start game";
		}
	}, 1000);
}
// stop counter
function stopCountdown() {
	clearInterval(action);
}
// hide an element
function hide(Id) {
	document.getElementById(Id).style.display = "none";
}
// show an element
function show(Id) {
	document.getElementById(Id).style.display = "block";
}

function generateQA() {
	var x = 1 + Math.round(Math.random() * 9); // 1 - 10
	var y = 1 + Math.round(Math.random() * 9); // 1 - 10
	correct_ans = x * y;
	document.getElementById("question").innerHTML = x + "x" + y;
	// fill one box with correct ans
	var correct_position = 1 + Math.round(Math.random() * 3);
	document.getElementById("box" + correct_position).innerHTML = correct_ans;
	// fill other boxes with wrong answer
	var answer = [correct_ans];
	for (i = 1; i < 5; i++) {
		if (i != correct_position) {
			// (!= is not equal (value or type))
			var wrong_ans;
			do {
				wrong_ans =
					(1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9)); //wrong ans;
			} while (answer.indexOf(wrong_ans) > -1);
			{
				document.getElementById("box" + i).innerHTML = wrong_ans;
				answer.push(wrong_ans);
			}
		}
	}
}

for (i = 1; i < 5; i++) {
	//if we click on answer box
	document.getElementById("box" + i).onclick = function() {
		//if we are playing
		if (playingstatus == true) {
			// this. is refer to inside the element already get
			//correct?
			if (this.innerHTML == correct_ans) {
				//yes
				//correct ans
				//increase score
				score++;
				document.getElementById("scorevalue").innerHTML = score;
				//show corect box for 1 sec
				hide("wrong");
				show("correct");
				setTimeout(function() {
					hide("correct");
				}, 1000);
				// generate new Q&A
				generateQA();
			} else {
				//no
				//wrong ans
				//show try again box for 1 sec
				hide("correct");
				show("wrong");
				setTimeout(function() {
					hide("wrong");
				}, 1000);
			}
		}
	};
}
