from django.urls import path, include
from . import views

urlpatterns = [
    path('register_new_course/', views.create_studentcourses), #adds course to schedule


#Users
    path('transcript/', views.get_transcript), #Transcript of All Courses
    path('scheduled/<user>/', views.get_scheduled_studentcourses), #Ungraded Courses/ Current
    
# Grades below

    path('get/', views.get_grades),
    path('grade_change/', views.change_grades),
    path('scheduled/', views.get_scheduled_studentcourses), #gets courses without grades, presumably in current schedule
#  path('grades/new/', views.
    
    path('grades/delete/<int:grade_received>', views.delete_grades),

# Courses
    path('courses/change/', views.change_studentcourses),
    path('courses/delete/', views.delete_studentcourses),
]

