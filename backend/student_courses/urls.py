from django.urls import path, include
from . import views

urlpatterns = [
    path('register_new_course/', views.create_studentcourses), #adds course to schedule
    path('transcript/', views.get_transcript), #Transcript of All the logged in student's Courses
    path('scheduled/', views.get_scheduled_studentcourses), #Ungraded Courses/ Current
    path('grade_change/<int:studentcourse_id>/', views.change_grades), #Give grade to existing course
    path('get_gpa/', views.get_gpa),

# Currently unused
    path('courses/change/', views.change_studentcourses),
    path('courses/delete/', views.delete_studentcourses),
    path('grades/delete/<int:grade_received>', views.delete_grades),
]

