const fill = document.getElementsByClassName('fill')[0];
const empties = document.getElementsByClassName('empty');

fill.addEventListener("dragstart", dragStart, false);
fill.addEventListener("dragend", dragEnd, false);

for (let empty of empties) {
    empty.addEventListener("dragover", dragOver, false);
    empty.addEventListener("dragenter", dragEnter, false);
    empty.addEventListener("dragleave", dragLeave, false);
    empty.addEventListener("drop", dragDrop, false);
}

// Fill dom functions
function dragStart() {
    this.classList.add("hold");
    setTimeout(()=>this.classList.add("invisible"), 0);
}

function dragEnd() {
    this.classList.remove("invisible");
    this.classList.remove("hold");
}

// Empty dom functions
function dragOver(event) {
    // prevent default to allow drop
    event.preventDefault();
}

function dragEnter() {
    this.classList.add("dragHover");
}

function dragLeave() {
    this.classList.remove("dragHover");
}

function dragDrop(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    this.append(fill);
    this.classList.remove("dragHover");
}