function getWord(){
    let output = "";
    var myurl= "https://wordsapiv1.p.mashape.com/words?random=true&partOfSpeech=noun&hasDetails=typeOf";
    $.ajax({
        url : myurl,
        crossDomain: true,
        headers: {
            "X-Mashape-Key":"6qhJCMXeFZmshhUaG5jal9G63yGQp1XaHIWjsnf6bEp1A2QeJm"
        },
        success : function(parsed_json) {
            console.log(parsed_json);
            $("#results").html(parsed_json["word"]);
        }
    });
    
}