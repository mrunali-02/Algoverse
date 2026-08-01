import os
import sys
import django

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'apps'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from algorithms.models import Algorithm
from quiz.models import QuizQuestion

# Seed Dijkstra Algorithm
alg, created = Algorithm.objects.get_or_create(
    slug='dijkstra',
    defaults={
        'title': "Dijkstra's Algorithm",
        'category': 'GRAPH',
        'difficulty': 'MEDIUM',
        'description': "Find shortest paths from a single source node to all reachable nodes in a weighted graph with non-negative edge weights.",
        'pseudocode': "function Dijkstra(Graph, source):\n  dist[source] = 0\n  PQ.push((source, 0))\n  while PQ is not empty:\n    (u, d) = PQ.pop_min()\n    for each neighbor v of u:\n      newDist = dist[u] + weight(u, v)\n      if newDist < dist[v]:\n        dist[v] = newDist\n        PQ.push((v, newDist))",
        'time_complexity': 'O((V + E) log V)',
        'space_complexity': 'O(V)',
        'theory_content': {
            'overview': 'Greedy algorithm for single-source shortest paths.',
            'applications': ['GPS Navigation', 'OSPF Routing Protocols'],
        }
    }
)

if created:
    print("Created Dijkstra Algorithm database entry.")
else:
    print("Dijkstra Algorithm database entry already exists.")

# Seed Quiz Questions
q1, q1_created = QuizQuestion.objects.get_or_create(
    algorithm=alg,
    question="What type of graph edge weights does Dijkstra's Algorithm require?",
    defaults={
        'question_type': 'MCQ',
        'difficulty': 'EASY',
        'options': [
            "Non-negative edge weights only",
            "Negative edge weights only",
            "Unweighted edges only",
            "Any arbitrary real numbers"
        ],
        'correct_answer': "Non-negative edge weights only",
        'explanation': "Dijkstra relies on a greedy strategy where path distances monotonically increase. Negative weights break this assumption."
    }
)

if q1_created:
    print("Seeded initial quiz questions.")
