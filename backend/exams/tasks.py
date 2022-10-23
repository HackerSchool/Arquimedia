from celery import shared_task
from users.models import Profile
from .achievements import ExamsCompletedAchievement, AchievementPool

@shared_task
def exams_completed_achievement():
    profiles = Profile.objects.all()

    pool = AchievementPool(
        profiles,
        [
            ExamsCompletedAchievement(1, "Matemática", 10),
            ExamsCompletedAchievement(2, "Matemática", 50),
            ExamsCompletedAchievement(3, "Matemática", 100),
            ExamsCompletedAchievement(4, "Matemática", 200),
        ]
    )

    pool.apply()