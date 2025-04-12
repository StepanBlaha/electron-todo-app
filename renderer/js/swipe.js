// Function for updating score
function updateScore(change) {
  score += change;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function for creating a single card
function createCard(content) {
    // Create a card and add to the rest
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = content;
  cardContainer.appendChild(card);

  // Swipe mechanic
  const hammer = new Hammer(card);
  hammer.on('swipeleft swiperight', (ev) => {
    if (ev.type === 'swiperight') {
      updateScore(1);
      card.style.transform = 'translateX(100%) rotate(15deg)';
      console.log("Correct")
    } else {
      updateScore(0);
      card.style.transform = 'translateX(-100%) rotate(-15deg)';
      console.log("Wrong")
    }
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 400);
  });
}

// Function for loading the list with all the cards
function loadCardList(){
    // Get the cards
    const cardContainer = document.getElementById('all-cards');
    const cards = getCards();

    cards.then(result => {
        // Create the cards
        for (let i = result.length - 1; i >= 0; i--) {
            const card = document.createElement('div');
            card.className = 'card-all';
            card.innerHTML ="<div class='delete-punchcard-wrapper'><div class='delete-punchcard' data-id="+result[i]['id']+"></div></div><p class='card-text'>"+result[i]['content']+"</p>";
            cardContainer.appendChild(card);
        }
    })
    
}

// Function for triggerring the push card delete
async function setupCardDelete() {
    // Use event delegation on #todoContent for habitCheckId
    $("#all-cards").on("click", ".delete-punchcard", function() {
       // Get the id of the card to delete
       const taskID = $(this).data("id");
       console.log(taskID);
       //Run the delete function
       const result = cardDelete(taskID);
       //Get the result from the promise
       result.then(result => {
           console.log(result);
       }).then(() => {
           //Reload the push cards
           loadCardList();
       })
   });
}

// Function for deleting cards
async function cardDelete(postId) {
    try {
        //Get the records
        const response = JSON.parse(localStorage.getItem('punchCardRecords')) || [];
        let newRecords = [];
        //Filter the records to remove the deleted card
        for(let i = 0; i < response.length; i++){
            if(response[i].id != postId){
                newRecords.push(response[i]);
            }
        }
        //Set the new records to local storage
        localStorage.setItem('punchCardRecords', JSON.stringify(newRecords));
        console.log("Card deleted Successfully!");
    } catch (error) {
        console.log("Error deleting card.");
    }
}


 // Function for loading cards
 function loadCards() {
    // Empty the containers
    emptyCards();
    let cardList = [];
    // Get the cards
    const cards = getCards();
    cards.then(result => {
        cardList = result
        // Create the cards
        for (let i = cardList.length - 1; i >= 0; i--) {
            createCard(cardList[i]['content']);
        }
    })
    // Reload tthe card list and delete listeners
    loadCardList();
    setupCardDelete();
 }

 // Function for emptying the card container
 function emptyCards(){
    cardContainer.innerHTML = ""
    scoreDisplay.textContent = `Score: 0`;
    score = 0
 }

// Function for adding punch cards
async function addCard(){
    //Get the input content
    const cardText = document.getElementById('addPunchCardInput').value;
    if (!cardText) {
        return;
    }
    try {
        //Get the records
        const punchCardRecords = JSON.parse(localStorage.getItem('punchCardRecords')) || [];
        //Format the data

        const lastId = punchCardRecords[punchCardRecords.length - 1] ? punchCardRecords[punchCardRecords.length - 1].id : 0;
        const newId = lastId + 1;
        punchCardRecords.push({
            id: newId,
            content: cardText,
        });
        //Set the new records to local storage
        localStorage.setItem('punchCardRecords', JSON.stringify(punchCardRecords));
        console.log("Punch card Added Successfully!");
    } catch (error) {
        console.log("Punch card added successfully.");
    }

    // Reload the cards
    loadCards();
 }


 // Function for getting punch cards
async function getCards(){
    try{
        //Run fetch request to get all todos
        const response = JSON.parse(localStorage.getItem('punchCardRecords')) || [];
        console.log("Punch cards fetched successfully!");
        return response;
    }
    catch(error){
        console.error("Error:", error);
    }
}

// Function for adding event listeners
function addCustomEventListeners() {
    // Create card listener
    const button = document.getElementById('submitPunchCardButton');
    if (button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            addCard();
        });
    }
    // Reset cards listener
    document.getElementById('reload-card-button').addEventListener('click', () => {
        emptyCards()
        loadCards()
    })
}






    // Get the card container and display
    const cardContainer = document.getElementById('card-container');
    const scoreDisplay = document.getElementById('score');

    // demo content
    let score = 0;

$(document).ready(function(){
    //Load cards
    loadCards();
    // Add event listeners
    addCustomEventListeners();


    loadCardList()
});