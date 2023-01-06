from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_courses),
    path('courses_available/', views.get_courses_available),   
    path('post_create_courses/', views.post_create_courses),
    path('delete_courses/<int:pk>/', views.employee_deletes_courses),
    path("get_course_credits/<int:id>/", views.get_course_credits)  
]

