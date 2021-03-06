from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from todo.api import views

urlpatterns = [
    path('kanbans/', views.kanban_view),
    path('todos/', views.todo_view),
    path('register/', views.register_user),
    path('obtain_token/', obtain_auth_token),
    path('dummy/', views.dummy_view)
]