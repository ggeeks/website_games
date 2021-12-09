const arAlphabets = ["A", "B", "C", "D", "E", "F", "G", 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const iLenAlphabets = arAlphabets.length;

let arMarked = [];
let iLen_arMarked = arMarked.length;

//

let wordArray = {
    "work": "a task or tasks to be done",
    "gaming": "practice of playing video games",
    "joy": "be happy",
    "form": "visible shape or configuration of something",
    "nightmare": "frightening or unpleasant dream",
    "shrink": "become or make smaller in size or amount",
    "put": "move to or place in a particular position",
    "witch": "a woman thought to have magic powers",
    "mug": "a large cup",
    "bait": "food placed on a hook or in a net, trap, or fishing area to entice fish or other animals as prey",
    "guess": "an estimate or conclusion",
};
let lives = 5;
let word = Object.keys(wordArray)[Math.floor(Math.random()*Object.keys(wordArray).length)];
let lenWord = word.length;
let placeholder = '_ '.repeat(lenWord);
let inputWord = placeholder.replaceAll(" ", "");

console.log(word);

// Populate the initial HTML with relevant keys

document.getElementById('alphabets').innerHTML = "<ul> </ul>";

let text = '<ul>';
for (let i = 0; i < iLenAlphabets; i++) {
    text += `<button class='unused' id=${arAlphabets[i]} onclick="charClickEvent(this.id)"> ${arAlphabets[i]} </button>`;
}
text += '</ul>';

document.getElementById('alphabets').innerHTML = text;

// Put in the answer placeholder
document.getElementById('answer-key').innerHTML = placeholder;

// js button set and reset functions based on element id.
// hangman logic will come from here

function charClickEvent(x) {
    let btn = document.getElementById(x);
    btn.className = 'used';

    // call the logic
    charGuessEvent(x);
    inputWord = placeholder.replaceAll(" ", "");
    checkGameEvent();
    document.getElementById('answer-key').innerHTML = placeholder;

    arMarked.push(x);
    iLen_arMarked = arMarked.length;
}

function resetCharClick() {
    for (let i = 0; i < iLen_arMarked; i++) {
        document.getElementById(arMarked[i]).className = '';
    }

    lives = 5;
    word = Object.keys(wordArray)[Math.floor(Math.random()*Object.keys(wordArray).length)];
    lenWord = word.length;
    placeholder = '_ '.repeat(lenWord);
    inputWord = placeholder.replaceAll(" ", "");
    
    document.getElementById('lives').innerHTML = lives
    placeholder = '_ '.repeat(lenWord);
    document.getElementById('answer-key').innerHTML = placeholder;
    document.getElementById('answer-result').innerHTML = '';
    document.getElementById('hint').innerHTML = '';
}

function giveHint() {
    document.getElementById('hint').innerHTML = wordArray[word];
}

function checkGameEvent() {
    document.getElementById('lives').innerHTML = lives
    console.log(inputWord);

    if (inputWord.toLowerCase() == word.toLowerCase()) {
        document.getElementById('answer-result').innerHTML = 'You won!';
    }

    if (lives == 0) {
        document.getElementById('answer-result').innerHTML = 'You lost.';
    }
}

// Check each char input and see if it has even one occurence within the 
// answer word

function charGuessEvent(passedChar) {
    let foundChar = false;

    for (let i = 0; i < lenWord; i++) {
        if (word[i].toLowerCase() == passedChar.toLowerCase()) {
            foundChar = true;
            placeholder = replaceCharAtIndex(placeholder, passedChar, i);
        }
    }

    if (!foundChar) {
        lives -= 1;
        lives = Math.max(lives, 0);
    }
    
}

// char replace logic

function replaceCharAtIndex(orgStr, replChr, index) {
    let newStringArray = orgStr.split("");
    newStringArray[index*2] = replChr;

    let newString = newStringArray.join("");
    return newString;
}