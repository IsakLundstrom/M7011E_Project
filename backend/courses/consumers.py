import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class CourseConsumer(WebsocketConsumer):
    def connect(self):
        self.courseID = self.scope["url_route"]["kwargs"]["pk"]

        async_to_sync(self.channel_layer.group_add)(
            self.courseID,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.courseID,
            self.channel_name
        )

    def likeRatioMessage(self, event, type='likeRatioMessage'):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message
        }))
