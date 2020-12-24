from rest_framework import serializers 
from todo import models

class KanbanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Kanban
        fields = ("id", "name")

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = ("id", "name", "kanban")
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', "password")

    # re-def because it saves password as plain text, will cause problems
    def create(self, validated_data):
        user = models.User(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user