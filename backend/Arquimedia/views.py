from django.shortcuts import redirect, render
from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView
from allauth.account.models import EmailAddress
from rest_framework.response import Response
from rest_framework import status
from api.serializer import UserSerializer

class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data,
                                              context={'request': request})
        self.serializer.is_valid(raise_exception=True)

        # Only login the user if he verified his email
        email = EmailAddress.objects.get(user=self.serializer.validated_data['user'])
        if not email.verified:
            return Response({'detail': 'e-mail not confirmed'}, status=status.HTTP_400_BAD_REQUEST)

        self.login()
        return self.get_response()

# Rest-auth authenticates the user after he registers, we don't want that
class CustomRegisterView(RegisterView):
    def get_response_data(self, user):
        return UserSerializer(user).data
