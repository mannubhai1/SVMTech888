import requests
from bs4 import BeautifulSoup
import json

# URL of the page to scrape
url = "http://cs.sliet.ac.in/faculty-staff/"

# Send a GET request to the page
response = requests.get(url)

# Parse the page content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# List to store faculty data
faculty_data = []

# Find all divs with the 'list-item entry-user sl-user-entry' class
faculty_list = soup.find_all('div', class_='list-item entry-user sl-user-entry')

# Iterate over each faculty entry and extract details
for faculty in faculty_list:
    # Extract the image (Profile Photo URL)
    image_tag = faculty.find('img')
    image_url = image_tag['src'] if image_tag else 'No image'

    # Extract the name and profile URL
    name_tag = faculty.find('h4').find('a')
    name = name_tag.text.strip() if name_tag else 'No name'
    profile_url = name_tag['href'] if name_tag else 'No profile URL'

    # Extract the qualifications
    qualification_tag = faculty.find('span', class_='sl-user-info-meta-value')
    qualifications = qualification_tag.text.strip() if qualification_tag else 'No qualifications'

    # Extract the phone number (using safer string search)
    phone_tag = faculty.find('span', string=lambda t: t and 'Phone' in t)
    phone = phone_tag.find_next('span').text.strip() if phone_tag else 'No phone'

    # Extract the email (using safer string search)
    email_tag = faculty.find('span', string=lambda t: t and 'e-mail' in t)
    email = email_tag.find_next('span').text.strip() if email_tag else 'No email'

    # Append the extracted data to the faculty_data list as a dictionary
    faculty_data.append({
        'Name': name,
        'Profile URL': profile_url,
        'Image URL': image_url,
        'Qualifications': qualifications,
        'Phone': phone,
        'Email': email
    })

# Write the data to a JSON file
file_path = './public/faculty_data.json'
with open(file_path, 'w') as json_file:
    json.dump(faculty_data, json_file, indent=4)

print("Data successfully saved to faculty_data.json")
