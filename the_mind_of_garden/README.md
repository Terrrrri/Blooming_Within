# 🌹 Emotional Growth Game

## Overview
This React-based game focuses on emotional growth through interactive mini-games. Players nurture a flower representing their emotional well-being by progressing through different challenges. The game dynamically adjusts based on the player's responses and interactions.

## Features
- **Interactive Mini-Games**: Four different challenges focusing on anger regulation, resilience, anxiety management, and emotional connection.
- **Dynamic Flower Growth**: The player's progress is visualized as a blooming flower, reflecting emotional development.
- **Engaging Storyline**: A narrative-driven experience with dialogue interactions.
- **Multiple Game Stages**: Includes introduction, main menu, various mini-games, and an ending.
- **Audio & Visual Elements**: Includes background music, sound effects, and interactive visual elements.

## Game Flow
1. **Game Introduction (`GameIntro`)**: Introduces the player to the journey and sets initial attributes.
2. **Main Menu (`GameMenu`)**: Players select which challenge to engage in.
3. **Mini-Games**:
   - `CalmTheStorm` - Focuses on anger regulation through controlled breathing exercises.
   - `EchoesInRiver` - Helps manage depressive thoughts by guiding self-reflection and cognitive restructuring.
   - `PiecebyPeace` - Encourages problem-solving and anxiety reduction through a puzzle challenge.
   - `Regulation`, `Regulation2`, `Regulation3` - Guides emotional connection exercises by restoring colors, sounds, and warmth.
4. **Ending (`Ending`)**: Triggered when the player's total attributes reach 100, culminating in a reflective conclusion.

## State Management
- `gameStage`: Controls which game screen is displayed.
- `background`: Updates the background image based on the current game stage.
- `dialogue`: Stores and displays interactive dialogue text.
- `attributes`: Tracks player progress across four emotional dimensions:
  - **Stability**: Managing anger and frustration.
  - **Resilience**: Overcoming negative thoughts.
  - **Positivity**: Coping with stress and anxiety.
  - **Connection**: Enhancing emotional engagement.

## Asset Usage
- **Backgrounds**: Different stages have unique images.
- **Icons**: Represent different emotional attributes.
- **Flower Stages**: Illustrate the player’s growth from a seed to a fully bloomed rose.
- **Sound Effects**: Enhances engagement in `Regulation` and other interactive stages.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Terrrrri/Blooming_Within.git
   cd the_mind_of_garden
   ```
2. Install dependencies:
   ```sh
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Run the project:
   ```sh
   npm run dev
   ```
The app will start at:
👉 http://localhost:5173/ (default Vite development server)

If a different port is used, the console will display the correct URL.

## File Structure
```
/src
 ├── components/
 │   ├── GameIntro.js
 │   ├── GameMenu.js
 │   ├── CalmTheStorm.js
 │   ├── EchoesInRiver.js
 │   ├── PiecebyPeace.js
 │   ├── Regulation.js
 │   ├── Regulation2.js
 │   ├── Regulation3.js
 │   ├── Ending.js
 │   ├── DialogueBox.js
 ├── css/
 │   ├── App.css
 ├── assets/
 │   ├── game_intro_bg.png
 │   ├── bg_menu.png
 │   ├── game1_bg.png
 │   ├── river.png
 │   ├── game4-1bg.png
 │   ├── endding_bg.png
 │   ├── rose0.png
 │   ├── rose1.png
 │   ├── rose2.png
 │   ├── rose3.png
 │   ├── icons/
 │   │   ├── G1.png
 │   │   ├── G2.png
 │   │   ├── g3.png
 │   │   ├── g4.png
 │   │   ├── flowers_none.png
 │   │   ├── flowers.png
 │   │   ├── birds_none.png
 │   │   ├── birds.png
 │   │   ├── bell_none.png
 │   │   ├── bell.png
 │   │   ├── leaf.png
 │   │   ├── river.png
 │   │   ├── bird.png
 │   ├── sounds/
 │   │   ├── background.mp3
 │   │   ├── Nice_wind_chimes.mp3
 │   │   ├── river.mp3
 │   │   ├── bird_call.mp3
 ├── App.js
 ├── index.js
```

## Contributions
Contributions are welcome! Feel free to submit a pull request with improvements.

## Team Members
- **Kaiyue Wu** 
- **Peiqi Yu** 
- **Xinyi SUi** 
- **Yilia Xiang** 

