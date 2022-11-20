import pytest

from exams.achievements import (
    Achievement,
    AchievementPool,
    ExamsCompletedAchievement,
    QuestionsAnsweredCorrectlyAchievement,
)


@pytest.mark.django_db
def test_apply_achievement(achievement, profile, mocker):
    """Test that the apply method works correctly.
    The method should return True if the achievement was applied and
    the user has the achievement in his achievements list.

    The `Achievement.check` method is mocked to return True.
    """
    mocker.patch("exams.achievements.Achievement.check", return_value=True)
    a = Achievement(achievement.id)

    assert a.apply(profile) is True
    assert profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
def test_apply_achievement_fails(achievement, profile, mocker):
    """Test that the apply works correctly.
    The method should return False if the achievement was not applied and
    the user does not have the achievement in his achievements list.

    The `Achievement.check` method is mocked to return False.
    """
    mocker.patch("exams.achievements.Achievement.check", return_value=False)
    a = Achievement(achievement.id)

    assert a.apply(profile) is False
    assert not profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
@pytest.mark.parametrize("achievements", [(3)], indirect=True)
def test_achievements_pool_run(achievements, profiles, mocker):
    """Tests if an achievements pool applies achievements to all profiles."""
    mocker.patch("exams.achievements.Achievement.check", return_value=True)
    pool = AchievementPool(profiles, [Achievement(a.id) for a in achievements])
    pool.apply()

    for profile in profiles:
        for achievement in achievements:
            assert profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
def test_number_exams_achievement_eligible(profile, achievement):
    """Test that the number of exams achievement applies achievement on eligible profile."""
    subject = profile.subjects.get(subject="Matemática")
    subject.examCounter = 10
    subject.save()

    a = ExamsCompletedAchievement(achievement.id, "Matemática", 10)

    assert a.apply(profile) is True
    assert profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
def test_number_exams_achievement_not_eligible(profile, achievement):
    """Test that the number of exams achievement doesn't apply achievement on not eligible profile."""
    subject = profile.subjects.get(subject="Matemática")
    subject.examCounter = 9
    subject.save()

    a = ExamsCompletedAchievement(achievement.id, "Matemática", 10)

    assert a.apply(profile) is False
    assert not profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
@pytest.mark.parametrize("answer_infos", [(10)], indirect=True)
def test_number_of_correct_questions_achievement_eligible(
    profile, answer_infos, achievement
):
    """Test that the number of correct answers achievement applies achievement on eligible profile."""
    subject = profile.subjects.get(subject="Matemática")
    subject.correct_answers.set(answer_infos)
    subject.save()

    a = QuestionsAnsweredCorrectlyAchievement(achievement.id, "Matemática", 10)

    assert a.apply(profile) is True
    assert profile.achievements.filter(title=achievement.title).exists()


@pytest.mark.django_db
@pytest.mark.parametrize("answer_infos", [(9)], indirect=True)
def test_number_of_correct_questions_achievement_not_eligible(
    profile, answer_infos, achievement
):
    """Test that the number of correct answers achievement doesn't apply achievement on not eligible profile."""
    subject = profile.subjects.get(subject="Matemática")
    subject.correct_answers.set(answer_infos)
    subject.save()

    a = QuestionsAnsweredCorrectlyAchievement(achievement.id, "Matemática", 10)

    assert a.apply(profile) is False
    assert not profile.achievements.filter(title=achievement.title).exists()