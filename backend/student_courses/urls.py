from django.urls import path, include
from . import views

urlpatterns = [
#Users
    path('all/', views.student_users),
    

# Credits
   path('credits/get/<year_semester>/', views.get_semester_credits),
   path('credits/get/all', views.get_user_credits),

# Grades below
    path('grades/get/', views.get_grades),
    path('grades/change/<int:grade_received>', views.change_grades),
#  path('grades/new/', views.
    
    path('grades/delete/<int:grade_received>', views.delete_grades),

# Courses
    # path('courses/grade/<str:grade_received>/', views.get_grades),
    path('courses/all', views.get_all_courses),
    path('courses/new', views.create_courses),
    path('courses/change/', views.change_courses),
    path('courses/delete/', views.delete_courses),
]

