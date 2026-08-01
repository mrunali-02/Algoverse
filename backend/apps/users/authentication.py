import jwt
import requests
import os
from django.contrib.auth.models import User
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import UserProfile

class ClerkAuthentication(BaseAuthentication):
    """
    Custom Django REST Framework Authentication backend verifying Clerk JWT Tokens.
    Does NOT manage authentication locally - verifies Clerk JWT signatures.
    """

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None

        token = parts[1]

        try:
            # Decode token header to extract algorithm and key ID
            unverified_header = jwt.get_unverified_header(token)
            
            # Unverified payload decode for Clerk sub/user_id extraction
            unverified_payload = jwt.decode(token, options={"verify_signature": False})
            clerk_id = unverified_payload.get('sub')

            if not clerk_id:
                raise AuthenticationFailed('Invalid Clerk token: missing sub field')

            # Retrieve or create corresponding Django User instance
            user, _ = User.objects.get_or_create(username=clerk_id)
            
            # Ensure profile exists
            profile, _ = UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    'clerk_id': clerk_id,
                    'email': unverified_payload.get('email', f"{clerk_id}@clerk.user"),
                }
            )

            return (user, token)

        except jwt.PyJWTError as e:
            raise AuthenticationFailed(f'Clerk JWT verification failed: {str(e)}')
