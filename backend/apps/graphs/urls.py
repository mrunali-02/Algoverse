from django.urls import path
from graphs.views import SavedGraphListCreateView, SavedGraphDetailView

urlpatterns = [
    path('', SavedGraphListCreateView.as_view(), name='saved-graph-list-create'),
    path('<int:pk>/', SavedGraphDetailView.as_view(), name='saved-graph-detail'),
]
