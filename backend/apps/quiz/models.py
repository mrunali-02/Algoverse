from django.db import models
from users.models import UserProfile
from algorithms.models import Algorithm

class QuizQuestion(models.Model):
    TYPE_CHOICES = [
        ('MCQ', 'Multiple Choice'),
        ('PREDICT_NEXT_STEP', 'Predict Next Simulation Step'),
        ('FILL_BLANK', 'Fill in the Blank'),
    ]

    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    question_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='MCQ')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='MEDIUM')
    options = models.JSONField(blank=True, null=True, help_text="List of choices for MCQ questions")
    correct_answer = models.CharField(max_length=255)
    explanation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.algorithm.title} Question ({self.question_type})"

class QuizResult(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='quiz_results')
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name='results')
    is_correct = models.BooleanField()
    selected_answer = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {'Correct' if self.is_correct else 'Incorrect'}"
