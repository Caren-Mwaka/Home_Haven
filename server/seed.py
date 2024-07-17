from app import app, bcrypt
from models import db, User, Room, Booking, Review
from datetime import datetime

def seed_db():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create users
        users = []
        for username, email, password in [
            ('user1', 'user1@example.com', 'password1'),
            ('user2', 'user2@example.com', 'password2'),
            ('user3', 'user3@example.com', 'password3')
        ]:
            user = User(username=username, email=email,
                        password=bcrypt.generate_password_hash(password).decode('utf-8'))
            db.session.add(user)
            users.append(user)

        try:
            db.session.commit()
            print("Users committed successfully!")
        except Exception as e:
            print(f"Error committing users: {e}")

        for user in users:
            print(f"User ID: {user.id}, Username: {user.username}")

        # Create rooms
        rooms = [
            Room(room_number='101', type='Single', price=100.00, image_url='https://media.istockphoto.com/id/175507115/photo/beach-water-villa-house-interior-xlarge.webp?b=1&s=170667a&w=0&k=20&c=yt3LNDGougLS4Y1PEY_F0xCqmcFsozJz8M3Dq0MosU0='),
            Room(room_number='102', type='Double', price=150.00, image_url='http://example.com/image2.jpg'),
            Room(room_number='103', type='Suite', price=200.00, image_url='http://example.com/image3.jpg'),
            Room(room_number='104', type='Family', price=250.00, image_url='http://example.com/image4.jpg'),
            Room(room_number='105', type='Single', price=120.00, image_url='http://example.com/image5.jpg'),
            Room(room_number='106', type='Double', price=180.00, image_url='http://example.com/image6.jpg'),
            Room(room_number='107', type='Suite', price=220.00, image_url='http://example.com/image7.jpg'),
            Room(room_number='108', type='Family', price=270.00, image_url='http://example.com/image8.jpg'),
            Room(room_number='109', type='Single', price=110.00, image_url='http://example.com/image9.jpg'),
            Room(room_number='110', type='Double', price=160.00, image_url='http://example.com/image10.jpg')
        ]

        for room in rooms:
            db.session.add(room)

        try:
            db.session.commit()
            print("Rooms committed successfully!")
        except Exception as e:
            print(f"Error committing rooms: {e}")

        for room in rooms:
            print(f"Room ID: {room.id}, Room Number: {room.room_number}")

        # Create bookings
        if users and rooms:
            booking1 = Booking(user_id=users[0].id, room_id=rooms[0].id,
                               check_in_date=datetime.strptime('2024-07-01', '%Y-%m-%d'),
                               check_out_date=datetime.strptime('2024-07-05', '%Y-%m-%d'))
            booking2 = Booking(user_id=users[1].id, room_id=rooms[1].id,
                               check_in_date=datetime.strptime('2024-07-10', '%Y-%m-%d'),
                               check_out_date=datetime.strptime('2024-07-15', '%Y-%m-%d'))
            db.session.add(booking1)
            db.session.add(booking2)

            try:
                db.session.commit()
                print("Bookings committed successfully!")
            except Exception as e:
                print(f"Error committing bookings: {e}")

        # Create reviews
        if users and rooms:
            review1 = Review(username=users[0].username, room_id=rooms[0].id, rating=5, comment='Great room!')
            review2 = Review(username=users[1].username, room_id=rooms[1].id, rating=4, comment='Nice and cozy.')
            db.session.add(review1)
            db.session.add(review2)

            try:
                db.session.commit()
                print("Reviews committed successfully!")
            except Exception as e:
                print(f"Error committing reviews: {e}")

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_db()
