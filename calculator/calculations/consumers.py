import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class CalculationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "home"
        self.room_group_name = "index"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        calc = text_data_json['calculation']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'calculation': calc
            }
        )

    def chat_message(self, event):
        calc = event['calculation']

        self.send(text_data=json.dumps({
            'calculation': calc
        }))
