from rest_framework import serializers
from quiz.models import QuizQuestion, QuizResult

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'algorithm', 'question', 'question_type', 'difficulty', 'options', 'explanation']

class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = ['id', 'question', 'is_correct', 'selected_answer', 'created_at']
        read_only_fields = ['id', 'created_at']
