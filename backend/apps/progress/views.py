from rest_framework import generics, permissions, status
from rest_framework.response import Response
from progress.models import UserProgress, Achievement
from progress.serializers import UserProgressSerializer, AchievementSerializer

class UserProgressListView(generics.ListCreateAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)

class AchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user.profile)
