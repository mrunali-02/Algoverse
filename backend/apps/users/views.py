from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from users.models import UserProfile
from users.serializers import UserProfileSerializer

class UserSyncView(APIView):
    """
    Syncs Clerk authentication user payload with Django database.
    Called when frontend user logs in or signs up via Clerk.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        clerk_id = request.data.get('clerk_id', user.username)
        email = request.data.get('email', '')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        avatar_url = request.data.get('avatar_url', '')

        profile, created = UserProfile.objects.get_or_create(
            user=user,
            defaults={
                'clerk_id': clerk_id,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'avatar_url': avatar_url,
            }
        )

        if not created:
            profile.email = email or profile.email
            profile.first_name = first_name or profile.first_name
            profile.last_name = last_name or profile.last_name
            profile.avatar_url = avatar_url or profile.avatar_url
            profile.save()

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)

class UserProfileView(APIView):
    """
    Returns authenticated user profile information.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
