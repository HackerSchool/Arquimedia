from django.urls import path
from .views import person_detail_view, person_create,render_initial_data, person_delete_view,person_list_view


app_name = 'person'
urlpatterns=[
    path('<int:id>/', person_detail_view, name='detail_page'),
    path('new_person/', render_initial_data, name='create_person'),
    path('<int:id>/delete_person/',person_delete_view,name='delete_person'),
    path('list/',person_list_view,name='person_list')
]