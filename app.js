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

createSmallBoxes(5);

const reset = function reset(e){
    const boxOne = document.querySelector('.box-one')
    const boxTwo = document.querySelector('.box-two')
    boxOne.innerHTML = '';
    boxTwo.innerHTML = '';
    createSmallBoxes(5)
}