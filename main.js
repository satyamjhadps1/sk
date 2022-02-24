function setup(){
    canvas = createCanvas(450, 275)
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    classifer = ml5.imageClassifier("DoodleNet");
    synth = window.speechSynthesis;
}

function draw(){
        strokeWeight(13)
        stroke(0);
        if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
        }
}

function clear(){
    background("white");
}

function classifyCanvas(){
    classifer.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML = "Label : "+results[0].label;
        document.getElementById("conf").innerHTML = "Confidence : "+Math.round(results[0].confidence*100) + "%";
        f_l = results[0].label;
        f_ll = f_l.replaceAll("_", " ");
        console.log(f_ll)
        utterThis = new SpeechSynthesisUtterance(f_ll);
        synth.speak(utterThis);
    }
}