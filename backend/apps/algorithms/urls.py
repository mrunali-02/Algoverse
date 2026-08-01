from django.urls import path
from algorithms.views import AlgorithmListView, AlgorithmDetailView

urlpatterns = [
    path('', AlgorithmListView.as_view(), name='algorithm-list'),
    path('<slug:slug>/', AlgorithmDetailView.as_view(), name='algorithm-detail'),
]
