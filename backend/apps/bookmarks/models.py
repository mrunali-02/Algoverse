from django.db import models
from users.models import UserProfile
from algorithms.models import Algorithm

class Bookmark(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='bookmarks')
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='bookmarked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'algorithm')

    def __str__(self):
        return f"{self.user.email} bookmarked {self.algorithm.title}"
