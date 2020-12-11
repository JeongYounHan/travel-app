from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from api import views
from django.urls import path, include

router = DefaultRouter(trailing_slash=False)
router.register(r"cities", views.CityViewSet, basename="cities")
router.register(r"places", views.PlaceViewSet, basename="places")
router.register(r"trips", views.TripViewSet, basename="trips")
router.register(r"schedules", views.ScheduleViewSet, basename="schedules")

urlpatterns = [
    path('', include(router.urls)),
]
