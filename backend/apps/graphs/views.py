from rest_framework import generics, permissions
from graphs.models import SavedGraph
from graphs.serializers import SavedGraphSerializer

class SavedGraphListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedGraphSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedGraph.objects.filter(user=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)

class SavedGraphDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SavedGraphSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedGraph.objects.filter(user=self.request.user.profile)
