from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import User, Room, Booking, Review 

users_data = [
    {'name': 'James Bond', 'email': 'jamesbond@gmail.com', 'password': 'James5566'},
    {'name': 'Jane Quartz', 'email': 'jquartz13@gmail.com', 'password': 'jQuarTz13'},
]

rooms_data = [
    {'number': '420', 'type': 'single', 'price': 10000, 'availability': True},
    {'number': '690', 'type': 'double', 'price': 15000, 'availability': True},
]