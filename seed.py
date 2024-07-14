from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import User, Room, Booking, Review 

engine = create_engine('your_database_uri')
Session = sessionmaker(bind=engine)
session = Session()

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

for room_data in rooms_data:
    try:
        room = Room(**room_data)
        session.add(room)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error adding room {room_data['number']}: {e}")

users = session.query(User).all()
rooms = session.query(Room).all()

for booking_data in bookings_data:
    try:
        user = users[booking_data['user_index']] if booking_data['user_index'] < len(users) else None
        room = rooms[booking_data['room_index']] if booking_data['room_index'] < len(rooms) else None
        if user and room:
            booking = Booking(user=user, room=room, check_in=booking_data['check_in'], check_out=booking_data['check_out'])
            session.add(booking)
            session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error adding booking for user {booking_data['user_index']} and room {booking_data['room_index']}: {e}")

for review_data in reviews_data:
    try:
        user = users[review_data['user_index']] if review_data['user_index'] < len(users) else None
        room = rooms[review_data['room_index']] if review_data['room_index'] < len(rooms) else None
        if user and room:
            review = Review(user=user, room=room, rating=review_data['rating'], comment=review_data['comment'])
            session.add(review)
            session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error adding review by user {review_data['user_index']} for room {review_data['room_index']}: {e}")