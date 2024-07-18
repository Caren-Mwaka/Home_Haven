import re
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    bookings = db.relationship('Booking', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email format")
        return email

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters long")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            raise ValueError("Password must contain at least one special character")
        return password

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat()
        }

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(20), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(255))
    bookings = db.relationship('Booking', back_populates='room', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='room', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "room_number": self.room_number,
            "type": self.type,
            "price": float(self.price),
            "image_url": self.image_url
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    check_in_date = db.Column(db.DateTime, nullable=False)
    check_out_date = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', back_populates='bookings')
    room = db.relationship('Room', back_populates='bookings')

    __table_args__ = (
        db.UniqueConstraint('room_id', 'check_in_date', 'check_out_date'),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "room_id": self.room_id,
            "check_in_date": self.check_in_date.isoformat(),
            "check_out_date": self.check_out_date.isoformat()
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), db.ForeignKey('user.username'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user = db.relationship('User', back_populates='reviews')
    room = db.relationship('Room', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "room_id": self.room_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat()
        }
