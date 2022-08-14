import string

from server import configuration

'''  Blocks  '''
default_length = '{5,50}'
en_letters = string.ascii_letters
printable = string.printable
he_letters = 'א-ת'
digits = string.digits
basic_character = '!@#$%&*().,_"\' '
all_non_letters = '[0-9.,!?:;_|+\-*\\/=%°@&#§$"\'`¨^ˇ()\[\]<>{}]'

'''  Regular Expression   '''


class RegularExpression:
    en_regex = f'^[{en_letters + digits + basic_character}]{default_length}$'
    en_letters_only_regex = f'^[{en_letters}]{default_length}$'
    he_regex = f'^[{he_letters + digits + basic_character}]{default_length}$'
    he_letters_only_regex = f'^[{he_letters}]{default_length}$'

    title = f'^[{en_letters + "_"}]'+'{2,25}$'

    @classmethod
    def get_child_dict(cls):
        return {k: v for k, v in cls.__dict__.items() if not k.startswith('_')}
