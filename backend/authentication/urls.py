from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView
from . import views


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    # path('grades/gpa/', views.get_gpa),
    path('grads/', views.grad_ready_users),
    path('enrolled/', views.student_users),
    path('sum_credits_earned/<int:user_id>/', views.sum_credits_earned), #stores credits accumulated
    path('post_gpa/<int:user_id>/', views.gpa_earned), #stores GPA to DB
    path('post_semester/<int:user_id>/', views.current_semester), #stores semester to DB
    path('post_grad_status/<int:user_id>/', views.grad_status), #stores semester to DB

]
