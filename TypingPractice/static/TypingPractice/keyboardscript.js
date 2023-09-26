document.addEventListener('DOMContentLoaded', function(){
    //keyboard eventlistener

    var tempBack = ''
    var tempColor = ''
    document.addEventListener('keydown', function(key){

        tempBack = document.querySelector(`.${key['code']}`).style.background
        tempColor = document.querySelector(`.${key['code']}`).style.color
        document.querySelector(`.${key['code']}`).style.background= 'black'
        document.querySelector(`.${key['code']}`).style.color = 'white'
        
    })

    document.addEventListener('keyup', function(key){
        
        document.querySelector(`.${key['code']}`).style.background = tempBack
        document.querySelector(`.${key['code']}`).style.color = tempColor
        
    })

    //

    //For keyboard to look good 
    feather.replace()
    //
})