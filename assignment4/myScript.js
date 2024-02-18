// Create grandprix class
class GrandPrix {
    constructor(name, date, circuit, race_time, round, trackImg) {
        this.name = name;
        this.date = date;
        this.circuit = circuit;
        this.race_time = race_time;
        this.round = round 
        this.trackImg = trackImg;

    }
    getRaceDetails() {
        // returns race details with formatting
        return `<p>Grand Prix: ${this.name}</p>
                <p>Date: ${this.date}</p>
                <p>Circuit Name: ${this.circuit}</p>
                <p>Race Start Time (PST): ${this.race_time}</p>`
                
    }
    getTrackImg() {
        // returns path for track image
        return this.trackImg
    }
}

// Create instances of GrandPrix, use const to provide immutability for the reference
const monacoGP = new GrandPrix("Monaco GP", "May 24 - 26", "Circuit de Monaco", "Sat, May 25 @6:00 PM PST", 8, "images/monaco.png")
const bahrainGP = new GrandPrix("Bahrain GP", "Feb 28 - Mar 1", "Bahrain International Circuit", "Fri, Mar 1 @1:00 PM PST", 1, "images/bahrain.avif")
const saudiGP = new GrandPrix("Saudi Arabia GP", "Mar 7 - Mar 9", "Jeddah Street Circuit", "Fri, Mar 8 @1:00 PM PST", 1, "images/saudi.png")

// Create array for all instances of GPs
let listGPs = [monacoGP, bahrainGP, saudiGP];

// Function to iterate through listGPs
function printListofGPs () {
    for(const grandPrix in listGPs) {
        console.log(grandPrix.name)
    }
}

// Function to showRaceDetails when event (button) is pressed
function showRaceDetails() {
    // retrieve HTML element and store in userSelectRace. this is the race the user selected 
    let userSelectGP = document.getElementById('selectRace').value
    // find instance of user selected GP in list to get the object (not just the string)
    let selectedGrandPrix = listGPs.find(gp => userSelectGP === gp.name);
    // retrieve HTML element and store in create variable called outputRaceDetails
    let outputRaceDetails = document.getElementById('raceDetailsOutput')
    // store output of the getRaceDetails() function in outputRaceDetails
    outputRaceDetails.innerHTML = selectedGrandPrix.getRaceDetails();

}

// Function to show trackImg when event (button) is pressed
function showRaceTrack() {
    // retrieve HTML element and store in userSelectRace. this is the race the user selected 
    let userSelectGP = document.getElementById('selectRace').value
    // find instance of user selected GP in list to get the object (not just the string)
    let selectedGrandPrix = listGPs.find(gp => userSelectGP === gp.name);
    // retrieve HTML element and store in create variable called outputTrackImg
    let outputTrackImg = document.getElementById('raceTrackOutput')
    
    // create an img element
    let imgElement = document.createElement('img');
    // set the src to trackImg URL for that Grand Prix
    imgElement.src = selectedGrandPrix.getTrackImg();
    // set id for image to allow for css styling
    imgElement.id = "imgElement"
    // add imgElement to the div block for outputTrackImg
    outputTrackImg.innerHTML = '';  // Clear existing content
    outputTrackImg.appendChild(imgElement);
}