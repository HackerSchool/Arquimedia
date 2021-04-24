from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [
    url(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view() ,name='logout'),
    url(r'^signup/', signup, name="signup")
]
