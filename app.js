const smallBoxNum = 5;
const dropSmallBox = function dropSmallBox(e){
    console.log('DROP!!')
    e.preventDefault();
    e.stopPropagation();
    //save previous className and text
    const previousText = e.target.innerText;
    const previousClassName = e.target.className;

    //get square from transfer
    let data = e.dataTransfer.getData("movedSquare");
    const movedSquare = document.querySelector(`#${data}`)

    //change text and class on dropped on square
    e.target.innerText = movedSquare.innerText;
    e.target.className = movedSquare.className;

    //change text and class on dropping on square
    movedSquare.innerText = previousText;
    movedSquare.className = previousClassName;
}

const dropBigBox = function dropBigBox(e){
    e.preventDefault();
    const boxTwo = document.querySelector('.box-two')
    let data = e.dataTransfer.getData("movedSquare");
    const movedSquare = document.querySelector(`#${data}`)
    if(boxTwo.children[0]){
        console.log('NODES')
        let child = boxTwo.children[0]
        const previousText = child.innerText;
        const previousClassName = child.className;
        child.innerText = movedSquare.innerText
        child.className = movedSquare.className
        movedSquare.innerText=previousText 
        movedSquare.className=previousClassName 

    }else{
        boxTwo.append(movedSquare)
    }
}

const allowDrop = function allowDrop(e){
    e.preventDefault()
}

const drag = function drag(e){
    e.dataTransfer.setData("movedSquare", e.target.id);
}

const createSmallBoxes = function createSmallBoxes(boxNum){
    const boxOne = document.querySelector('.box-one')
    for(let i=0;i<boxNum;i++){
        const smallBox = document.createElement('div')
        smallBox.append(`small box ${i}`)
        smallBox.classList.add(`small-box`)
        smallBox.setAttribute('id',`small-box-${i}`)
        smallBox.setAttribute('draggable','true')
        smallBox.setAttribute('ondrop','dropSmallBox(event)')
        smallBox.setAttribute('ondragover','allowDrop(event)')
        smallBox.setAttribute('ondragstart','drag(event)')
        //console.log('small box',smallBox)
        boxOne.append(smallBox)
    }
}

createSmallBoxes(smallBoxNum);

const reset = function reset(e){
    const boxOne = document.querySelector('.box-one')
    const boxTwo = document.querySelector('.box-two')
    boxOne.innerHTML = '';
    boxTwo.innerHTML = '';
    createSmallBoxes(smallBoxNum)
}

const randomize = function randomize(e){
    //get random array and insert them randomly
    const boxOne = document.querySelector('.box-one')
    const boxTwo = document.querySelector('.box-two')
    boxOne.innerHTML = '';
    boxTwo.innerHTML = '';
    const smallBoxArr = [];
    for(let i=0;i<smallBoxNum;i++){
        const smallBox = document.createElement('div')
        smallBox.append(`small box ${i}`)
        smallBox.classList.add(`small-box`)
        smallBox.setAttribute('id',`small-box-${i}`)
        smallBox.setAttribute('draggable','true')
        smallBox.setAttribute('ondrop','dropSmallBox(event)')
        smallBox.setAttribute('ondragover','allowDrop(event)')
        smallBox.setAttribute('ondragstart','drag(event)')
        smallBoxArr.push(smallBox)
    }
    let shuffle = function shuffle(arr){
        let shuffleArr = []
        for(let i=arr.length-1;i>=0;i--){
            const rand = Math.floor(Math.random()*arr.length)
            shuffleArr.push(arr.splice(rand,1)[0])
        }
        return shuffleArr
    }
    let newArr = shuffle(smallBoxArr)
    let rand = Math.floor(Math.random()*2)
    if(rand>0){
        boxTwo.append(newArr.pop())
    }
    for(let box of newArr){
        console.log('box')
        boxOne.append(box)
    }
}