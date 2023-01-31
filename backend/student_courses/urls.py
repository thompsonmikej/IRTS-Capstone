from django.urls import path, include
from . import views

urlpatterns = [
    path('post_student_into_courses/', views.post_student_into_courses), 
    path('admin_gets_studentcourses/<int:user_id>/', views.admin_gets_studentcourses), 
    path('get_transcript/', views.get_transcript), 
    path('get_scheduled_courses/', views.get_scheduled_courses),
    path('put_grade_course_object/<int:student_course_id>/', views.put_grade_course_object), 
    # path('get_graded_courses/', views.get_graded_courses),
    path('delete_courses/<int:pk>/', views.delete_courses),
    
     
]



