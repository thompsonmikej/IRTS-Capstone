from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_user_courses),
    path('<int:pk>/', views.get_all_user_courses),
    # path('<int:pk>/', views.get_user_courses),
    # path('<int:pk>/', views.get_user_courses),
    # path('<int:pk>/', views.get_user_courses),
    # path('<int:pk>/', views.get_user_courses),
]

