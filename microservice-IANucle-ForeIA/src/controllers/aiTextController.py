from flask import Blueprint, request, jsonify
from ..services.aiTextService import AiTextService

aiTextService = AiTextService()

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/textiastatus", methods=["GET"])
def status():
    response = aiTextService.status()
    
    return jsonify({"status": response})


@ai_bp.route("/message", methods=["POST"])
def message():
    body = request.json
    
    if not body.get("message"):
        return jsonify({"error": "message is empty"}), 400
    
    response = aiTextService.message(body.get("message"), body.get("conversation"))
    
    return jsonify({"response": response})



@ai_bp.route("/chatNameGenerator", methods=["POST"])
def chatNameGenerator():
        body = request.json
        
        response = aiTextService.chatNameGenerator(body.get("conversation"))
    
        return jsonify({"response": response})
        


@ai_bp.route("/chatResume", methods=["POST"])
def chatResumeGenerator():
        body = request.json
        
        response = aiTextService.chatResumeGenerator(body.get("conversation"))
    
        return jsonify({"response": response})