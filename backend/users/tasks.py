from celery import shared_task
from .models import Profile
from datetime import datetime

@shared_task
def reset_streaks():
	profiles = Profile.objects.all()

	today = datetime.now()
	for profile in profiles:
		# Reset streak if user asn't gained XP for more than 1 day
		if not(profile.last_activity.year == today.year and profile.last_activity.month == today.month and profile.last_activity.day >= today.day - 1):
			profile.streak = 0
			profile.save()
