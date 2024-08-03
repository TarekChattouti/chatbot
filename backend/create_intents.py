import json

def get_input_list(prompt):
    data_list = []
    while True:
        user_input = input(prompt).strip()
        if user_input == "":
            break
        data_list.append(user_input)
    return data_list

def create_intents():
    intents = []

    while True:
        tag = input("Enter intent tag (or leave empty to finish): ").strip()
        if not tag:
            break
        
        print(f"Enter patterns for the intent '{tag}' (leave empty to finish):")
        patterns = get_input_list("Pattern: ")

        print(f"Enter responses for the intent '{tag}' (leave empty to finish):")
        responses = get_input_list("Response: ")

        intents.append({
            "tag": tag,
            "patterns": patterns,
            "responses": responses
        })

    return intents

def save_intents_to_json(intents, filename="intents.json"):
    with open(filename, "w") as f:
        json.dump({"intents": intents}, f, indent=2)
    print(f"Data saved to {filename}")

def main():
    print("Welcome to the Intent Creator!")
    intents = create_intents()
    if intents:
        save_intents_to_json(intents)
    else:
        print("No intents were created.")

if __name__ == "__main__":
    main()
