// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


for(let i = 0; i<151; i++){
    const pokemon = document.createElement('div');
    const label = document.createElement('span');
    
    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${i}.png`
    container.appendChild(newImg)
}