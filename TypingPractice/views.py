from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.http import HttpResponse
from django.http import JsonResponse

from json import dumps
import random
import os


amountOfWords = 10

def index(request):
    

    return render(request, "TypingPractice/index.html")


def fetchWords(request,min,max):

    listOfWords = []
    

    i = 0

    while i < amountOfWords:
        random_file = chooseRandomFile()

        with open(f'TypingPractice/Dictionary/{random_file}', 'r') as f:
            lines = f.readlines()
            word = random.choice(lines).strip()
            if len(word) > min and len(word) < max and word not in listOfWords and ' ' not in word:
                print(f"Randomly chosen file: {random_file}, Randomly Choosen word: {word}")
                listOfWords.append(word)
                i += 1
        

    return JsonResponse({
        'words': listOfWords
    })
        
    

def chooseRandomFile():
    file_list = os.listdir('TypingPractice\Dictionary')
    # Filter out only files (not directories)
    file_list = [file for file in file_list if os.path.isfile(os.path.join('TypingPractice\Dictionary', file))]

    if file_list:
        # Choose a random file from the list
        random_file = random.choice(file_list)
        return random_file
    else:
        print("No files found in the directory.")
        return None