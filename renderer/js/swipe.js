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
// Function for updating the answer on the card
function updateCardAnswer(id, ans) {
    const cards = JSON.parse(localStorage.getItem('punchCardRecords')) || [];
    cards.forEach(card => {
        if (card.id === id) {
            card.answer = ans;
        }
    });
    localStorage.setItem('punchCardRecords', JSON.stringify(cards));
    console.log("jds")
    console.log(ans)
    
}
// Function for creating a single card
function createCard(content, id, answer) {
    // Create a card and add to the rest
    const card = document.createElement('div');
    card.className = 'punchCard';
    card.innerHTML = `<div class='punchCardFlipButton' id='formBtn${id}' data-id='${id}'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div><p class='punchCardAnswerTitle hiddenForm' id='punchCardAnswerTitle${id}'>Answer</p><p id='formQuestion${id}'>${content}</p><form action='' method='post' class='punchCardAnswerForm hiddenForm' id='form${id}'><input type='text' name='itemName' class='punchCardAnswerInp' placeholder='New card...'><div class='punchCardAnswerBtn' id='formSubBtn${id}'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></div></form><p class='submittedText hiddenForm' id='text${id}'>${answer}</p> ` ;
    cardContainer.appendChild(card);
    
    // Handle form open
    document.getElementById('formBtn'+id).addEventListener('click', (e) => {
        // Take the form and text
        const form = document.getElementById('form' + id);
        const submittedText = document.getElementById('text' + id);
        const cardQuestion= document.getElementById('formQuestion' + id);
        const cardAnswerTitle = document.getElementById('punchCardAnswerTitle'+id)

      
        // If submittedText is not empty, toggle showing that instead
        if (submittedText.textContent.trim() !== '') {
          submittedText.classList.toggle('hiddenForm');
          form.classList.add('hiddenForm');
        } else {
          form.classList.toggle('hiddenForm');
          submittedText.classList.add('hiddenForm');
        }
        // Togle the answer title and question content
        cardQuestion.classList.toggle("hiddenForm")
        cardAnswerTitle.classList.toggle("hiddenForm")

    })

    // Handle form submit
    document.getElementById('formSubBtn'+id).addEventListener('click', function(event) {
        event.preventDefault();
        // Get the input value
        const input = document.querySelector(`#form${id} input`);
        const value = input.value.trim();
        
        // If input isnt empty add it to the submit text 
        if (value !== '') {
            // Show the submitted value
            const submittedText = document.getElementById('text' + id);
            submittedText.textContent = value;
            // Update the card record
            updateCardAnswer(id, value);
        
            // Hide form, show text
            submittedText.classList.remove('hiddenForm');
            document.getElementById('form' + id).classList.add('hiddenForm');
          }
    });


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
            answer: "" 
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
            createCard(cardList[i]['content'], cardList[i]['id'], cardList[i]['answer']);
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