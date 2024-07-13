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
