from flask import Flask, jsonify, request, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.exceptions import NotFound
from models import db, User, Room, Booking, Review  
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'  
app.config['SESSION_TYPE'] = 'filesystem'

db.init_app(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
CORS(app, origins=["http://localhost:5173"])

api = Api(app)

@app.errorhandler(NotFound)
def handle_not_found(e):
    return jsonify({"error": "Not Found", "message": "The requested resource does not exist."}), 404

class Index(Resource):
    def get(self):
        return {"index": "Welcome to the Home Haven"}

class UserResource(Resource):
    def post(self):
        if request.path.endswith('/login'):
            return self.login()
        elif request.path.endswith('/logout'):
            return self.logout()
        else:
            return self.register()

    def get(self):
        users = User.query.all()
        return {"users": [user.to_dict() for user in users]}


