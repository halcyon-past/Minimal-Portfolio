# Virtual Mouse Control With Gesture Recognition and Voice Assistant [![](https://img.shields.io/badge/python-3.9.21-blue.svg)](https://www.python.org/downloads/) [![platform](https://img.shields.io/badge/platform-windows-green.svg)](https://www.microsoft.com/en-in/windows?r=1)

A Final Year Project for VIT, this project demonstrates a novel way to control a computer interface using hand gestures and voice commands. It leverages MediaPipe for real-time gesture recognition, integrates a custom voice assistant named **Krishna**, and incorporates generative AI (using Google Gemini) for enhanced query responses. The system offers an alternative and accessible method of interaction by combining gesture recognition and voice control in a unified platform.

---
## Research Paper
[IJIRT RESEARCH PAPER - KrishnaVision: A Multimodal Virtual Interface Combining MediaPipe-Hands Optimization and Gemini AI for Context- Aware HCI](https://ijirt.org/article?manuscript=180711)

### citation
R. De and A. Saha, "KrishnaVision: A Multimodal Virtual Interface  Combining MediaPipe-Hands Optimization and Gemini  AI for Context- Aware HCI," International Journal of Innovative Research in Technology (IJIRT), vol. 12, no. 1, pp. 2909–2917, 2025.

---

## Table of Contents

- [Virtual Mouse Control With Gesture Recognition and Voice Assistant  ](#virtual-mouse-control-with-gesture-recognition-and-voice-assistant--)
  - [Research Paper](#research-paper)
    - [citation](#citation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
    - [Gesture Recognition](#gesture-recognition)
    - [Voice Assistant (Krishna)](#voice-assistant-krishna)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Environment Setup](#environment-setup)
    - [Configuration](#configuration)
  - [Usage](#usage)
    - [Running the Voice Assistant](#running-the-voice-assistant)
    - [Running Only Gesture Recognition](#running-only-gesture-recognition)
  - [Voice Commands](#voice-commands)
  - [Hand Gesture Controls](#hand-gesture-controls)
  - [Project Structure](#project-structure)
  - [Future Enhancements](#future-enhancements)
  - [Contributors](#contributors)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
- [Team](#team)

---

## Introduction

The Virtual Mouse project reimagines human-computer interaction by providing a gesture- and voice-controlled interface. With this project, users can perform various mouse operations like cursor movement, clicks, scrolling, and system adjustments (volume and brightness) using hand gestures captured via a webcam. Additionally, the integrated voice assistant, **Krishna**, extends functionality by enabling voice commands for tasks such as file navigation, web searches, and leveraging generative AI for contextual responses (Divine Mode). This project was designed and developed as part of the final year curriculum at VIT.

---

## Features

### Gesture Recognition
- **Cursor Control:** Move the mouse pointer using hand movements.
- **Click Operations:** Perform left, right, and double clicks with specific finger gestures.
- **Scrolling:** Scroll vertically and horizontally using pinch gestures.
- **Drag and Drop:** Use a fist gesture to click and drag items.
- **System Controls:** Adjust system volume and screen brightness using pinch gestures with the dominant hand.
- **Multi-Hand Distinction:** Differentiates between Major (default: Right) and Minor (default: Left) hands for different gesture functionalities.

### Voice Assistant (Krishna)
- **Launch/Stop Gesture Recognition**: Voice commands to control the gesture recognition module.
- **Google Search & Navigation**: Initiate web searches or locate places using Google Maps.
- **File Navigation**: List and open files or directories.
- **Date and Time Inquiry**: Respond with current date and time.
- **Copy & Paste Operations**: Keyboard shortcuts triggered by voice.
- **Sleep/Wake Up Commands**: Control the assistant's active listening state.
- **Divine Mode (GenAI Integration)**: Leverage Google Gemini Flash for generative AI responses including screenshot analysis and description.

---

## Prerequisites

- **Python Version:** 3.9.21
- **Operating System:** Windows (with required modules like `pywin32`, `pycaw`, `screen_brightness_control`)
- **Tools:** Anaconda Distribution (recommended for environment management)
- **Hardware:**
  - Webcam for gesture recognition
  - Microphone for voice input

---

## Installation

### Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/halcyon-past/Glide-Connect.git
```
For detailed instructions on cloning, visit [GitHub's documentation](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

### Environment Setup

1. **Create a Conda Environment:**
   ```bash
   conda create --name gesture python=3.9.21
   ```
2. **Activate the Environment:**
   ```bash
   conda activate gesture
   ```
3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Install pywin32:**
   ```bash
   conda install pywin32
   ```

### Configuration

1. **Set up Gemini API Key:**
   - Navigate to the `src` directory.
   - Create a `.env` file with the following content:
     ```bash
     GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
     GEMINI_MODEL_NAME=<YOUR_GEMINI_MODEL_NAME>
     ```
     > Currently i am using "gemini-2.0-flash-lite" as my model since it is cheap and fast
   - To generate a Gemini API Key, visit [Google AI Studio](https://aistudio.google.com/apikey).

2. **Navigate to the `src` Folder:**
   - Open your terminal and change the directory to the `src` folder:
     ```bash
     cd path/to/your/repo/src
     ```

---

## Usage

### Running the Voice Assistant
To launch the integrated voice assistant (which also allows controlling gesture recognition via voice):
```bash
python Voice_Assistant.py
```
The assistant will greet you and display a chat interface. You can interact via voice or by typing in the chat window. The gesture control window will open automatically if launched via voice command ("launch gesture recognition").

### Running Only Gesture Recognition
To run gesture recognition independently without the voice assistant:
```bash
python Gesture_Controller.py
```
This will open a window showing the camera feed with hand landmarks. Press `Enter` in the OpenCV window to close it.

---

## Voice Commands

Interact with the Krishna assistant using the following voice commands. You can also type these commands into the chat interface.

* **`hello`**
    * **Action:** Greets the user based on the current time.
    * **Example:** "Krishna, hello"
* **`what is your name`**
    * **Action:** States its name.
    * **Example:** "Krishna, what is your name?"
* **`date` / `time`**
    * **Action:** Replies with the current date or time.
    * **Example:** "Krishna, what's the date?" / "Krishna, tell me the time"
* **`location`**
    * **Action:** Asks for a place, then opens Google Maps.
    * **Example:** "Krishna, find a location" -> (Assistant asks) -> User: "Paris"
* **`search [query]`**
    * **Action:** Performs a Google search.
    * **Example:** "Krishna, search for generative AI"
* **`copy` / `paste`**
    * **Action:** Simulates Ctrl+C or Ctrl+V.
    * **Example:** "Krishna, copy this" / "Krishna, paste here"
* **`launch gesture recognition`**
    * **Action:** Starts the gesture controller module.
    * **Example:** "Krishna, launch gesture recognition"
* **`stop gesture recognition`**
    * **Action:** Stops the gesture controller module.
    * **Example:** "Krishna, stop gesture recognition"
* **`list` / `open [number]` / `back`**
    * **Action:** Navigates the file system starting from `C://`. `list` shows files/folders, `open [number]` opens the item, `back` goes to the parent directory.
    * **Example:** "Krishna, list" -> "Krishna, open 2" -> "Krishna, go back"
* **`enter divine mode` / `exit divine mode`**
    * **Action:** Enters/exits mode for querying the Gemini AI.
    * **Example:** "Krishna, enter divine mode" -> (Ask question) -> "Exit divine mode"
* **`look at my screen`** (In Divine Mode)
    * **Action:** Takes screenshot, asks for prompt, sends both to Gemini.
    * **Example:** "Look at my screen" -> (Assistant asks) -> User: "What does this error message mean?"
* **`bye` / `wake up`**
    * **Action:** Puts the assistant to sleep / wakes it up.
    * **Example:** "Krishna, bye" -> (Later) -> "Krishna, wake up"
* **`exit`**
    * **Action:** Shuts down the assistant application.
    * **Example:** "Krishna, exit now"

---

## Hand Gesture Controls

Control your computer using hand gestures detected by the webcam. The system differentiates between your **Major hand** (dominant, default: Right) and **Minor hand** (non-dominant, default: Left). A window titled 'Gesture Controller' shows the camera feed and detected landmarks. *Note: Gestures require holding the pose for a few frames (~4) for stability before triggering an action.*

* **Neutral (Palm / Other)**
    * **Gesture:** Open hand (palm facing camera) or any unrecognized gesture.
    * **Action:** No action. Resets states like "ready-to-click". The cursor does not move in this state.
    * **Hand:** Either

* **Move Cursor / Ready (V Gesture)**
    * **Gesture:** Extend Index and Middle fingers ('V' sign), keep others closed.
    * **Action:** Moves the mouse cursor according to hand movement. Sets the system to a "ready" state for click actions.
    * **Hand:** Major

* **Drag (Fist)**
    * **Gesture:** Close all fingers into a fist.
    * **Action:** Simulates holding down the left mouse button. Move the fist to drag. Releasing the fist (e.g., opening to Palm) releases the mouse button.
    * **Hand:** Major

* **Left Click (Middle Finger after V)**
    * **Gesture:** Start with the V Gesture (Index and Middle up). Lower the Index finger, leaving only the Middle finger extended.
    * **Action:** Performs a single left mouse click. Resets the "ready" state.
    * **Hand:** Major

* **Right Click (Index Finger after V)**
    * **Gesture:** Start with the V Gesture. Lower the Middle finger, leaving only the Index finger extended.
    * **Action:** Performs a single right mouse click. Resets the "ready" state.
    * **Hand:** Major

* **Double Click (Closed V after V)**
    * **Gesture:** Start with the V Gesture. Bring the tips of the Index and Middle fingers close together while keeping them extended.
    * **Action:** Performs a double left mouse click. Resets the "ready" state.
    * **Hand:** Major

* **Scroll (Minor Hand Pinch)**
    * **Gesture:** Bring the tips of the Thumb and Index finger close together (pinch).
    * **Action:**
        * Moving the pinched hand **vertically** scrolls the active window up or down.
        * Moving the pinched hand **horizontally** scrolls the active window left or right (simulates Shift + Scroll).
    * **Hand:** Minor

* **System Control (Major Hand Pinch)**
    * **Gesture:** Bring the tips of the Thumb and Index finger close together (pinch).
    * **Action:**
        * Moving the pinched hand **vertically** increases (up) or decreases (down) the system volume.
        * Moving the pinched hand **horizontally** increases (right) or decreases (left) the screen brightness.
    * **Hand:** Major

---

## Project Structure

```
├── README.md
├── requirements.txt
├── .env                  # Contains GEMINI_API_KEY
├── src
│   ├── Voice_Assistant.py   # Main entry for voice assistant and integration.
│   ├── Gesture_Controller.py # Handles gesture detection and control logic.
│   ├── GenAI.py             # Integration with Google Gemini generative AI.
│   ├── app.py               # Eel-based GUI for the chat interface.
│   ├── web/                 # Contains the files for the UI of the chatbot
│   └── logs/                # Contains logs of the chatbot
```

- **Voice_Assistant.py:** Combines voice recognition, GUI interaction, and calls other modules.
- **Gesture_Controller.py:** Implements hand gesture detection using MediaPipe and maps gestures to `pyautogui`, `pycaw`, and `screen_brightness_control` actions.
- **GenAI.py:** Manages API interactions with Google Gemini.
- **app.py:** Provides the graphical user interface using Eel.

---

## Future Enhancements

- **Multi-Language Support:** Extend voice commands to support additional languages.
- **Customizable Gestures:** Allow users to define or modify gesture mappings.
- **Performance Optimization:** Fine-tune gesture detection and controller responsiveness.
- **Cross-Platform Compatibility:** Adapt system controls (volume, brightness) for macOS/Linux.
- **User Personalization:** Save user preferences (e.g., dominant hand, sensitivity).

---

## Contributors
<a href="https://github.com/halcyon-past/Glide-Connect/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=halcyon-past/Glide-Connect" />
</a>

---

## Contributing

Contributions are welcome! If you would like to contribute to this project:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add Your Feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please adhere to the project’s coding conventions and document your changes thoroughly.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **MediaPipe:** For providing the hand tracking framework.
- **Google Gemini:** For the generative AI capabilities.
- **PyAutoGUI, PyCAW, screen-brightness-control:** For enabling system interaction.
- **Open Source Community:** For the many libraries and tools used.

# Team
  | Name | Github  | Email | Linkedin | Instagram | Youtube |
  | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
  | Aritro Saha | [GitHub](https://github.com/halcyon-past) | [Email](mailto:titanssuperior@gmail.com) | [LinkedIn](https://www.linkedin.com/in/aritro-saha/) | [Instagram](https://www.instagram.com/halcyon_past/) | [Youtube](https://www.youtube.com/@veripyed) |
  | Rupkatha De | [GitHub](https://github.com/rupkatha-de) | [Email](mailto:derupkatha@gmail.com) | [LinkedIn](https://www.linkedin.com/in/rupkatha-de-80a422231/) | [Instagram](https://www.instagram.com/rupkatha_26/) | NA |
  | Anusmita Panji | NA | [Email](mailto:kolianusmita@gmail.com) | [LinkedIn](https://www.linkedin.com/in/anusmita-panji-a509551b5) | [Instagram](https://www.instagram.com/anusmitap_21/) | NA |
