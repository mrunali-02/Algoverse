from django.db import models

class Algorithm(models.Model):
    CATEGORY_CHOICES = [
        ('GRAPH', 'Graph Algorithms'),
        ('SORTING', 'Sorting Algorithms'),
        ('TREES', 'Trees'),
        ('DP', 'Dynamic Programming'),
        ('OS', 'Operating System Scheduling'),
        ('DBMS', 'DBMS'),
        ('NETWORKING', 'Computer Networks'),
        ('COMPILER', 'Compiler Design'),
        ('ML', 'Machine Learning'),
    ]

    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='GRAPH')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='MEDIUM')
    description = models.TextField()
    pseudocode = models.TextField()
    time_complexity = models.CharField(max_length=100)
    space_complexity = models.CharField(max_length=100)
    theory_content = models.JSONField(default=dict, help_text="Detailed theory sections (intro, applications, etc.)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
