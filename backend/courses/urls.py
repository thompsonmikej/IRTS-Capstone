from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_courses),
    path('get_available_courses/', views.get_available_courses),   
    path('create/', views.create_courses),
    path('find/', views.find_courses),
   
]