from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.courses_list),  
    path('<int:pk>/', views.courses_detail),
]
