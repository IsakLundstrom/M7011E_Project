from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/courses/(?P<pk>[^/.]+)/$", consumers.CourseConsumer.as_asgi()),
]