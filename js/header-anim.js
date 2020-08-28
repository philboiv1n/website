  var alreadyLoaded = false;
  var observer = new IntersectionObserver(function(entries) {

  // Scrolling down
  if(entries[0].intersectionRatio === 0) {
    document.querySelector("header").classList.add("sticky"); 
    document.querySelector("#topBar").classList.add("bgColor-in");
    document.querySelector("#topBar").classList.remove("bgColor-out");
    document.querySelector("#logo").classList.add("logo-light");
    document.querySelector("#logo").classList.remove("logo-wave");
    alreadyLoaded = true;
  }

  // Top of the screen
  else if(entries[0].intersectionRatio === 1 && alreadyLoaded) {
    document.querySelector("header").classList.remove("sticky");
    document.querySelector("#topBar").classList.remove("bgColor-in");
    document.querySelector("#topBar").classList.add("bgColor-out");
    document.querySelector("#logo").classList.remove("logo-light");
    document.querySelector("nav").classList.remove("nav-light");
  }
}, { threshold: [0,1] });

observer.observe(document.querySelector("#topRef"));
