from rest_framework import serializers
from progress.models import UserProgress, Achievement
from algorithms.serializers import AlgorithmSerializer

class UserProgressSerializer(serializers.ModelSerializer):
    algorithm_detail = AlgorithmSerializer(source='algorithm', read_only=True)

    class Meta:
        model = UserProgress
        fields = ['id', 'algorithm', 'algorithm_detail', 'status', 'score', 'completed_at', 'last_accessed']

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'code', 'description', 'earned_at']
