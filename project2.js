function getWord(part){
    
    //noun&hasDetails=typeOf
    part = part.replace(/\[|\]/gm,'');
    //let values = part.split(" ");
    let output = "";
    var myurl= "https://wordsapiv1.p.mashape.com/words?random=true&partOfSpeech=" + part;// + "&hasDetails=typeOf";
    if (part == "adverb"){
        myurl += "&letterPattern=" + encodeURIComponent("^.+ly$");
    } else if (part == "noun"){
        myurl += "&hasDetails=typeOf";
    }
    
    return $.ajax({
        url : myurl,
        crossDomain: true,
        headers: {
            "X-Mashape-Key":"6qhJCMXeFZmshhUaG5jal9G63yGQp1XaHIWjsnf6bEp1A2QeJm"
        }
    });
}

function fillInStory(){
    $.LoadingOverlay("show");
    let regex = /(\[[\w\s]+\]*)/g, match;
    let input = $("#story").val();
    let deferreds = new Array();
    while (match = regex.exec(input)){
        let promise = getWord(match[0]);
        let repl = match[0];
        deferreds.push(promise);
        promise.done(function(data) {
            let temp = "<text title='"+data.results[0].definition+"'>" + data["word"] + "</text>";
            input = input.replace(repl, temp);
        }).fail(function(xhr) {
            input = input.replace(repl, "ERROR");
        });
        
        console.log(match);
    }
    
    $.when(...deferreds).done(function (x){
        $("#results").html(input);    
        $.LoadingOverlay("hide");
    })
    
}