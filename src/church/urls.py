from django.urls import path

from .views import church_page, create_church, delete_church

urlpatterns = [
    path('', church_page, name='church_page'),
    path('create_church/', create_church, name='create_church'),
    path('delete_church/<int:id>/', delete_church, name='delete_church'),
]
