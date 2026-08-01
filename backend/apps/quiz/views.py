from rest_framework import generics, permissions
from quiz.models import QuizQuestion, QuizResult
from quiz.serializers import QuizQuestionSerializer, QuizResultSerializer

class QuizQuestionListView(generics.ListAPIView):
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = QuizQuestion.objects.all()
        algorithm_slug = self.request.query_params.get('algorithm')
        if algorithm_slug:
            queryset = queryset.filter(algorithm__slug=algorithm_slug)
        return queryset

class QuizSubmitView(generics.CreateAPIView):
    serializer_class = QuizResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        question_id = self.request.data.get('question')
        selected_answer = self.request.data.get('selected_answer', '')
        
        try:
            question = QuizQuestion.objects.get(id=question_id)
            is_correct = (question.correct_answer.strip().lower() == selected_answer.strip().lower())
            serializer.save(
                user=self.request.user.profile,
                question=question,
                is_correct=is_correct,
                selected_answer=selected_answer
            )
        except QuizQuestion.DoesNotExist:
            raise serializers.ValidationError({"question": "Question not found"})
