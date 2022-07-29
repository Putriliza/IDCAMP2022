/* Function to collaps learn more in features */
function collaps() {
  var coll = document.getElementsByClassName("feature-collaps");
  var i;

  for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
  }
}

/* Function to change navigation to responsive */
function navBar() {
  var navElmt = document.getElementById("TopNav");
  if (navElmt.className === "topnav") {
    navElmt.className += " responsive";
  } else {
    navElmt.className = "topnav";
  }

  document.getElementById("NavContent").classList.toggle("show");
}