from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """
    Extends Django Auth User with Clerk synchronization metadata.
    Does NOT store passwords. Auth is fully delegated to Clerk.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    clerk_id = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} ({self.clerk_id})"
