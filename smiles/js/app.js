(function() {
    // create the left div
    var iDivLeftSide = document.createElement('div');
    iDivLeftSide.id = 'leftSide';
    // add an handler for mouse clicks in the left div
    iDivLeftSide.onclick = function() {
        console.log("click event div left");
        alert("Game Over!");
        iDivLeftSide.onclick = null;
        leftSide.lastChild.onclick = null;
    };

    // create the right div
    var iDivRightSide = document.createElement('div');
    iDivRightSide.id = 'rightSide';

    // apppend the two div blocks to the page body
    document.body.appendChild(iDivLeftSide);
    document.body.appendChild(iDivRightSide);

    var smilesNum = 5;

    // create the smile image
    smile = document.createElement('img');
    smile.id = "smile";
    smile.src = "images/smile.png";
    smile.style.height = smile.style.width = "80px";

    // handler for mouse clicks on the extra left smile
    function clickLastSmile(event) {
        console.log("click on left last smile");
        event.stopPropagation();
        leftSide.lastChild.removeEventListener("click", clickLastSmile);

        // remove the previous smiles
        while (leftSide.firstChild) {
            leftSide.removeChild(leftSide.firstChild);
        }
        while (rightSide.firstChild) {
            rightSide.removeChild(rightSide.firstChild);
        }

        // display 5 more smiles
        smilesNum += 5;
        drawSmiles(smilesNum);
        leftSide.lastChild.onclick = clickLastSmile;
    }

    // this function display all the smiles in both div's
    function drawSmiles(howMany) {
        for (var i = 0; i < howMany; i++) {
            var newSmile, cloneSmile, rand_top, rand_left;

            newSmile = smile.cloneNode(true);
            newSmile.style.position = "absolute";

            // pick a random position
            rand_top = Math.floor(Math.random() * 400);
            newSmile.style.top = rand_top + "px";
            rand_left = Math.floor(Math.random() * 500);
            newSmile.style.left = rand_left + "px";

            leftSide.appendChild(newSmile);
        }

        // clone all the smiles but the last one in the right div
        for(var i = 0; i < leftSide.childNodes.length - 1; ++i) {
            cloneSmile = leftSide.childNodes[i].cloneNode(true);
            rightSide.appendChild(cloneSmile);
        }
    }

    // display of initial "smilesNum" smiles
    drawSmiles(smilesNum);
    // attach the handler to the extra smile in the left div
    leftSide.lastChild.onclick = clickLastSmile;
})();
