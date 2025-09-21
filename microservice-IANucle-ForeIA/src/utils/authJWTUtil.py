import jwt
import os
from dotenv import load_dotenv

load_dotenv()

class AuthJWTUtil:
    
    def __init__(self):
        self.jwtKey = os.getenv("FOREIANUCLE_MICROSERVICE_TOKENKEY")
        
    def verifyToken(self, token):
        try:
            payload = jwt.decode(token, self.jwtKey,algorithms=["HS256"])
                
            return payload

        except Exception as error:
            raise ValueError("ivalid token")
        
    
    
    
    
authJWTUtil = AuthJWTUtil()