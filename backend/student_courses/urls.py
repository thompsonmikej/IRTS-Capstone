from django.urls import path, include
from . import views

urlpatterns = [
    path('user_courses/', views.get_user_studentcourses),
    path('register_new_course/', views.create_studentcourses),

    # path('ungraded_courses/', views.get_ungraded_studentcourses),


#Users
    path('all/', views.student_users),
    path('<user>/', views.get_transcript), #Transcript of All Courses
    path('ungraded/<user>/', views.get_ungraded_studentcourses), #Ungraded Courses/ Current
    
# Grades below

    path('get/', views.get_grades),
    path('change/', views.change_grades),
    path('ungraded/', views.get_ungraded_studentcourses),
#  path('grades/new/', views.
    
    path('grades/delete/<int:grade_received>', views.delete_grades),

# Courses
    # path('courses/grade/<str:grade_received>/', views.get_grades),
    

    path('courses/change/', views.change_studentcourses),
    path('courses/delete/', views.delete_studentcourses),
]

