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

bookings_data = [
    {'user_index': 0, 'room_index': 0, 'check_in': '2024-11-01', 'check_out': '2024-11-05'},
    {'user_index': 1, 'room_index': 1, 'check_in': '2024-11-10', 'check_out': '2024-11-15'},
]