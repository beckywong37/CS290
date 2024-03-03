from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Serve static files from static folder (for images in static folder)
app.static_folder = 'static'

# Route to render HTML template
@app.route('/')
def index():
    return render_template('F1_Schedule.html')

# Create GrandPrix class to represent races in F1
class GrandPrix:
    def __init__(self, name, date, circuit, race_time, round, trackImg):
        """Constructor for creating instance of grand prix"""
        self.name = name
        self.date = date
        self.circuit = circuit
        self.race_time = race_time
        self.round = round 
        self.trackImg = trackImg

    def get_race_details(self):
        """Returns race details"""
        return {
            'name': self.name,
            'date': self.date,
            'circuit': self.circuit,
            'race_time': self.race_time,
        }

    def get_track_img(self):
        """Returns path for image of the race track"""
        return self.trackImg

# Create instances of GrandPrix
monacoGP = GrandPrix("Monaco GP", "May 24 - 26", "Circuit de Monaco", "Sat, May 25 @6:00 PM PST", 8, "images/monaco.png")
bahrainGP = GrandPrix("Bahrain GP", "Feb 28 - Mar 1", "Bahrain International Circuit", "Fri, Mar 1 @1:00 PM PST", 1, "images/bahrain.avif")
saudiGP = GrandPrix("Saudi Arabia GP", "Mar 7 - Mar 9", "Jeddah Street Circuit", "Fri, Mar 8 @1:00 PM PST", 1, "images/saudi.png")

# Create array for all instances of GPs
listGPs = [monacoGP, bahrainGP, saudiGP]

# Route to get race details when button is clicked
@app.route('/get_race_details')
def get_race_details():
    """Retrieves selected race from user, prints race details on webpage"""
    selected_race = request.args.get('selectedRace')

    # selected_race is a string, need the corresponding grand prix object
    # loop through listGPs, if selected_race matches name attribute
    # set object equal to variable selected_race_object
    selected_race_object = None
    for grand_prix in listGPs:
        if grand_prix.name == selected_race:
            selected_race_object = grand_prix
            break

    # Check if the Grand Prix was found, if found return race_details
    if selected_race_object is not None:
        race_details = {
            'name': selected_race_object.name,
            'date': selected_race_object.date,
            'circuit': selected_race_object.circuit,
            'race_time': selected_race_object.race_time,
        }
        return jsonify({'race_details': race_details})
    else:
        return jsonify({'error': 'Grand Prix not found'})

# Route to get race track when button is clicked
@app.route('/get_race_track')
def get_race_track():
    selected_race = request.args.get('selectedRace')

    # selected_race is a string, need the corresponding grand prix object
    selected_race_object = None
    for grand_prix in listGPs:
        if grand_prix.name == selected_race:
            selected_race_object = grand_prix
            break

    # Check if the Grand Prix was found, return path to track image
    if selected_race_object is not None:
        return jsonify({'track_img': selected_race_object.trackImg})
    else:
        return jsonify({'error': 'Grand Prix not found'})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
