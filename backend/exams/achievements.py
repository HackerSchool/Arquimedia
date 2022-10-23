import logging

from users.models import Achievement as AchievementModel, Profile


class Achievement:
    """
    Achievement class that applies a certain achievement to a profile.
    The check method should be overwritten to check if the profile has what it takes to get the achievement.

    """

    def __init__(self, id: int):
        self.id = id
        self.achievement = AchievementModel.objects.get(id=id)

    def __str__(self):
        return self.achievement.title

    def apply(self, profile: Profile) -> bool:
        """
        Apply the achievement to the profile. Returns True if the achievement was applied.
        """
        if self.achievement not in profile.achievements.all() and self.check(profile):
            profile.achievements.add(self.achievement)
            profile.save()

            return True

        return False

    def check(self, profile: Profile) -> bool:
        """
        Check if the the profile has what it takes to get the achievement.
        """
        pass


class AchievementPool:
    """
    Has an array of achievements and applies them to a given population.
    """
    def __init__(self, population: list[Profile], achievements: list[Achievement]):
        self.achievements = achievements
        self.population = population
        self.applied = 0

    def apply(self):
        for achievement in self.achievements:
            logging.info(f"Applying achievement {achievement}")
            for profile in self.population:
                if achievement.apply(profile): self.applied += 1

        logging.info(f"Applied {self.applied} achievements")


class ExamsCompletedAchievement(Achievement):
    """
    Achievements related to the number of exams completed on a subject.
    id: The ID of the achievement.
    subject: The subject to check.
    number: The number of exams to achieve.
    """

    def __init__(self, id: int, subject: str, number: int):
        super().__init__(id)
        self.subject = subject
        self.number = number

    def check(self, profile: Profile) -> bool:
        try:
            subject_info = profile.subjects.get(subject=self.subject)

            return subject_info.examCounter >= self.number
        except:
            print("Could not apply achievement to " + profile.user.username)

            return False