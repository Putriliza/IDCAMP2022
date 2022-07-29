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

function navBar() {
  var navElmt = document.getElementById("TopNav");
  if (navElmt.className === "topnav") {
    navElmt.className += " responsive";
  } else {
    navElmt.className = "topnav";
  }

  document.getElementById("NavContent").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}