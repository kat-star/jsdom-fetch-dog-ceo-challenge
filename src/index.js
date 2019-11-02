// console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let allDogBreeds;
let breedContainer;

//immediately invoked function expression, used to prevent functions hanging out unnecessarily in the global scope. JS convention This prevents accessing variables within the IIFE idiom as well as polluting the global scope.

(function() {
  getDogs();
  getBreeds();
  filterDogBreeds();
})();

function getDogs () {
  return fetch(imgUrl)
    .then(response => response.json())
    .then(allDogs => {
      const dogContainer = document.querySelector('#dog-image-container')
      // dogContainer.innerHTML = allDogs.message.map(link => {
      //`<img src="${link}" />`
      // }).join('')
      allDogs.message.forEach(link => {
        const newImg = document.createElement('img')
        newImg.src = `${link}`
        dogContainer.append(newImg)
      })
    });
}

function appendDogBreed(breed) {
  const newLi = document.createElement('li')
  newLi.textContent = `${breed}`
  breedContainer.append(newLi)
}

function getBreeds() {
  fetch(breedUrl)
  .then(response => response.json())
  .then(allBreeds => {
    breedContainer = document.getElementById('dog-breeds');
    const breeds = (Object.keys(allBreeds.message));
    allDogBreeds = breeds;
    breeds.forEach(breed => appendDogBreed(breed))
  });
  listenForClicks();
}

function listenForClicks() {
  const breedContainer = document.getElementById('dog-breeds')
  breedContainer.addEventListener('click', function(event) {
    event.target.style.color = 'red'
  })
}

function filterDogBreeds() {
  const dropdown = document.getElementById('breed-dropdown')
  dropdown.addEventListener('change', function(event) {
    const letter = event.target.value //a
    const filteredBreeds = allDogBreeds.filter(breed => breed[0] == letter)
    breedContainer.innerHTML = '';
    filteredBreeds.forEach(breed => appendDogBreed(breed))
  })
}
