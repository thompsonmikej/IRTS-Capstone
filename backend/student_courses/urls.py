from django.urls import path, include
from . import views

urlpatterns = [
#Users
    path('all/', views.student_users),
    path('get/<user>', views.get_user_by_id),
    

# Grades below
    path('get/', views.get_grades),
    path('change/', views.change_grades),
#  path('grades/new/', views.
    
    path('grades/delete/<int:grade_received>', views.delete_grades),

# Courses
    # path('courses/grade/<str:grade_received>/', views.get_grades),
    path('courses/all', views.get_all_courses),
    path('courses/new', views.create_courses),
    path('courses/change/', views.change_courses),
    path('courses/delete/', views.delete_courses),
]

