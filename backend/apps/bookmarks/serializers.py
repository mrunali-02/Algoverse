from rest_framework import serializers
from bookmarks.models import Bookmark
from algorithms.serializers import AlgorithmSerializer

class BookmarkSerializer(serializers.ModelSerializer):
    algorithm_detail = AlgorithmSerializer(source='algorithm', read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'algorithm', 'algorithm_detail', 'created_at']
        read_only_fields = ['id', 'created_at']
