import random
# Guess the number

i = 0
answear = random.randint(1, 10)
x = True

while x:
    player_guess = int(input("Podaj swoją liczbę: "))
    i += 1
    if player_guess == answear:
        print(f"Brawo! Zgadłeś za {i} razem!")
        x = False
    elif player_guess > answear:
        print("Za wysoko...")
    else:
        print("Za nisko")
