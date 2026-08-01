from django.urls import path
from progress.views import UserProgressListView, AchievementListView

urlpatterns = [
    path('', UserProgressListView.as_view(), name='user-progress-list'),
    path('achievements/', AchievementListView.as_view(), name='achievement-list'),
]
