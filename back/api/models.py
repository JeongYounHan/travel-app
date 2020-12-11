from django.db import models
from django.conf import settings

class City(models.Model):
    name = models.CharField(max_length=20, null=False)
    country = models.CharField(max_length=20, null=False)

    def __str__ (self): 
        return self.name

# 이 테이블에 비행기, 장소, 숙소 전부 들어감(구분이 div)
class Place(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=20, null=False)
    div = models.CharField(max_length=20, null=False)
    lat = models.FloatField(max_length=15, null=False)
    lng = models.FloatField(max_length=15, null=False)
    description = models.TextField()
    time = models.CharField(max_length=50, null=True)
    price = models.CharField(max_length=50, null=True)
    image = models.TextField()

    def __str__ (self): 
        return self.name


class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=20, null=True)
    date_from = models.DateField(null=False)
    date_to = models.DateField(null=False)
    bg_image = models.TextField()


    def __str__ (self): 
        return self.city


class Schedule(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=False)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    day = IntegerField(null=False)
    order = models.FloatField(max_length=15, null=False)
    memo = models.TextField()

    def __str__ (self): 
        return self.city


