from django.urls import path
from quiz.views import QuizQuestionListView, QuizSubmitView

urlpatterns = [
    path('questions/', QuizQuestionListView.as_view(), name='quiz-questions'),
    path('submit/', QuizSubmitView.as_view(), name='quiz-submit'),
]
