from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token

from todo.api import serializers
from todo import models

@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def kanban_view(request):
    if request.method == "GET":
        all_kanbans = models.Kanban.objects.filter(user__id=request.user.id)         
        serializer = serializers.KanbanSerializer(all_kanbans, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = serializers.KanbanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        data = request.data
        kanban = models.Kanban.objects.get(id=data["prevKanban"]["id"])
        serializer = serializers.KanbanSerializer(kanban, data=data["kanban"])
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        kanban_id = request.data["kanban"]
        try:
            kanban = models.Kanban.objects.get(id=kanban_id)
            kanban.delete()
            return Response({"id": kanban_id}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Kanban Doesn't Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def todo_view(request):
    if request.method == "GET":
        kanban_id = request.GET.get("kanban")
        all_todos = models.Todo.objects.filter(kanban__id=kanban_id)         
        serializer = serializers.TodoSerializer(all_todos, many=True)
        return Response({"kanban": kanban_id, "data": serializer.data})

    elif request.method == "POST":
        serializer = serializers.TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"kanban": serializer.data["kanban"], "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "PUT":
        data = request.data
        todo = models.Todo.objects.get(id=data["prevTask"]["id"])
        serializer = serializers.TodoSerializer(todo, data=data["task"])
        if serializer.is_valid():
            serializer.save()
            return Response({"prevTask": data["prevTask"], "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        todo_id = request.data["todo"]
        try:
            todo = models.Todo.objects.get(id=todo_id)
            kanban_id = todo.kanban.id
            todo.delete()
            return Response({"kanban": kanban_id, "data": {"id": todo_id}}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Todo Doesn't Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def register_user(request):
    if request.method == "POST":
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def dummy_view(request):
    data = {"hello", "world"}
    return Response(data, status=status.HTTP_200_OK)