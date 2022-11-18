from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.users_list),  #first argument-- adds subfolders to the URL, second argument with "views" calls the method 
    path('<int:pk>/', views.users_detail),
]
