document.addEventListener('DOMContentLoaded', function(){
    done = new Event("generatedWords")

    generateWordsAndDisplay()
    

    document.addEventListener('generatedWords', function(){
        allChars = document.querySelectorAll('.characterSpan')
        allChars[0].classList.add('current')

        // Reset nextChar to point to the first character
        nextChar = allChars[1];

        //Listen if the user clicked correct key/letter
        currentIndex = 0
        mistakes = 0
        mistakesP = document.querySelector('.mistakes')
        mistakesP.innerHTML = 'Mistakes: ' + mistakes
        
    })

    eventListenerForWords()
    

    let lengthRange = document.querySelectorAll('.lengthRange')

    lengthRange.forEach(element =>{
        
        element.addEventListener('change',function(){

            //console.log(element.classList.value, ' Value changed to : ', element.value)

            generateWordsAndDisplay()
        })
    })

    
    
  
})

function fetchNewWords(){
    let min = document.querySelector('.min').value
    let max = document.querySelector('.max').value
    return fetch(`/words/${min}/${max}`)
    .then(response => response.json());
}

function isKeyPressCorrect(key,index){

    if(key['key'].toLowerCase() == rawText[index].toLowerCase()){
        return true;
    }
    else{
        return false;
    }
}

function displayWords(words){

    document.querySelector('.text').innerHTML = ''

    words.forEach((eachWord, i)=> {

        let outerSpan = document.createElement('span')
        outerSpan.classList.add('outerSpan')
        let innerSpan = document.createElement('span')
        innerSpan.classList.add('wordSpan')

        for (let i = 0; i < eachWord.length; i++) {

            let characterSpan = document.createElement('span')
            characterSpan.classList.add('characterSpan')
            characterSpan.innerHTML = eachWord.charAt(i)
            innerSpan.appendChild(characterSpan)

          }


        outerSpan.appendChild(innerSpan)

        //Add '_' after each word, except the last one
        if(words.length != i+1){

            let spaceSpan = document.createElement('span')
            spaceSpan.innerHTML = '␣'
            spaceSpan.classList.add('characterSpan')
            spaceSpan.classList.add('space')
            innerSpan.appendChild(spaceSpan)

        }
        
        mainDiv = document.querySelector('.text')
        mainDiv.appendChild(outerSpan)
    });
}

function generateWordsAndDisplay(){

    var words = ''
    
    fetchNewWords()
    .then(data => {
        // Handle the fetched data here
        words = data['words']
        //console.log(words)
        displayWords(words)
        
        return words
    })
    .then( words => {

    
        
        rawText = ''
        words.forEach(word => {

            rawText += word + ' '
            
        });
        //console.log('RawTEXT: ',rawText)

        textToDisplay = ''
        words.forEach(word => {

            textToDisplay += word + "_"

        });

        textToDisplay = textToDisplay.slice(0, -1)
        //console.log('TEXT: ',textToDisplay)
        document.dispatchEvent(done)
    })
    
        
}

function eventListenerForWords(){
    

    document.addEventListener('keypress', function(key){


        var currentChar = allChars[currentIndex]
        var nextChar = allChars[currentIndex + 1]


        if(!nextChar){
            //console.log('There"s no chars left, FETCHING !')
            
            generateWordsAndDisplay()
        
        }

        if(isKeyPressCorrect(key,currentIndex)){

            //console.log('Correct!')
            
            if(currentIndex != 0){

                currentChar.classList.remove('current')

            }

            else{

                currentChar.classList.remove('current')

            }


            currentChar.classList.add('correct')
            currentIndex++
            currentChar = allChars[currentIndex]

            if(currentChar){

                currentChar.classList.add('current')

            }

        }

        else{

            //console.log('Wrong key pressed!')
            console.log(`Letter at index ${currentIndex}: '${rawText[currentIndex]}' Key pressed : '${key['key']}'`)
            currentChar.classList.add('mistake')
            mistakes++
            mistakesP.innerHTML = 'Mistakes: ' + mistakes

        }


    })
}