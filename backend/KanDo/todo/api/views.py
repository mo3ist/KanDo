from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from todo.api import serializers
from todo import models

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def list_kanban(request):
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

@api_view(["POST"])
def register_user(request):
    if request.method == "POST":
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def dummy_view(request):
    data = {"hello", "world"}
    return Response(data, status=status.HTTP_200_OK)