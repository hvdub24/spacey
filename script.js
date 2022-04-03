console.log("Starting")


//Constants
const today = new Date();

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}



const key = `8RBcSF5IknaJpELtlnf1E9upK5q4ZW7cdzlodvdy`
const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateToYMD(today)}&api_key=${key}`



console.log(today)

//Functions
function parseJSON(response) {
    return response.json();

}

Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

async function fetchData() {
    return await fetch(url)
        .then(checkStatus)
        .then(parseJSON)
}








//functions for the popup modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    fetchData().then(data => {
        let neoCollection = data["near_earth_objects"]
        let objArray = []

        for (const [key, value] of Object.entries(neoCollection)) {
            value.forEach(x => {
                objArray.push(x)
            });

        }
        let ranNEO = objArray.random()
        document.getElementById("NEOname").innerHTML = ranNEO["name"]
        document.getElementById("willKill").innerHTML = ((ranNEO["is_potentially_hazardous_asteroid"]) ? "Heck yeah! Wait a min.." : "Nah... We good")

        console.log(objArray)
    })

    modal.style.display = "block";

}




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//Random elon quote generator
let quote = '';
const quotes = ['I would like to die on Mars. Just not on impact.',
    'I think that\'s the single best piece of advice: constantly think about how you could be doing things better and questioning yourself.',
    'Selling an electric sports car creates an opportunity to fundamentally change the way America drives.',
    'When Henry Ford made cheap, reliable cars people said, "Nah, what\'s wrong with a horse?" That was a huge bet he made, and it worked.',
    'Some people don\'t like change, but you need to embrace change if the alternative is disaster.',
    'I think it\'s very important to have a feedback loop, where you\'re constantly thinking about what you\'ve done and how you could be doing it better.',
    'The space shuttle was often used as an example of why you shouldn\'t even attempt to make something reusable. But one failed experiment does not invalidate the greater goal. If that was the case, we\'d never have had the light bulb.',
    'I don\'t create companies for the sake of creating companies, but to get things done.',
    'I\'m glad to see that BMW is bringing an electric car to market. That\'s cool.',
    'I don\'t spend my time pontificating about high-concept things; I spend my time solving engineering and manufacturing problems.',
    'Tesla is here to stay and keep fighting for the electric car revolution.',
    'Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.',
    'I think it matters whether someone has a good heart.',
    'Life is too short for long-term grudges.',
    'It\'s OK to have your eggs in one basket as long as you control what happens to that basket.',
    'If you get up in the morning and think the future is going to be better, it is a bright day. Otherwise, it\'s not.',
    'Any product that needs a manual to work is broken.',
    'If something\'s important enough, you should try. Even if you - the probable outcome is failure.',
    'I just want to retire before I go senile because if I don\'t retire before I go senile, then I\'ll do more damage than good at that point.',
    'I usually describe myself as an engineer; that\'s basically what I\'ve been doing since I was a kid.',
    'If humanity doesn\'t land on Mars in my lifetime, I would be very disappointed.',
    'There are some important differences between me and Tony Stark, like I have five kids, so I spend more time going to Disneyland than parties.',
    'You could warm Mars up, over time, with greenhouse gases.',
    'It is theoretically possible to warp spacetime itself, so you\'re not actually moving faster than the speed of light, but it\'s actually space that\'s moving.',
    'I say something, and then it usually happens. Maybe not on schedule, but it usually happens.',
    'There\'s a tremendous bias against taking risks. Everyone is trying to optimize their ass-covering.',
    'Persistence is very important. You should not give up unless you are forced to give up.',
    'Failure is an option here. If things are not failing, you are not innovating enough.',
    'When something is important enough, you do it even if the odds are not in your favor.',
    'If you\'re co-founder or CEO, you have to do all kinds of tasks you might not want to do... If you don\'t do your chores, the company won\'t succeed... No task is too menial.',
    'My biggest mistake is probably weighing too much on someone\'s talent and not someone\'s personality. I think it matters whether someone has a good heart.',
    'The first step is to establish that something is possible; then probability will occur.',
    'I\'ve actually not read any books on time management.',
    'Really pay attention to negative feedback and solicit it, particularly from friends. ... Hardly anyone does that, and it\'s incredibly helpful.',
    'Being an entrepreneur is like eating glass and staring into the abyss of death.',
    'You shouldn\'t do things differently just because they\'re different. They need to be... better.',
    'Disruptive technology where you really have a big technology discontinuity... tends to come from new companies.',
    'I always have optimism, but I\'m realistic. It was not with the expectation of great success that I started Tesla or SpaceX... It\'s just that I thought they were important enough to do anyway.',
    'Starting and growing a business is as much about the innovation, drive, and determination of the people behind it as the product they sell.'
];


$('#quoteButton').click(function() {
    document.getElementById("quoteButton").disabled = true


    quote = quotes[Math.floor(Math.random() * quotes.length)];

    var i = 0;
    var speed = 50; /* The speed/duration of the effect in milliseconds */

    document.getElementById("tamana").innerHTML = ""

    function typeWriter() {

        if (i < quote.length) {

            document.getElementById("tamana").innerHTML += quote.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {

            document.getElementById("quoteButton").disabled = false

        }


    }
    typeWriter()

});