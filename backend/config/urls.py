from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root_view(request):
    return JsonResponse({
        "message": "AlgoVerse Engineering Learning Platform API",
        "status": "online",
        "endpoints": {
            "users": "/api/users/",
            "algorithms": "/api/algorithms/",
            "progress": "/api/progress/",
            "graphs": "/api/graphs/",
            "quiz": "/api/quiz/",
            "bookmarks": "/api/bookmarks/",
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', api_root_view, name='api-root'),
        path('users/', include('users.urls')),
        path('progress/', include('progress.urls')),
        path('algorithms/', include('algorithms.urls')),
        path('graphs/', include('graphs.urls')),
        path('quiz/', include('quiz.urls')),
        path('bookmarks/', include('bookmarks.urls')),
    ])),
]
