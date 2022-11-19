from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_student_courses),  
    path('<int:pk>/', views.user_student_courses),
]

