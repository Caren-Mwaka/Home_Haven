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

    def register(self):
        username = request.json.get("username")
        email = request.json.get("email")
        password = request.json.get("password")

        if not username or not email or not password:
            return {"error": "Missing fields"}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201

    def login(self):
        username = request.json.get("username")
        password = request.json.get("password")

        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            return {"message": "Logged in successfully"}
        return {"error": "Invalid credentials"}, 401

    def logout(self):
        session.pop('user_id', None)
        return {"message": "Logged out successfully"}

class RoomResource(Resource):
    def post(self):
        data = request.get_json()
        new_room = Room(room_number=data['room_number'], type=data['type'], price=data['price'])
        db.session.add(new_room)
        db.session.commit()
        return {"message": "Room created"}, 201

    def get(self):
        rooms = Room.query.all()
        return [room.to_dict() for room in rooms]

    def patch(self, room_id):
        room = Room.query.filter(Room.id == room_id).first()
        if not room:
            raise NotFound()
        data = request.get_json()
        if 'room_number' in data:
            room.room_number = data['room_number']
        if 'type' in data:
            room.type = data['type']
        if 'price' in data:
            room.price = data['price']
        db.session.commit()
        return {"message": "Room updated"}

    def delete(self, room_id):
        room = Room.query.filter(Room.id == room_id).first()
        if not room:
            raise NotFound()
        db.session.delete(room)
        db.session.commit()
        return {"message": "Room successfully deleted"}

class BookingResource(Resource):
    def post(self):
        data = request.get_json()
        new_booking = Booking(check_in_date=data['check_in_date'], check_out_date=data['check_out_date'],
                              user_id=data['user_id'], room_id=data['room_id'])
        db.session.add(new_booking)
        db.session.commit()
        return {"message": "Booking created"}, 201

    def get(self):
        bookings = Booking.query.all()
        return [booking.to_dict() for booking in bookings]

    def patch(self, booking_id):
        booking = Booking.query.filter(Booking.id == booking_id).first()
        if not booking:
            raise NotFound()
        data = request.get_json()
        if 'check_in_date' in data:
            booking.check_in_date = data['check_in_date']
        if 'check_out_date' in data:
            booking.check_out_date = data['check_out_date']
        db.session.commit()
        return {"message": "Booking updated"}

    def delete(self, booking_id):
        booking = Booking.query.filter(Booking.id == booking_id).first()
        if not booking:
            raise NotFound()
        db.session.delete(booking)
        db.session.commit()
        return {"message": "Booking successfully deleted"}

class ReviewResource(Resource):
    def post(self):
        data = request.get_json()
        new_review = Review(rating=data['rating'], comment=data['comment'], user_id=data['user_id'], room_id=data['room_id'])
        db.session.add(new_review)
        db.session.commit()
        return {"message": "Review created"}, 201

    def get(self):
        reviews = Review.query.all()
        return [review.to_dict() for review in reviews]

    def patch(self, review_id):
        review = Review.query.filter(Review.id == review_id).first()
        if not review:
            raise NotFound()
        data = request.get_json()
        if 'rating' in data:
            review.rating = data['rating']
        if 'comment' in data:
            review.comment = data['comment']
        db.session.commit()
        return {"message": "Review updated"}

    def delete(self, review_id):
        review = Review.query.filter(Review.id == review_id).first()
        if not review:
            raise NotFound()
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review successfully deleted"}

api.add_resource(Index, '/')  
api.add_resource(UserResource, '/users', '/users/login', '/users/logout', '/users/<int:user_id>')
api.add_resource(RoomResource, '/rooms', '/rooms/<int:room_id>')
api.add_resource(BookingResource, '/bookings', '/bookings/<int:booking_id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:review_id>')
