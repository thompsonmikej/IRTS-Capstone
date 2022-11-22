from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_user_courses),
    path('<int:pk>/', views.get_all_user_courses),
    path('api/users/ready/', views.get_all_user_courses),
    path('api/grades/current/', views.get_all_user_courses),
    path('api/courses/', views.get_all_user_courses),
    path('api/grades/all/', views.change_grade_or_course),
    path('api/grades/new/', views.user_grades),
    path('api/grades/', views.change_grade_or_course)
   
]

