def rename_image_question(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "question-{}.{}".format(instance.pk, ext)


def rename_image_group(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "group-{}.{}".format(instance.pk, ext)