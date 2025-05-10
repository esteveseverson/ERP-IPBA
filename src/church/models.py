from cloudinary.models import CloudinaryField
from django.db import models

import helpers

helpers.cloudinary_init()


# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=255)
    brief_history = models.TextField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Church(models.Model):
    name = models.CharField(max_length=120)
    street = models.CharField(max_length=120)
    number = models.CharField(max_length=120)
    neighborhood = models.CharField(max_length=120)
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lon = models.DecimalField(max_digits=11, decimal_places=8)
    foundation_date = models.DateField()
    brief_history = models.TextField()
    image = CloudinaryField('image')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
