// Function for updating score
function updateScore(change) {
  score += change;
  scoreDisplay.textContent = `Score: ${score}/${totalCards}`;
}
// Initial score text setup
function setupScore(){
    scoreDisplay.textContent = `Score: 0/${totalCards}`;
}
// Checks if all cards are gone
function isOver(){
    let childrenCount = cardContainer.childElementCount
    console.log(childrenCount)
    if(childrenCount == 1){
        setTimeout(()=>{
            cardContainer.innerHTML =`<div id="pushCardFinalScore"><p>Score: ${score}/${totalCards}</p></div>`;
        }, 500);
    }
}
// Function for creating a single card
function createCard(content) {
    // Create a card and add to the rest
  const card = document.createElement('div');
  card.className = 'punchCard';
  card.innerHTML = "<p>"+content+"</p>";
  cardContainer.appendChild(card);

  // Swipe mechanic
  const hammer = new Hammer(card);
  hammer.on('swipeleft swiperight', (ev) => {
    if (ev.type === 'swiperight') {
      updateScore(1);
      card.style.transform = 'translateX(100%) rotate(15deg)';
      isOver();
      console.log("Correct");
    } else {
      updateScore(0);
      card.style.transform = 'translateX(-100%) rotate(-15deg)';
      isOver();
      console.log("Wrong");
    }
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 400);
  });
}

// Function for adding punch cards
async function addCard(){
    //Get the input content and clear the input
    const cardText = document.getElementById('addPunchCardInput').value;
    document.getElementById('addPunchCardInput').value="";
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
         // Reload the cards
        loadCards(); 
        loadCardList();
    } catch (error) {
        console.log("Something went wrong.");
    }


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

// Function for triggerring the push card delete
async function setupCardDelete() {
    // Unbind the listeners
    $("#all-cards").off("click", ".delete-punchcard");
    // Bind the listeners
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
       })
   });
}

// Function for deleting cards
async function cardDelete(postId) {
    try {
        //Get the records
        console.log(postId)
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
        // Reload the cards
        loadCards();
        loadCardList();
        
    } catch (error) {
        console.log("Error deleting card.");
    }
}

















// Function for loading the list with all the cards
function loadCardList(){
    emptyCards();
    // Get the cards
    const allcards = getCards();
    // Cleanup the container
    
    allcards.then(result => {
        // Create the cards
        for (let i = result.length - 1; i >= 0; i--) {
            const card = document.createElement('div');
            card.className = 'card-all';
            card.innerHTML ="<div class='delete-punchcard-wrapper'><div class='delete-punchcard' data-id="+result[i]['id']+"><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-trash2-icon lucide-trash-2'><path d='M3 6h18'/><path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'/><path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'/><line x1='10' x2='10' y1='11' y2='17'/><line x1='14' x2='14' y1='11' y2='17'/></svg></div></div><p class='card-text'>"+result[i]['content']+"</p>";
            cardListContainer.appendChild(card);
        }
    })
    setupCardDelete()
    
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
        // Score setup
        totalCards = cardList.length
        setupScore()
    })
}

 // Function for emptying the card container
 function emptyCards(){
    cardContainer.innerHTML = ""
    cardListContainer.innerHTML = ""
    setupScore();
    score = 0
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
        loadCards()
        loadCardList()
    })

    document.getElementById('openPunchCardsBtn').addEventListener('click', () => {
        window.electronAPI.openPunchCardWindow()
    })
}






    // Get the card container and display
    const cardContainer = document.getElementById('card-container');
    const scoreDisplay = document.getElementById('score');
    const cardListContainer = document.getElementById('all-cards');

    // demo content
    let score = 0;
    let totalCards = 0;

$(document).ready(function(){

    //Load cards
    loadCards();
    loadCardList();
    // Add event listeners
    addCustomEventListeners();

});