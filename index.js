
//HERE GOES HEADER CREATION -*TO DO


const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class','container');

// append header HERE before cards container TODO
app.appendChild(container);







const numberOfQuestions = 10;
var questionArray = [];
//solutions random order between 4 positions for each question.
var solutions = [];
for (i=0; i<numberOfQuestions; i++)
	solutions.push(Math.floor(Math.random() * 4));




// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.binance.vision/api/glossaries', true);

request.onload = function() {
	//accessing JSON data from Binance endpoint 
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		let len = data.length;
		const questionQuiz = new Set();
		// selectinc aleatory 10 titles and their descriptions to test the user Knowledge in this quiz.
		while ( questionQuiz.size < numberOfQuestions){
			let aleatoryNumber = Math.floor(Math.random() * len);
			questionQuiz.add(data[aleatoryNumber]);
		}
		questionArray = Array.from(questionQuiz); // questions ordered from 0 to 9 positions in questionArray
	
		let order = 0;
		questionArray.map(el =>{
			const title = document.createElement('h4');
			title.textContent = el.title;

		

			const leg = document.createElement('legend');
			leg.textContent =  `Question: # ${order + 1}`;
			leg.setAttribute('class','order');

			const card = document.createElement('fieldset');
		
			card.setAttribute('class','card');
			
		
			//card arrangment
		

		
			card.appendChild(leg);
			card.appendChild(title);
			
			//dinamic options addition 4 option, correct answer added at a random position 

			//const description = document.createElement('p');
			//description.textContent = el.excerpt;
			let iteration = 0;

			const alternativeOptions = new Set();
			alternativeOptions.add(el.excerpt);

			while ( alternativeOptions.size < 4){
					 aleatoryNumber = Math.floor(Math.random() * len);
				alternativeOptions.add(data[aleatoryNumber].excerpt);
			}

			 const alternativeArray = Array.from(alternativeOptions); 
		
			 if ( alternativeArray[solutions[order]] != el.excerpt ){
			 	
			 	let index = 0;
			 	while (alternativeArray[index] != el.excerpt){
			 		index++; //this means solution actual location is index so , now I should swap that index with the right index
			 	}
			 	 alternativeArray[index] = alternativeArray[solutions[order]];
			 	 alternativeArray[solutions[order]] = el.excerpt;
			 }
			//		label.textContent = el.excerpt;
				

		while (iteration < 4) {
		 
			const input = document.createElement('input');
			const label = document.createElement('label');
			const checkmark = document.createElement('span');
			  
			label.textContent = alternativeArray[iteration];
			input.setAttribute('class','form-check-input');
			checkmark.setAttribute('class','checkmark');
			input.setAttribute('type','radio');
			input.setAttribute('name',`${order}`);
			input.setAttribute('id',`${order}-${iteration}`);
			checkmark.setAttribute('id',`check-${order}-${iteration}`);
			label.setAttribute('class','form-check-label');
			label.setAttribute('for',`${order}-${iteration}`);


//option definition with checkbox and description labeled
			const option = document.createElement('div');
			option.setAttribute('class','form-check');
			
			option.appendChild(input);
			option.appendChild(checkmark);
			option.appendChild(label);
			card.appendChild(option);
			iteration++;
		}
			// END 4 options per card addition


			container.appendChild(card);
			order++;

		});

		const submit = document.createElement('button');
		submit.setAttribute('type','submit');
		submit.setAttribute('class','btn btn-success');
		submit.setAttribute('id','submit-btn');
		submit.textContent = 'Submit answer';
		container.appendChild(submit);

//Adds Event listener to submit button 

var btn = document.getElementById('submit-btn'); 
var score = 0;
var overlay = document.getElementById('overlay'); /* to access* */

btn.addEventListener('click',()=> {
  overlay.style.display = 'grid';
  
  
  overlay.classList.add('animate-overlay'); //this adds the effect assocaited to animation-overlay
let solIndex = 0;
solutions.map( el => {
	
	if (document.getElementById(`${solIndex}-${el}`).checked) {
		score++;
	 let element = 	document.getElementById(`check-${solIndex}-${el}`);
	 element.style.backgroundColor = "green";
		
	}
	solIndex++;

}
);

//var list = document.getElementsByClassName("form-check-input");
//for (let item of list) {
//	item.checked = false ;
//	}

  alert(`Your score is : ${score}  of 10`);
  setTimeout(()=>{
    overlay.classList.remove('animate-overlay');
	overlay.style.display = 'none';
	score = 0;
  },3000);
});



     //ERROR CASE endpoint conection failed.
	} else {
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = "endpoint is not working or sth went wrong!";
		app.appendChild(errorMessage);
	}

}
// Send request
request.send();


