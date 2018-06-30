var list = document.getElementsByClassName("btn-vote left");
// function getEp(){
//     ep = 1;
//     return ep;
// }

var firstTime = true;



    function main(){
    eplist = [false,false,false,false,false,false,false,false,false,false]
    var latest = 0;
    chrome.storage.sync.get(['ep1', 'ep2', 'ep3', 'ep4', 'ep5', 'ep6', 'ep7', 'ep8', 'ep9', 'ep10'], function(episodes) {
        for (var i =1; i<11; i++){
        curr = 'ep' +i;
        if(episodes[curr]) eplist[i-1] = true;
    };
    for (var j = 0; j<11; j++){
        if(eplist[j]) latest = j+1;
    }
    sendRequest(latest+1);

    });
    for (var i =0; i<list.length; i++) {
    var buttonOnSite = list[i];
    parent = buttonOnSite.parentElement.parentElement;
    children = parent.children;
    if(children.length===3){
        button = buildButton();
        parent.insertBefore(button, children[1]);
    }
    };
    //add modal

    modalExists = document.getElementById('modal');
    if(!modalExists){
        buildModal();
    };
    if(firstTime){
    addListener();
    firstTime = false;
};
};
    


    function buildModal(){
    console.log("IN BUILD MODAL")
    background = document.getElementsByClassName("background-white")[0];
    container = document.getElementById('container');
    modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'modal');
    modal.style.visibility = 'hidden';
    div1 = document.createElement('div');
    div1.setAttribute('id', "myModal0");
    div1.setAttribute('class', "main-modal");
    div1.setAttribute('aria-hidden', "true");
    div1.style.visibility = "hidden";

    header = document.createElement('div');
    header.setAttribute('class', 'modal-header');

    s1 = document.createElement('span');
    s1.setAttribute('aria-hidden', 'true');
    s1.setAttribute('class', 'close');
    s1.setAttribute('id', 'close')    
    s1.innerHTML = "X";
    h3 = document.createElement('h3');
    h3.innerHTML = "Report a Spoiler!"
    h3.setAttribute('class', 'modal-header');
    h3.setAttribute('id', 'myModalLabel');

    content = document.createElement('div');
    content.innerHTML = "From which episode is this post safe to view?"
    content.setAttribute('class', 'modal-content');
    br1 = document.createElement('br');
    br2 = document.createElement('br');

    content.appendChild(br1);
    content.appendChild(br2);
    select = document.createElement('select');
    select.class = "select-content";
    for (var i=1; i<11; i++){
        option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerHTML = i;
        select.appendChild(option);
    }

    checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.class = "modal-content";
    label = document.createElement('label')
    label.htmlFor = "checkbox";
    label.appendChild(document.createTextNode(" I don't want to see this post"));
    label.class = "modal-content"
    label.id = "label";
    br3 = document.createElement('br');

    content.id = 'content';
    content.appendChild(select);
    content.appendChild(br3);
    content.appendChild(checkbox);
    content.appendChild(label);

    select.setAttribute('id', 'select');

    footer = document.createElement('div');
    footer.setAttribute('class', 'modal-footer');


    canbut = document.createElement('button');
    canbut.setAttribute('type', 'button');
    canbut.setAttribute('class', 'cancel');
    canbut.setAttribute('id', 'cancel')
    canbut.innerHTML="Cancel";
    okbut = document.createElement('button');
    okbut.setAttribute('type', 'button');
    okbut.setAttribute('class', 'okbtn');
    okbut.setAttribute('id', 'okbtn');
    okbut.innerHTML="OK";

    footer.appendChild(canbut);
    footer.appendChild(okbut);

    // oklistener = function(id){
    //     reportServer(id);
    //     removeArticle(id);
    // }

    // okbut.onclick = oklistener(okbut.getAttribute('id'));
    background.insertBefore(modal , container);
    modal.appendChild(div1);
    div1.appendChild(header);
    header.appendChild(s1);
    header.appendChild(h3);
    div1.appendChild(content);
    div1.appendChild(footer);
    //div6.appendChild(canbut);
   // div6.appendChild(okbut);
    
    }
    var close = document.getElementsByClassName('close')[0];



    /*<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Launch demo modal</button>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>

                    </button>

                     <h4 class="modal-title" id="myModalLabel">Modal title</h4>

                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>*/



    var observer1 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log("event!")
            main(); // In each infinite scrolling event, add buttons
        });
     }).observe(document.querySelector('div.badge-entry-collection'), // target of the observer
        {
            attributes: true,
            childList: true,
            characterData: true,
        }); // config of the observer

    main();


    function buildButton() {
        button = document.createElement("button");
    //adjusing the button pic   
        oImg=document.createElement("img");
        oImg.setAttribute('id', "button")
        oImg.setAttribute('src', 'http://modsquad.com/wp-content/uploads/2013/06/spoiler_alert_300_w2.jpg');
        oImg.setAttribute('alt', 'Spoiler Alert!');
        oImg.setAttribute('height', '42px');
        oImg.setAttribute('width', '42px');
        button.setAttribute('id', "myBtn");
        button.appendChild(oImg);
        return button;
    };

    function addListener(){
    
    var theParent = document.getElementsByClassName("background-white")[0];
    theParent.addEventListener("click", doSomething, false);
     
    function doSomething(e) {
        
        if (e.target.id === "myBtn" || e.target.id === "button") {
            elem = e.target.parentElement;
            while (elem.tagName != "ARTICLE"){
                elem = elem.parentElement;
            }
            //elem.style.display = "none";

            id = elem.getAttribute("data-entry-id")
            modal_button = document.getElementById('modal');
            modal_button.setAttribute('data', id);
            modal_button.style.visibility = 'visible';
            modal_button.style.visibility = 'visible';
            modal_button.style.width = '100%';
            modal_button.style.height = '100%';
            body = document.getElementsByClassName('background-white')[0];
            body.style.overflow = "hidden";
            modal_button.childNodes[0].style.visibility = 'visible';
            console.log(modal_button);
            e.stopPropagation();
            return id;      
        }
        if ((e.target.id === 'close') || (e.target.id == 'modal') || (e.target.id == 'cancel')) {
            console.log("click");
            document.getElementById('myModal0').style.visibility = "hidden";
            document.getElementById('modal').style.visibility = 'hidden';
            modal_button.style.width = '0%';
            modal_button.style.height = '0%';
            body = document.getElementsByClassName('background-white')[0];
            body.style.overflow = "auto";
        }
        else if (e.target.id == 'okbtn'){
            id = document.getElementById('modal').getAttribute('data');
            ep = document.getElementById('select').value;
            console.log(ep);
            alert("Thank you for your help making 9GAG a Spoiler-Free website!");      
            document.getElementById('myModal0').style.visibility = "hidden";
            document.getElementById('modal').style.visibility = 'hidden';   
            body = document.getElementsByClassName('background-white')[0];
            body.style.overflow = "auto";
            reportServer(id,ep);

        }


        
    }

    };
        function reportServer(id,ep){
            var xmlHttp = null;
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "http://www.spoileralert.esy.es/post.php?id="+id+"&ep="+ep , true );
            console.log("http://www.spoileralert.esy.es/post.php?id="+id+"&ep="+ep);
            xmlHttp.send( null );



        /*  a quicker wat but opens a new tab
        a = document.createElement("a");
        a.href = "http://www.spoileralert.esy.es/write.php?id="+id; 
        var evt = document.createEvent("MouseEvents");
        //the tenth parameter of initMouseEvent sets ctrl key
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                true, false, false, true, 0, null);
        a.dispatchEvent(evt);
            */
        if(document.getElementById("checkbox").checked){

        removeArticle(id);
    };
           
};




    function sendRequest(ep) {
    console.log("Sending request");
    var req = new XMLHttpRequest();
      req.open("GET", "http://spoileralert.esy.es/get.php?ep="+ep, true);
      console.log("http://spoileralert.esy.es/get.php?ep="+ep);
      req.onreadystatechange = function() {
          if (req.readyState == 4) {
            if (req.status == 200) {
                var arr = JSON.parse(req.responseText);
                console.log(arr);
                removeArticles(arr);
            }
          }
        };
      req.send();
       // $.ajax({
       //      url: 'http://www.spoileralert.esy.es/get.php',
       //      type: 'POST',
       //      data: {var1: ep},
       //      success: function(data) {
       //          console.log("success");
       //      }
       //  });

};

    function removeArticles(arr){
        console.log(arr);
        for(var i =0; i<arr.length; i++){
            id = arr[i];
            console.log(id);
            article = document.getElementById('jsid-entry-entity-'+id);
            if(article){
            article.style.display = "none";
        }
    };
    };

    function removeArticle(id){
        article = document.getElementById('jsid-entry-entity-'+id);
        article.style.display = "none";
    };

