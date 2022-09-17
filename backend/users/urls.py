from django.urls import re_path
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [
    re_path(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    re_path(r'^logout/$', auth_views.LogoutView.as_view() ,name='logout'),
    re_path(r'^signup/', signup, name="signup"),
    re_path(r'^perfil/', profileDashboard, name="perfil")
]
