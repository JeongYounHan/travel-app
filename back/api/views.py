from django.shortcuts import render

# 모델
from accounts.models import User
from .models import City, Place, Trip, Schedule

# 시리얼라이저
from .serializers import UserSerializer, CitySerializer, PlaceSerializer, TripSerializer, ScheduleSerializer

# rest_framework
from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

# 필터
import django_filters.rest_framework
from rest_framework import filters

# 예외처리
from rest_framework.exceptions import NotAuthenticated, NotFound, ValidationError


# 페이지네이션
class SmallPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 80


class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

    # 키워드 검색
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name', 'country', 'continent'] 

    # 장르로 필터
    filterset_fields = ['country', 'continent']


class PlaceViewSet(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()


class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    pagination_class = SmallPagination
    queryset = Trip.objects.all()

    def list(self, request, *args, **kwargs):
        user = request.user
        serializer_class = TripSerializer
        if request.user.is_anonymous:
            raise NotAuthenticated("로그인 먼저 해주세요")
        else:
            trip = Trip.objects.filter(user=user)
            serializer = serializer_class(trip, many=True)
            return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = request.user
        serializer_class = TripSerializer

        if request.user.is_anonymous:
            raise NotAuthenticated("로그인 먼저 해주세요")
        else:
            city_name = request.data.get('city')
            city = City.objects.get(name=city_name)
            trip = Trip(user=user, city=city, name=request.data.get('name'), date_from=request.data.get('date_from'), date_to=request.data.get('date_to'))
            trip.save()
            serializer = serializer_class(trip, many=False)
            return Response(serializer.data)


class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()

    # 해당 trip의 전체리스트
    def list(self, request, *args, **kwargs):
        serializer_class = ScheduleSerializer
        queryset = Schedule.objects.all()
        user = request.user
        if request.user.is_anonymous:
            raise NotAuthenticated("로그인 먼저 해주세요")
        else:
            day = self.request.query_params.get('day', None)
            trip_name = self.request.query_params.get('trip')
            trip = Trip.objects.get(pk=trip_name)

            if day:
                schedule = Schedule.objects.filter(user=user, trip=trip, day=day)
            else:
                schedule = Schedule.objects.filter(user=user, trip=trip)
            serializer = serializer_class(schedule, many=True)
            return Response(serializer.data)

    def create(self, request):
        serializer_class = ScheduleSerializer
        queryset = Schedule.objects.all()
        user = request.user
        if request.user.is_anonymous:
            raise NotAuthenticated("로그인 먼저 해주세요")
        else:
            trip_name = request.data.get('trip')
            day = request.data.get('day')
            place_name=request.data.get('place')
            trip = Trip.objects.get(pk=trip_name)
            place = Place.objects.get(name=place_name)
            schedule = Schedule(user=user, trip=trip, day=day, place=place, order=request.data.get('order'), memo=request.data.get('memo'))
            schedule.save()
            serializer = serializer_class(schedule, many=False)
            return Response(serializer.data)


