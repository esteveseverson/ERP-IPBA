from django.urls import path

from .views import church_page, create_church

urlpatterns = [
    path('', church_page, name='church_page'),
    path('/create', create_church, name='create_church'),
]