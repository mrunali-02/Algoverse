from rest_framework import serializers
from algorithms.models import Algorithm

class AlgorithmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Algorithm
        fields = '__all__'
