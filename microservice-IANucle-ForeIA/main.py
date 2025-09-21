from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from src.middlewares.authMiddleware import authTokenMiddleware
from src.controllers.aiTextController import ai_bp

load_dotenv()

app = Flask(__name__)

@app.before_request
def authTMiddleware():
    return authTokenMiddleware()

@app.route("/foreianucle/api/status", methods=["GET"])
def status():
    return jsonify({"message": "hello there"})

app.register_blueprint(ai_bp, url_prefix='/foreianucle/api')

if __name__ == "__main__":
    
    app.run(host="0.0.0.0", port=os.getenv("PORT"))

