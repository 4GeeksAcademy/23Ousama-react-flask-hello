from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    user = User.query.filter_by(email=email).first()
    if user:
        raise APIException("El usuario con este email ya existe", status_code=409)

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    user = User.query.filter_by(email=email).first()
    if not user:
        raise APIException("Email o contraseña incorrectos", status_code=401)

    if not user.check_password(password):
        raise APIException("Email o contraseña incorrectos", status_code=401)

    access_token = create_access_token(identity=user.id)
    return jsonify(token=access_token, user_id=user.id), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_data():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(message=f"¡Hola, usuario {user.email}! Has accedido a contenido privado."), 200

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! This is a public endpoint."
    }
    return jsonify(response_body), 200