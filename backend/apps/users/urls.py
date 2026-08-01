from django.urls import path
from users.views import UserSyncView, UserProfileView

urlpatterns = [
    path('sync/', UserSyncView.as_view(), name='user-sync'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
