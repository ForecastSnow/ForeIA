from src.utils.authJWTUtil import authJWTUtil
from flask import request, jsonify

def authTokenMiddleware():
    
    try:
        
        Authorization = request.cookies.get('Authorization')
        
        if Authorization == None:
            raise ValueError("Authorization undefined")
        
        decodedtoken = authJWTUtil.verifyToken(Authorization)
        
        if decodedtoken["iss"] != "api.tomasperez.work":
            raise ValueError("invalid token")
    
        return None
    
    except Exception as error:
            print(error)
            return jsonify({"error": "Acceso denegado"}), 401