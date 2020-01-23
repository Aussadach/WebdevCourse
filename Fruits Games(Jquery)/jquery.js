var playing = false;
var score = 0;
var trialleft = 5;
var step;
var action;
var fruits = [
	"apple",
	"banana",
	"cherries",
	"grapes",
	"mango",
	"orange",
	"peach",
	"pear",
	"watermelon"
];
$(function() {
	//click on start button
	$("#startreset").click(function() {
		//check are we playing
		if (playing) {
			//yes
			//relaod page
			location.reload();
		} else {
			//No
			$("#gameover").hide();
			//--set game mode is playing
			playing = true;
			//set score to 0
			score = 0;
			$("#scorevalue").html(score);
			//Show trail left box
			$("#trialleft").show();
			//--reset trial
			trialleft = 5;
			addHeart();
			//change play button to to reset
			$("#startreset").html("Reset Game");
			startAction();
		}
	});

$("#fruit1").mouseover(function() {
	score++;
	$("#scorevalue").html(score); //update score
	// document.getElementById("slicesound").play();
	 	$("#slicesound")[0].play(); //play sound access audio
	//stop fruit and hide
	//stopAction();
		clearInterval(action);

	 	$("#fruit1").hide("explode",400); //slide fruit //jQuery UI

	//send the new fruit
	//startAction();
         setTimeout(startAction, 500);
        


     });



	function addHeart() {
		$("#trialleft").empty();
		for (i = 0; i < trialleft; i++) {
			$("#trialleft").append('<img src="images/heart.png" class="life">');
		}
	}

	//start sendingg fruit
	function startAction() {
		//1.create random fruit
		$("#fruit1").show();
		chooseFruit();
		$("#fruit1").css({
			//random position
			left: Math.round(1450 * Math.random()),
			top: -50
		});
		//generate random step
		step = Math.round(Math.random() * 5) + 1; //change step
		//2.move fruit down 1 step evert 30 sec
		action = setInterval(function() {
			$("#fruit1").css("top", $("#fruit1").position().top + step); //.position method return position of object

			//is fruit too low
			if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
				//yes
				//any trial left
				if (trialleft > 1) {
					//yes
					//remove one heart
					//repeat  1.
					$("#fruit1").show();
					chooseFruit();
					$("#fruit1").css({
						//random position
						left: Math.round(1450 * Math.random()),
						top: -50
					});
					//generate random step
					step = Math.round(Math.random() * 5) + 1;

					//reduce life
					trialleft--;
					//regenerate heart by trial life
					addHeart();
				} else {
					//No
					playing = false;
					//change button to start game
					$("#startreset").html("Start Game");
					//show game over
					$("#gameover").show();
					$("#gameover").html("<p>Game Over!</p><p>Your score is :" + score + "</p>");
					//stop interval loop
					$("#trialleft").hide();
					stopAction();
				}
			} //no -> repeat 2.
		}, 10);
	}

	function chooseFruit() {
		//generate random fruit
		//define random fruit
		$("#fruit1").attr("src", "images/" + fruits[Math.floor(Math.random() * 8)] + ".png");
	}

	//stop droping fruit
	function stopAction() {
		clearInterval(action);
		$("#fruit1").hide();
	}

	// slice fruit
	//play sound
	// explode fruit
});
