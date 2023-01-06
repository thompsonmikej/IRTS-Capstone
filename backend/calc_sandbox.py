

# 





from random import randrange

def display_welcome():
    print('\nThis is Player Pairs!\nIn this game, each player receives 5 cards.\nOnce each hand has been dealt, we will see which hand has the most pairs!\n')

def create_decks(number_of_decks):
    cards = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
    deck_or_decks = []
    for card in cards:
        for i in range(4 * number_of_decks):
            deck_or_decks.append(card)
    return deck_or_decks

def shuffle_deck(deck_or_decks):
    shuffled_deck = list(deck_or_decks) # avoiding reference data type behavior for the shuffled deck to original deck
    for index in range(len(shuffled_deck)):
        new_card_index_location = randrange(0, (len(shuffled_deck) - 1))
        card_at_first_position = shuffled_deck[index]
        card_at_second_position = shuffled_deck[new_card_index_location]
        shuffled_deck[index] = card_at_second_position
        shuffled_deck[new_card_index_location] = card_at_first_position
    return shuffled_deck

def deal_hand(deck, cards_per_hand):
    new_hand = []
    for i in range(cards_per_hand):
        dealt_card = deck.pop(0)
        new_hand.append(dealt_card)
    return new_hand

def get_highest_pair_count(hand):
    card_counts = {}
    for card in hand:
        if card in card_counts:
            card_counts[card] += 1
        else:
            card_counts[card] = 1
    card_counts = dict(sorted(card_counts.items(), key=lambda item: item[1]))
    return list(card_counts.values())[-1]

def display_round_results(player_results):
    for player in player_results:
        print(
            f'Player {player["player_number"]}, Number of Pairs: {player["number_of_pairs"]}\nHand: {player["hand"]}\n')

def display_and_determine_winner_or_tie(player_results):
    highest_pair_value = max([player_result['number_of_pairs'] for player_result in player_results])
    top_hand_players = []
    for player_result in player_results:
        if player_result['number_of_pairs'] == highest_pair_value:
            top_hand_players.append(player_result)

    if len(top_hand_players) == 1:
        print(f'Player {top_hand_players[0]["player_number"]} wins!\n')
    else:
        print(f'There was a tie among players {[top_player["player_number"] for top_player in top_hand_players]}.\n')

def run_game(number_of_players, number_of_cards, number_of_rounds):
    display_welcome()
    deck = create_decks(1)  
    shuffled_deck = shuffle_deck(deck)
    player_hands = [deal_hand(shuffled_deck, number_of_cards) for i in range(number_of_players)]
    final_players_results = [{'player_number': i + 1, 'hand': player_hands[i], 'number_of_pairs': get_highest_pair_count(player_hands[i])} for i in range(len(player_hands))]
    display_round_results(final_players_results)
    display_and_determine_winner_or_tie(final_players_results)

run_game(4, 5, 3)

===
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_courses_available(request, user_id):
    """api/courses/courses_available/
    """ 
    course_list=[]
    graded_courses = StudentCourse.objects.filter(user_id=user_id)
    for single_course in graded_courses:
         if (single_course.grade_received > 2):
             course_list.append(single_course) 
    
    all_courses = Course.objects.all()
    for each_course in all_courses:
        # course_list.append(each_course) 
    # print('Result_list 2: ', course_list)

    # course_list.id=course_list.course.id

    # for this_course in course_list:
        if each_course in all_courses:
            # course_list[each_course] += 1 #adds one if already there (not want to append)
            course_list[each_course] = ""#adds one if already there (not want to append)
        else:
            course_list[each_course]
            # course_list[each_course] = 1
            course_list.append(each_course) #adds one (want to append onto)
        print(course_list) 
    # course_list = dict(sorted(course_list.items(), key=lambda item: item[1]))

    
    custom_course_dictionary = {

        # "graded_courses": StudentCourseSerializer(graded_courses, many=True).data,
        # "all_courses": CourseSerializer(all_courses, many=True).data,
        # "available": CourseSerializer(available, many=True).data,
        "result_list": StudentCourseSerializer(course_list, many=True).data, 
	}
    return Response(custom_course_dictionary)


===



# def func():
#     results_list ={'1','1','5','2','3','6','5','9','8','4','0','5','7','6'}
#     print(results_list)
    
#     # results_list.annotate(result=count('1')).filter(count=1).values('result').distinct()

#     result= results_list.count('5')
#     # result = results_list.map(results_list).filter('1').distinct()
#     # results_list.map(result)

# # def get_highest_pair_count(hand):
# #     card_counts = {}
#     for result in results_list:
#         if result in card_counts:
#             card_counts[result] += 1
#         else:
#             card_counts[result] = 1
#     card_counts = dict(sorted(card_counts.items(), key=lambda item: item[1]))
#     return list(card_counts.values())[-1]


#     print(result)

# # MyModel.objects.annotate(
# #     month=TruncMonth('date')
# # ).filter(month=YOURVALUE).values('month').distinct()

