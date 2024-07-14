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

reviews_data = [
    {'user_index': 0, 'room_index': 0, 'rating': 5, 'comment': 'The room was quite luxurious and comfortable.'},
    {'user_index': 1, 'room_index': 1, 'rating': 4, 'comment': 'Moderate stay could have been way better.'},
    {'user_index': 0, 'room_index': 1, 'rating': 3, 'comment': 'Some of the facilities were not working'},
    {'user_index': 1, 'room_index': 0, 'rating': 4, 'comment': 'The food was quite good and the beds were comfortable'},
]

for user_data in users_data:
    try:
        user = User(**user_data)
        session.add(user)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error adding user {user_data['name']}: {e}")