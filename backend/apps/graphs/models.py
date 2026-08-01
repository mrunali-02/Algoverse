from django.db import models
from users.models import UserProfile

class SavedGraph(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='saved_graphs')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    graph_data = models.JSONField(help_text="Serialized ReactFlow node and edge structures")
    is_directed = models.BooleanField(default=True)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.email}"