#     # count course_id >=2
#     # results_list.map(count('results_list'), 1)
#     # exclude these course_ids
    
#     # count.map(count('results_list'), 1)
# func()




# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_graded_courses(request):
# #     """api/student_courses/get_graded_courses/
# #     """
# #     graded_courses = StudentCourse.objects.filter(id=id)
# #     serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             passing_courses.append(single_course)
        
# #     all_courses = Course.objects.all()
# #     serializer = CourseSerializer(all_courses, many=True)
# #     course_catalog = []
# #     for each_course in all_courses:
# #         course_catalog.append(each_course)
        
# #     available_courses = []
# #     # serializer = CourseSerializer(all_courses, many=True)
# #     # course_catalog = []
# #     for this_course in all_courses:
# #         available_courses.exclude(single_course)

# #     custom_course_dictionary = {
# # 		"passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
# # 		"course_catalog": CourseSerializer(all_courses, many=True).data,
# #         "available_courses": CourseSerializer(available_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_courses_available(request, id):
# #     """api/courses/courses_available/
# #     """ 
# #     graded_courses = StudentCourse.objects.filter(id=id)
# #     serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             passing_courses.append(single_course)
        
# #     all_courses = Course.objects.all()
# #     serializer = CourseSerializer(all_courses, many=True)
# #     all_courses.concat(passing_courses)
# #     all_courses = list(dict.fromkeys(all_courses))
# #     print(all_courses)


# # #   available = all_courses.values(
# #     #     'course_id'
# #     # ).annotate(
# #     #     course_id_count=Count('course_id')
# #     # ).filter(course_id_count=1)
# #     # records = all_courses.values(course_id__in=[item['course_id'] for item in distinct])


# # # distinct = User.objects.values(
# # #     'first_name'
# # # ).annotate(
# # #     name_count=Count('first_name')
# # # ).filter(name_count=1)
# # # records = User.objects.filter(first_name__in=[item['first_name'] for item in distinct])



# #     # course_catalog = []
# #     # for each_course in all_courses:
# #     # #     course_catalog.append(each_course)
        
# #     # available_courses = []
# #     # # serializer = CourseSerializer(all_courses, many=True)
# #     # # course_catalog = []
# #     # for this_course in all_courses:
# #     #     available_courses.exclude(single_course)


# #     custom_course_dictionary = {
# # 		"passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
# # 		"course_catalog": CourseSerializer(all_courses, many=True).data,
# #         "available_courses": CourseSerializer(available_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)






# # @api_view(['GET'])
# # @permission_classes([AllowAny])
# # def get_all_courses(request):
# #     """api/courses/all
# #     """
# #     all_courses = Course.objects.all()
    
# #     all_courses = StudentCourse.objects.all(user=request.user)
# #     # get_transcript
# #     serializer = CourseSerializer(all_courses, many=True)

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_graded_courses(request):
# #     """api/student_courses/get_graded_courses/
# #     """
# #     all_courses = Course.objects.all()
# #     console.log('all_courses', all_courses)

# #     course_serializer = CourseSerializer(all_courses, many=True)
# #     console.log('course_serializer', course_serializer)
  
# #     graded_courses = StudentCourse.objects.filter(user=request.user)
# #     graded_course_serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     # failing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             passing_courses.append(single_course)
# #         # else:
# #         #     failing_courses.append(single_course)


# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_courses_available_(request):
# #     """get_courses_available_
# #     """ 
# #     all_courses = Course.objects.all()
# #     course_serializer = CourseSerializer(all_courses, many=True)
# #     console.log('course_serializer', course_serializer)
# #     console.log('all_courses', all_courses)
  
# #     graded_courses = StudentCourse.objects.filter(user=request.user)
# #     graded_course_serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     # failing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             all_courses.exclude(single_course)  #remove courses passed
# #             console.log('all_courses', all_courses)
# #         # else:
# #         #     failing_courses.append(single_course)
    
# #     custom_course_dictionary = {
# #         "all_courses": CourseSerializer(all_courses, many=True).data,
# # 		# "passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
# # 		# "failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)


# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_graded_courses(request):
# #     """api/student_courses/get_graded_courses/
# #     """
# #     graded_courses = StudentCourse.objects.filter(user=request.user)
# #     serializer = StudentCourseSerializer(graded_courses, many=True)
# #     taken_courses = []
# #     failing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             taken_courses.append(single_course)

# #     all_courses = Course.objects.all()
# #     serializer = CourseSerializer(all_courses, many=True)
# #     for each_course in all_courses:
# #         all_courses.exclude(taken_courses)
        
# #     custom_course_dictionary = {
# # 		"graded_courses": StudentCourseSerializer(taken_courses, many=True).data,
# # 		"all_courses": CourseSerializer(all_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)




# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_graded_courses(request):
# #     """api/student_courses/get_graded_courses/
# #     """
# #     graded_courses = StudentCourse.objects.filter(user=request.user)
# #     serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     failing_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             passing_courses.append(single_course)
# #         else:
# #             failing_courses.append(single_course)
        
# #     custom_course_dictionary = {
# # 		"passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
# # 		"failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)





# #     graded_course_serializer = StudentCourseSerializer(student_transcript, many=True)
# #     return Response(graded_course_serializer.data)








# # # def get_graded_courses(request):
# # #     """api/student_courses/get_graded_courses/
# # #     """
# # #     # graded_courses = StudentCourse.objects.filter(user=request.user)
# # #     # print(graded_courses)
# # courses=[0,1,2,3,4,5]
# # print('course list', courses)
# # passing_courses = []
# # failing_courses = []
# # for single_course in courses:
# #     if (single_course > 3):
# #         passing_courses.append(single_course)
# #         # print(passing_courses)
# #         # return(passing_courses)        
# #     else:
# #         failing_courses.append(single_course)
# #         # print(failing_courses)
# #         # return(failing_courses)
    
# # print('Passing courses', passing_courses)
# # print('Failing courses', failing_courses)
    
# # # custom_course_dictionary = {
# # # 	# "passing_courses":  StudentCourseSerializer(passing_courses, many=True).data,
# # # 	# "failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
# # # 	"passing_courses": (passing_courses).data,
# # # 	"failing_courses": (failing_courses).data,
# # # }
# # # # return Response(custom_course_dictionary)
# # # print(custom_course_dictionary)


# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_courses_available(request, id):
# #     """api/courses/courses_available/
# #     """
# #     graded_courses = StudentCourse.objects.filter(id=id)
# #     serializer = StudentCourseSerializer(graded_courses, many=True)
# #     passing_courses = []
# #     all_courses = []
# #     for single_course in graded_courses:
# #         if (single_course.grade_received > 2):
# #             passing_courses.append(single_course)

# #     all_courses = Course.objects.all()
# #     serializer = CourseSerializer(all_courses, many=True)
# #     for each_course in all_courses:
# #         all_courses.exclude(single_course)
        
# #     custom_course_dictionary = {
# # 		"graded_courses": StudentCourseSerializer(passing_courses, many=True).data,
# # 		"all_courses": CourseSerializer(all_courses, many=True).data,
# # 	}
# #     return Response(custom_course_dictionary)

# # def put_individual_graduation_eligibility(gpa, id,credits_earned):
# #     gpa=gpa
# #     id=id
# #     credits_earned
# #     # student_gpa = User.objects.filter(id=id).get(gpa=gpa)
# #     # serializer = PersonObjectSerializer(student_gpa, many=False)
# #     # # return Response(serializer.data)  
# #     # grad_ready = get_object_or_404(User, credits_earned=credits_earned)
# #     # # credits_accrued = get_object_or_404(User, pk=course_id)
# #     # grad_ready.credits_earned=request.data['credits_earned']
# #     # print('credits_accrued', grad_ready)
# #     # print('student_gpa', student_gpa )
# #     grad_ready= 0

# #     if (credits_earned >= 128 and gpa >= 3):
# #             grad_ready = 4
# #             print('student_gpa', gpa)
# #             print('credits_earned', credits_earned)
# #             print('if TRUE (4) credits_accrued.credits_earned; grad_ready', grad_ready)
# #             return grad_ready
# #         # else:
# #         #     print('student_gpa', gpa)
# #         #     print('credits_earned', credits_earned)
# #         #     print('if ELSE (0) credits_accrued.credits_earned; not grad_ready', grad_ready)
# #         #     return grad_ready
# #     else:
# #         print('student_gpa', gpa)
# #         print('not enough credits_earned', credits_earned)
# #         print('if ELSE (0) credits_accrued.credits_earned; not grad_ready', grad_ready)
# #         return grad_ready
# #     # try:
# #     #     grad_ready.save()
# #     #     # # serializer = PersonObjectSerializer(grad_ready)
# #     #     # return Response(serializer.data, status=status.HTTP_200_OK)
# #     # return grad_ready
# #     # except:
# #     #     return grad_ready
# #     #     # return Response(status=status.HTTP_400_BAD_REQUEST)

# # put_individual_graduation_eligibility(2.5, 5, 128)

# # # # ##
# # # @api_view(['PUT'])
# # # @permission_classes([IsAuthenticated])   
# # # def put_calculate_credits_earned(request, user_id):
# # #     credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
# # #     sum_of_credits = 0
# # #     for credit in credit_tally:
# # #         sum_of_credits += credit.credits_received
# # #     try:
# # #         sum_of_credits.save()
# # #         serializer = StudentCourseSerializer(sum_of_credits)
# # #         return Response(serializer.data, status=status.HTTP_200_OK)
# # #     except:
# # #         return Response(status=status.HTTP_400_BAD_REQUEST)

