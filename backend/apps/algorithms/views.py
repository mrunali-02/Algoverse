from rest_framework import generics, permissions
from algorithms.models import Algorithm
from algorithms.serializers import AlgorithmSerializer

class AlgorithmListView(generics.ListAPIView):
    queryset = Algorithm.objects.filter(is_active=True)
    serializer_class = AlgorithmSerializer
    permission_classes = [permissions.AllowAny]

class AlgorithmDetailView(generics.RetrieveAPIView):
    queryset = Algorithm.objects.filter(is_active=True)
    serializer_class = AlgorithmSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]
