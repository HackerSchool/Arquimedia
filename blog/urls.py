from django.urls import path
from .views import ArticleDetailView, ArticleListView, article_create,article_detail_view, article_delete_view,article_list_view


app_name = 'blog'
urlpatterns=[
    path('<int:pk>/', ArticleDetailView.as_view(), name='detail_page'),
    path('new_article/', article_create, name='create_article'),
    path('<int:id>/delete_article/',article_delete_view,name='delete_article'),
    path('list/',ArticleListView.as_view(),name='article_list')]

"""     path('<int:id>/', article_detail_view, name='detail_page'),
    path('new_article/', article_create, name='create_article'),
    path('<int:id>/delete_article/',article_delete_view,name='delete_article'),
    path('list/',article_list_view,name='article_list')
 ]"""