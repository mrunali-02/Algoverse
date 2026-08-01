from rest_framework import serializers
from graphs.models import SavedGraph

class SavedGraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedGraph
        fields = ['id', 'title', 'description', 'graph_data', 'is_directed', 'is_public', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
