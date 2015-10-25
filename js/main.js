(function(){

  document.addEventListener('DOMContentLoaded', function(event) {

    var body = document.querySelector('body');
    var links = document.querySelectorAll('[data-load]');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {

          body.className = 'animate-out';

          /* Listen for a transition! */
          var transitionEvent = whichTransitionEvent();
          transitionEvent && body.addEventListener(transitionEvent, function() {
            console.log('Transition complete!  This is the callback, no library needed!');

            document.write(xhr.responseText);
          });

        }
      }
    }

    for(var i=0; i<links.length; i++) {

      var link = links[i];

      link.addEventListener('click', function(e){

        e.preventDefault();

        var url_to_load = this.getAttribute('data-load');

        xhr.open("GET", url_to_load);
        xhr.send();

      }, false);

    }

  });

})();


// http://davidwalsh.name/css-animation-callback
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
