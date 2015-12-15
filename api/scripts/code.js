/*global document */

var lastElement = null;
function collapse(element){
    if(lastElement && lastElement !== element && element.parentNode != lastElement){
        lastElement.style.display = "none";
    }
    
    if(element.style.display === "none"){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
    
    lastElement = element;
}
