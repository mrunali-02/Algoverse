from django.urls import path
from bookmarks.views import BookmarkListCreateView, BookmarkDestroyView

urlpatterns = [
    path('', BookmarkListCreateView.as_view(), name='bookmark-list-create'),
    path('<int:pk>/', BookmarkDestroyView.as_view(), name='bookmark-destroy'),
]
