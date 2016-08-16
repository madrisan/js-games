(function() {
    var smilesNum = 5
      , increment = 3
      , smileSize = "60px";

    var divWidth = 500
      , divHeight = 400;

    // create the smile image
    smile = document.createElement('img');
    smile.id = "smile";
    smile.src = "images/smile.png";
    smile.style.height = smile.style.width = smileSize;

    function drawPanel() {
        // create the left div
        var iDivLeftSide = document.createElement('div');
        iDivLeftSide.id = 'leftSide';
        // add an handler for mouse clicks in the left div
        iDivLeftSide.onclick = function() {
            iDivLeftSide.onclick = null;
            leftSide.lastChild.onclick = null;
            alert("Game Over!");
        };

        // create the right div
        var iDivRightSide = document.createElement('div');
        iDivRightSide.id = 'rightSide';

        // append the two div blocks to the page body
        document.body.appendChild(iDivLeftSide);
        document.body.appendChild(iDivRightSide);
    }

    // handler for mouse clicks on the extra left smile
    function clickExtraSmile(event) {
        event.stopPropagation();
        leftSide.lastChild.removeEventListener("click", clickExtraSmile);

        // remove the previous smiles
        while (leftSide.firstChild) {
            leftSide.removeChild(leftSide.firstChild);
        }
        while (rightSide.firstChild) {
            rightSide.removeChild(rightSide.firstChild);
        }

        smilesNum += increment;
        drawSmiles(smilesNum);
        leftSide.lastChild.onclick = clickExtraSmile;
    }

    // this function display all the smiles in both div's
    function drawSmiles(howMany) {
        for (var i = 0; i < howMany; i++) {
            var newSmile, cloneSmile, rand_top, rand_left;

            newSmile = smile.cloneNode(true);
            newSmile.style.position = "absolute";

            // pick a random position
            rand_top = Math.floor(Math.random() * divHeight);
            newSmile.style.top = rand_top + "px";
            rand_left = Math.floor(Math.random() * divWidth);
            newSmile.style.left = rand_left + "px";

            leftSide.appendChild(newSmile);
        }

        // clone all the smiles but the last one in the right div
        for(var i = 0; i < leftSide.childNodes.length - 1; ++i) {
            cloneSmile = leftSide.childNodes[i].cloneNode(true);
            rightSide.appendChild(cloneSmile);
        }
    }

    // draw the play field
    drawPanel();

    // display of the first set of smiles
    drawSmiles(smilesNum);

    // attach the handler to the extra smile in the left div
    leftSide.lastChild.onclick = clickExtraSmile;
})();
