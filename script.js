const images = document.getElementById('parent').children //calling all the divs

//add grid item class to each image
const displayAllImages = () => {
  Array.from(images).forEach((image) => {
    //to make the array
    const element = image.getElementsByTagName('img')[0] //getting each img
    element.classList.add('grid-item') //now puttig CSS
  })
}

setTimeout(displayAllImages, 1000) //for at the beginning to show cards

let firstImage = null //or keep; 
let secondImage = null
let win = false
let num = 16
let winCount = 0
let cardsMeaning = ["Page of Cups! This card signifies the potential for new beginnings, creative inspiration, and positive emotional experiences.", "The Moon! The everyday mind may not be prepared for strange oceanic circumstances.","The Emperor! This card signifies responsibility, courage, and intelligence."]

document.getElementById('parent').addEventListener('click', (event) => {
  let targetElement = event.target //for when image is clicked>the target (element that is clicked) so it shows up in the console as what you clicked

  if (targetElement.tagName !== 'IMG') {
    targetElement = targetElement.querySelector('img') //if not an image, take an img inside the element 
  }

  if (targetElement && !targetElement.classList.contains('matched')) {
   
   //after each pair has been made, if the first slot is empty then u assign the clicked pic to this firstimagr space
    if (firstImage == null) {
      firstImage = targetElement
    } else {
      secondImage = targetElement
    }
   
   //if both have been defined + matched > make it unclickable
    if (firstImage != null && secondImage != null) {
      if (firstImage.alt === secondImage.alt) {
        firstImage.classList.add('matched')
        secondImage.classList.add('matched')
        firstImage.style.pointerEvents = 'none'
        secondImage.style.pointerEvents = 'none'
      } else {
        setTimeout(() => {
          firstImage.classList.add('grid-item')
          secondImage.classList.add('grid-item')
          firstImage = null  //resetting the image spaces to empty for next selection
          secondImage = null
        }, 1000)
      }
//even if it matches it should be reset for next selection
      if (
        firstImage.classList.contains('matched') ||
        secondImage.classList.contains('matched')
      ) {
        firstImage = null
        secondImage = null
      }
    }
    //no matter whether match, flip image when selected to show content
    targetElement.classList.remove('grid-item')

    Array.from(images).forEach((image) => {
      //to make the array
      const element = image.getElementsByTagName('img')[0] //get the child of the div aka img
      if(element.classList.contains('matched')){
        winCount +=1
      }
    })

    //once 8 pairs aka 16 matches
      if(winCount === num){
        win = true
        alert("You Won! Your card of the day: "+ cardsMeaning[(Math.floor(Math.random() * cardsMeaning.length))])
        location.reload()
      }else{
        winCount = 0
      }
  }
})

refresh = () => {
  location.reload()
}

//set 40 sec timer 
if(!win){
  setTimeout(() =>{
    alert("Time's up! You lost. Try again.")
    location.reload()
  }, 40000)
}