from django.urls import path, include
from . import views

urlpatterns = [
    path('user_courses/', views.get_user_studentcourses),
    path('register_new_course/', views.create_studentcourses),

    path('ungraded_courses/', views.get_ungraded_studentcourses),


#Users
    path('all/', views.student_users),
    path('<user>/', views.get_user_by_id),
    
# Grades below

    path('get/', views.get_grades),
    path('change/', views.change_grades),
#  path('grades/new/', views.
    
    path('grades/delete/<int:grade_received>', views.delete_grades),

# Courses
    # path('courses/grade/<str:grade_received>/', views.get_grades),
    path('courses/all', views.get_all_studentcourses),

    path('courses/change/', views.change_studentcourses),
    path('courses/delete/', views.delete_studentcourses),
]

