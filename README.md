# Gotta Fetch() 'Em All

Welcome to **Gotta Fetch() 'Em All**! This is a fun and interactive web application built with React and Node.js, leveraging the PokeAPI to bring the excitement of Pokémon battles right to your browser. In this app, you can battle Pokémon from different areas, collect new ones, and manage your team based on your victories and defeats.

## Overview

**Gotta Fetch() 'Em All** is a single-page application that allows users to:
- Select areas to encounter and battle Pokémon.
- Capture defeated Pokémon if you win the battle.
- Lose your current Pokémon if you lose the battle.

The app is designed with a frontend in React.

## Features

- **Area Selection**: Choose different areas to battle Pokémon with varying difficulty.
![Area selector](frontend/public/readme_screenshots/mainpage_screenshot.png)
- **Battling Mechanics**: Engage in battles and test your Pokémon's skills against random opponents.
![Battle](frontend/public/readme_screenshots/fight_screenshot.png)
- **Capture System**: Win battles to add defeated Pokémon to your collection.
- **Loss Consequence**: Lose battles to potentially lose your current Pokémon.
- **Pokédex Integration**: View Pokémon details and stats using the PokeAPI.
![Pokédex](frontend/public/readme_screenshots/enemy_selector_screenshot.png)

## Technologies Used

- **Frontend**: React
- **API**: PokeAPI (to fetch Pokémon data and battle mechanics)
- **State Management**: React hooks and context

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/gotta-fetch-them-all.git
   cd gotta-fetch-them-all
   ```

2. **Install Dependencies**

   Navigate to both the `frontend` and `backend` directories and run:

   ```bash
   npm install
   ```

3. **Start the Application**

   ```bash
     cd frontend
     npm start
   ```

   The React app should now be running on `http://localhost:3000` (or another port if specified), and the Node.js server will handle any server-side logic.

## Usage

1. **Select an Area**: Use the area selection menu to choose a location for your Pokémon battle.

2. **Battle**: Engage in battles against Pokémon from the chosen area. The outcome depends on your Pokémon's stats and battle strategy.

3. **Capture or Lose**: Depending on the battle result:
    - **Win**: Add the defeated Pokémon to your collection.
    - **Lose**: Your current Pokémon is lost.

4. **View Your Collection**: Check your Pokémon collection to see the Pokémon you have captured.


## Running Tests

This project uses Jest and React Testing Library for unit testing.

1. **Install dependencies** (If you haven't already)

   ```bash
   npm install
   ```


2. **Run tests**
   ```bash
   npm test
   ```




## Contributors and contact

For any questions or feedback, please reach out to the project maintainer:

- [Tavirutyutyu](https://github.com/Tavirutyutyu)
- [Geonauta11](https://github.com/Geonauta11)
- [bothbartos](https://github.com/bothbartos)


Enjoy battling and collecting Pokémon in **Gotta Fetch() 'Em All**!

