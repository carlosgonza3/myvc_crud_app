const slideshow = ["Assets/team1.jpg", "Assets/team2.jpg", "Assets/team3.jpg"]
let i = 0;

loadPage()

function loadPage() {
    setInterval(() => {
        next();
    }, 5000);
}


function next() {
    const img = document.getElementById("slideshow");
    i = (i+1)%slideshow.length;
    img.setAttribute("src", slideshow[i]);
}