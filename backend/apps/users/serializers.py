from rest_framework import serializers
from users.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'clerk_id', 'email', 'first_name', 'last_name', 'avatar_url', 'created_at']
        read_only_fields = ['id', 'clerk_id', 'created_at']
