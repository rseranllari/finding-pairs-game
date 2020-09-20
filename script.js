
var cardsArray = [
    {    'name': 'sazuke',    'img': 'url(sazuke.jpg)',  },
    {    'name': 'naruto',    'img': 'url(naruto.jpg',  },
    {    'name': 'hinata',    'img': 'url(hinata.jpg',  },
    {    'name': 'gaara',     'img': 'url(gaara.jpg',  },
    {    'name': 'itachi',    'img': 'url(itachi.jpg',  },
    {    'name': 'jiraya',    'img': 'url(jiraya.jpg',  },
    {    'name': 'kakashi',   'img': 'url(kakashi.jpg',  },
    {    'name': 'li',        'img': 'url(li.jpg',  },
    {    'name': 'nine-tails','img': 'url(nine-tails.jpg',  },
    {    'name': 'paine',     'img': 'url(paine.jpg',  },
    {    'name': 'shadow',    'img': 'url(shadow.jpg',  },
    {    'name': 'tsuande',   'img': 'url(tsunade.jpg',  },
];

  // Duplicate cardsArray to create a match for each card
  var gameGrid = cardsArray.concat(cardsArray);
  
  // Randomize game grid on each load
  gameGrid.sort(function() {
    return 0.5 - Math.random();
  })
  
  // Grab the div with an id of game-board and assign to a variable game
  var game = document.getElementById('board-game');
  // Create a section element and assign it to variable grid
  var grid = document.createElement('section');
  // Give section element a class of grid.
  grid.setAttribute('class', 'grid');
  // Append the grid section to the game-board div
  game.appendChild(grid);
  
  // Loop through each item in our cards array
  for (i = 0; i < gameGrid.length; i++) {
    // create a div element and assign to variable card
    var card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;
    
    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back'); 

    back.style.backgroundImage = gameGrid[i].img; 

    grid.appendChild(card); 
    card.appendChild(front);
    card.appendChild(back); 

  }
  
  var firstGuess = '';
  var secondGuess = '';
  // Set count to 0
  var count = 0;
  var previousTarget = null;

  var delay = 1200; 
  
  // Add match CSS
  var match = function() {
    var selected = document.querySelectorAll('.selected');
    // loop through the array like object containing `selected` class
    for (i = 0; i < selected.length; i++) {
      selected[i].classList.add('match');
    }
  };

  //Resset guesses 

  var resetGuesses = function () {
      firstGuess = '';
      secondGuess = '';
      count = 0;
      previousTarget = null; 

      var selected = document.querySelectorAll('.selected');
      for (i = 0; i < selected.length; i++) {
          selected[i].classList.remove('selected'); 

      }
  }
  
  // Add event listener to grid
  grid.addEventListener('click', function(event) {
    // Declare variable to target our clicked item
    var clicked = event.target;
    // Do not allow the grid section itself to be selected;
    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
      return;
    }
    // We only want to add `selected` class if the current count is less than 2
    if (count < 2) {
      count++;
  
      if (count === 1) {
        // Assign first guess
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        // Assign second guess
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
      // If both guesses are not empty
      if (firstGuess !== '' && secondGuess !== '') {
        // And the firstGuess matches secondGuess
        if (firstGuess === secondGuess) {
          // Run the match function
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);

        }
        else {
            setTimeout(resetGuesses, delay);
        }
      }
      previousTarget = clicked;
    }
  });
