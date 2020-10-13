
def number_parse(calculation):
    if '+' in calculation:
        numbers = calculation.split('+')
        result = int(numbers[0]) + int(numbers[1])
    elif '-' in calculation:
        numbers = calculation.split('-')
        result = int(numbers[0]) - int(numbers[1])
    elif 'x' in calculation:
        numbers = calculation.split('x')
        result = int(numbers[0]) * int(numbers[1])
    elif '/' in calculation:
        numbers = calculation.split('/')
        result = int(numbers[0]) / int(numbers[1])
    return result      