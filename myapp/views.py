from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.serializers import serialize
from myapp.models import Test_portal
import json

RESULT_DB = {}
DB_ALL_QUESTIONS = Test_portal.objects.all()

for i in DB_ALL_QUESTIONS:
    RESULT_DB[i.id] = {
        "question_no": i.id,
        "question": i.question,
        "option1":i.option1,
        "option2":i.option2,
        "option3":i.option3,
        "option4":i.option4,
        "answer" :i.answer
    }

all_values = list(RESULT_DB.values())


data_received = {}

def main_page(request):
     global data_received
     if request.method == 'POST':
        data_received = json.loads(request.body.decode('utf-8'))
        print(data_received)

     return render(request, 'main_page.html', {"DB_ALL_QUESTIONS": DB_ALL_QUESTIONS})


def score_card(request):
    CORRECT_ANSWER = 0
    WRONG_ANSWER = 0
    REACTION = "FAIL"
    for db_len in range(1, len(all_values) + 1):
            if str(all_values[db_len - 1]['question_no']) in data_received and all_values[db_len - 1]['answer'] == data_received[str(all_values[db_len - 1]['question_no'])]:
                print(all_values[db_len - 1]['question'])
                print(all_values[db_len - 1]['answer'])
                CORRECT_ANSWER +=1
            else:
                WRONG_ANSWER +=1

    TOTAL_QUESTION = len(all_values)

    PERCENTAGE = CORRECT_ANSWER/len(all_values) * 100
    
    if PERCENTAGE >= 50:
        REACTION = "PASS"
    print(PERCENTAGE,WRONG_ANSWER,CORRECT_ANSWER)
    return render(request, 'score_card.html',{'TOTAL_QUESTION':TOTAL_QUESTION,
                                    'CORRECT_ANSWER': CORRECT_ANSWER,
                                    'WRONG_ANSWER':WRONG_ANSWER,
                                    'PERCENTAGE':PERCENTAGE,
                                    'REACTION':REACTION})

