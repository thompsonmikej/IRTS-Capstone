from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_courses),
    path('courses_available/<int:semester>/', views.get_available_courses),   
    path('create_courses/', views.create_courses),
    path('delete_courses/<int:pk>/', views.employee_deletes_courses),
      
]