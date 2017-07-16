var totalScore = [0,0],
currentScore = [0,0],
newBtn = document.getElementsByClassName('new')[0],
holdBtn = document.getElementsByClassName('hold')[0],
dropBtn = document.getElementsByClassName('drop')[0],
diceImg = document.getElementsByClassName('dice')[0],
diceImg2 = document.getElementsByClassName('dice-2')[0],
currentScoreElement1 = document.getElementsByClassName('player-1-current-score-header')[0],
currentScoreElement2 = document.getElementsByClassName('player-2-current-score-header')[0],
activePlayer = 0,
winnerState = 0,
scoreBtn = document.getElementById('scoreBtn'),
inputScore,
prevDice,
prevDice2;

currentScoreElement1.textContent = 0;
currentScoreElement2.textContent = 0;
document.getElementById('total-0').textContent = 0;
document.getElementById('total-1').textContent = 0;



function change(){
		currentScore[activePlayer] = 0;
		document.getElementById('current-'+activePlayer).textContent = currentScore[activePlayer];
		document.getElementsByClassName('head')[0].classList.remove('active');
		document.getElementsByClassName('head')[1].classList.remove('active');
		if(activePlayer === 0){
			activePlayer = 1;
			document.getElementsByClassName('player-'+(activePlayer+1)+'-header')[0].classList.toggle('active');

		}else{

			activePlayer = 0;
			document.getElementsByClassName('player-'+(activePlayer+1)+'-header')[0].classList.toggle('active');

		}
};

dropBtn.addEventListener('click', function(){

	if (winnerState){
		return;
	}
	
	var dice = Math.floor(Math.random()*6) + 1;
	var dice2 = Math.floor(Math.random()*6) + 1;



	
	diceImg.src = 'img/dice-' + dice + '.png';
	diceImg2.src = 'img/dice-' + dice2 + '.png';

	console.log(dice +' '+ dice2);
	if (prevDice == 6 && dice == 6 || prevDice2 == 6 && dice2 == 6 || prevDice2 == 6 && dice == 6 || prevDice == 6 && dice2 == 6  ) {
		totalScore[activePlayer] = 0;
		document.getElementById('total-' + activePlayer).textContent = 0;
		console.log('looser player ' + activePlayer + ' ' + currentScore[activePlayer] );
		change();
		
		//return;
	}
	else if(dice != 1 && dice2 != 1 ){
		currentScore[activePlayer] += dice + dice2 ;
		document.getElementById('current-'+activePlayer).textContent = currentScore[activePlayer];

		if(dice == 6 && dice2 == 6){
			totalScore[activePlayer] = 0;
			console.log('looser player ' + activePlayer + ' ' + currentScore[activePlayer] );
			document.getElementById('total-' + activePlayer).textContent = 0;
			change();
		}
		
	}
	else{

		change();

	}

	prevDice = dice;
	prevDice2 = dice2;

});

holdBtn.addEventListener('click', function(){

		if (winnerState){
		return;
		}
	
	totalScore[activePlayer] += currentScore[activePlayer];
	document.getElementById('total-' + activePlayer).textContent = totalScore[activePlayer];

	if (totalScore[activePlayer] >= inputScore) {
		document.getElementsByClassName('player-'+(activePlayer+1)+'-header')[0].textContent = 'winner';
		document.getElementsByClassName('player-'+(activePlayer+1)+'-header')[0].classList.add('winner');
		winnerState = 1;
	}else{
		change();

	}
			
});

newBtn.addEventListener('click', function(){
	winnerState = 0;
	totalScore[0] = 0;
	totalScore[1] = 0;
	currentScore[0] = 0;
	currentScore[1] = 0;
	document.getElementById('total-0').textContent = 0;
	document.getElementById('total-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	activePlayer = 0;
	document.getElementsByClassName('player-1-header')[0].textContent = 'player-1';
	document.getElementsByClassName('player-2-header')[0].textContent = 'player-2';
	document.getElementsByClassName('player-1-header')[0].classList.remove('winner');
	document.getElementsByClassName('player-2-header')[0].classList.remove('winner');
    document.getElementsByClassName('player-1-header')[0].classList.add('active');
	document.getElementsByClassName('player-2-header')[0].classList.remove('active');
});


scoreBtn.addEventListener('click', function(e){
	e.preventDefault;
	 inputScore = document.getElementById('input-val').value;
	if (inputScore != '') {
		document.getElementsByClassName('input')[0].classList.add('zoomOut');
		
		setTimeout(function(){ document.getElementsByClassName('input')[0].style.display = 'none'; }, 500);
	}
});