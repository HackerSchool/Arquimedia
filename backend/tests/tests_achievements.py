import pytest

from exams.achievements import Achievement


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
