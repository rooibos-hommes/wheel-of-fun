# wheel-of-fun
Not sure how to spend your free time? Spin and let fate choose your fun! 🔮 
Wheel of Fun - README

Overview

The Wheel of Fun is a React-based interactive web application that allows users to enter their hobbies, spin a wheel, and randomly select an activity to do. The app automatically assigns an emoji to each hobby using an external emoji API. Additionally, users can save and load their hobby lists, manually override assigned emojis, and interact with an emoji picker if an appropriate emoji isn't found.


INSTALL AND RUN 
make sure ypu have node and npm installed 
1️⃣ Install Node.js and npm
Ensure you have Node.js installed (which includes npm):

Check if installed:
node -v
npm -v
If not installed, download it from Node.js official website.
2️⃣ Set Up Your React Project
Since the code is in React, you'll need a React environment.

Open VS Code and navigate to your project folder.
cd path/to/your/project
(id clones, MAKE SURE YOU change directory with terminal command: cd wheel-of-fun found inside of )


Initialize a React App (if needed):
npx create-react-app wheel-of-fun
cd wheel-of-fun



Emoji Selection Process

Originally, I thought AI/ML would be needed to match hobbies with their best-suited emoji. However, a simple API request does the job efficiently. The app queries an emoji API with the user's hobby input and retrieves the most relevant emoji.

Setting Up the API Key

To use the emoji API, you'll need an API key.

Visit: Emoji API to get an API key.

Open the App.js file.

Locate this line:

const response = await axios.get(`https://emoji-api.com/emojis?search=${hobby}&access_key=your_api_key`);

Replace your_api_key with your actual API key.

Key Features

Automatic Emoji Selection: Hobbies are assigned emojis via an API call.

Manual Emoji Override: Users can override the automatically assigned emoji if they don’t like the one provided.

Emoji Picker: If no emoji is found, an emoji selector pops up.

Spin the Wheel: Randomly selects a hobby from the user’s list.

Save & Load Settings: Users can save their hobby list to a file and reload it later.

Dark Mode (WIP): The app is styled for dark mode, but future improvements are planned to enhance it.

Known Bug 🐞

There is a bug where if a hobby doesn't return an emoji via the API, and the user selects an emoji manually from the picker, the app might still display a red question mark (❓) instead of the correct emoji until the override button is clicked. This issue will be addressed in a future update.

Future Improvements

Fixing the Emoji Selection Bug.

Enhancing Dark Mode Styling.

Optimizing Performance for Large Hobby Lists.

Enjoy spinning your Wheel of Fun! 🎡
