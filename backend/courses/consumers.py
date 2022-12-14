import json

from channels.generic.websocket import WebsocketConsumer


class CourseConsumer(WebsocketConsumer):
    def connect(self):
        print("Connect")
        self.accept()

    def disconnect(self, close_code):
        print("Discoenenfjn")
        pass

    def receive(self, text_data):
        print("REcivea")
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        self.send(text_data=json.dumps({"message": message}))
