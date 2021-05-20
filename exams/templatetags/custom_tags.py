from django import template
import random
register = template.Library()

@register.filter(name='shuffle')
def filter_shuffle(seq):
    try:
        result = list(seq)
        random.shuffle(result)
        return result
    except:
        return seq
   