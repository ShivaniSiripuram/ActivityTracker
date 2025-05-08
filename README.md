# Activity Tracker

An Electron application that tracks user activities like window focus, clicks, scroll events, and key presses. The tracked data is logged in an `activities.json` file and displayed in real-time within the app. It provides a useful way to monitor user interaction and activity on a desktop application.

---

## Features

- Tracks window focus (active window) every second.
- Logs mouse clicks, scroll events, and key presses.
- Data is logged to a JSON file (`activities.json`) for persistence.
- Displays the activity log in real-time within the application window.

---

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/ShivaniSiripuram/ActivityTracker.git
    cd ActivityTracker
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

    The app will launch, and activities will be tracked and logged in `activities.json`.

---

## How It Works

- The app uses **Electron** to create a native desktop application.
- The app tracks the following user activities:
    - **Window Focus**: The currently active window on the system.
    - **Click Events**: Mouse click events including position.
    - **Scroll Events**: Scroll position within the document.
    - **Keydown Events**: Key presses on the keyboard.
- All tracked events are logged into the `activities.json` file for later analysis.
- The app also displays the logged activities in real-time inside the window.

---

## File Structure

```plaintext
ActivityTracker/
├── activities.json       # Log file storing tracked activity data
├── index.html            # Main HTML file for the Electron app
├── preload.js            # Preload script for the renderer process
├── renderer.js           # Renderer process JavaScript (handles activity logging)
├── main.js               # Main process JavaScript (handles window creation and logging)
├── package.json          # Project dependencies and configuration
├── README.md             # Project documentation

## Dependencies

electron: The framework used to build the desktop application.
active-win: Used to get the currently active window details on the system.
fs: Node.js File System module for reading/writing the log file.
