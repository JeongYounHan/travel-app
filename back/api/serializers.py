from .models import City, Place, Trip, Schedule
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.CharField()
    profile_img = serializers.URLField()
    

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "id",
            "name",
            "country",
            "continent",
            "image",
        ]


class PlaceSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    city = serializers.CharField()
    class Meta:
        model = Place
        fields = [
            "id",
            "city",
            "name",
            "div",
            "lat",
            "lng",
            "description",
            "time",
            "price",
            "image",
        ]

    def create(self, validated_data):
        city = validated_data.pop('city')
        city_instance, created = City.objects.get_or_create(name=city)
        place_instance = Place.objects.create(**validated_data, city=city_instance)
        return place_instance


class TripSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Trip
        fields = [
            "id",
            "user",
            "city",
            "name",
            "date_from",
            "date_to",
        ]


class ScheduleSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only=True)
    trip = TripSerializer(read_only=True)
    class Meta:
        model = Schedule
        fields = [
            "id",
            "trip",
            "place",
            "day",
            "order",
            "memo",
        ]