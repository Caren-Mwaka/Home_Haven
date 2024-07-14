from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import db, User, Room, Booking, Review  # Assuming your models are defined here

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

try:
    # Adding users
    for user_data in users_data:
        user = User(**user_data)
        db.session.add(user)
    db.session.commit()

    # Adding rooms
    for room_data in rooms_data:
        room = Room(**room_data)
        db.session.add(room)
    db.session.commit()

    # Retrieve users and rooms from the session to ensure they are present for the following operations
    users = session.query(User).all()
    rooms = session.query(Room).all()

    # Adding bookings
    for booking_data in bookings_data:
        user = users[booking_data['user_index']] if booking_data['user_index'] < len(users) else None
        room = rooms[booking_data['room_index']] if booking_data['room_index'] < len(rooms) else None
        if user and room:
            booking = Booking(user=user, room=room, check_in=booking_data['check_in'], check_out=booking_data['check_out'])
            db.session.add(booking)
    db.session.commit()

    # Adding reviews
    for review_data in reviews_data:
        user = users[review_data['user_index']] if review_data['user_index'] < len(users) else None
        room = rooms[review_data['room_index']] if review_data['room_index'] < len(rooms) else None
        if user and room:
            review = Review(user=user, room=room, rating=review_data['rating'], comment=review_data['comment'])
            db.session.add(review)
    db.session.commit()

except Exception as e:
    db.session.rollback()
    print(f"Error: {e}")

finally:
    db.session.close()
    session.close()
