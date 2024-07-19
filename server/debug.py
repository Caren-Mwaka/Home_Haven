from app import app
from models import db, User, Room, Booking, Review

if __name__ == '__main__':
    
    with app.app_context():
        import ipdb; ipdb.set_trace()