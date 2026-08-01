from django.db import models
from users.models import UserProfile
from algorithms.models import Algorithm

class UserProgress(models.Model):
    STATUS_CHOICES = [
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='progress_records')
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='user_progress')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NOT_STARTED')
    score = models.IntegerField(default=0)
    completed_at = models.DateTimeField(blank=True, null=True)
    last_accessed = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'algorithm')

    def __str__(self):
        return f"{self.user.email} - {self.algorithm.title} ({self.status})"

class Achievement(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=150)
    code = models.CharField(max_length=50)
    description = models.TextField()
    earned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} earned by {self.user.email}"
