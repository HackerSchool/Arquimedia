from django.test import TestCase
from .models import Profile
from django.contrib.auth.models import User
from django.db import models


class ProfileTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="JoeDoe")
        
    def test_user_profile_connection(self):
        # Checks if Profile was created when User

        Joe = User.objects.get(username="JoeDoe")

        self.assertIsInstance(Joe.profile, models.Model)
        self.assertEqual(Joe.profile.user.username, "JoeDoe", msg="Profile isn't being connected to User")

    def test_user_subjects(self):
        # Tests if user has 0 subjects at the time of creation

        Joe = User.objects.get(username="JoeDoe")

        self.assertEqual(Joe.profile.subjects.count(), 0, msg="Profile should have 0 subjects when created")
