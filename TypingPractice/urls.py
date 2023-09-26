from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    #API
    path('words/<int:min>/<int:max>',views.fetchWords, name='fetchWords')
]

