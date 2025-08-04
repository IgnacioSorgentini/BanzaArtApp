# BanzaArt App

An art gallery mobile application built with **React Native**, **Expo**, and **TypeScript**. This app allows users to browse a curated list of artworks, view detailed information, and save their favorite pieces.

## 🚀 Features

  * **Browse Artworks**: Seamlessly browse a paginated list of artworks from the [Art Institute of Chicago API](https://api.artic.edu/docs).
  * **Artwork Details**: Tap on any piece to view a detailed page with information about the artist, materials, dimensions, and a high-resolution image.
  * **Favorites System**: Add and remove artworks from your favorites list, which is saved locally on your device.
  * **Responsive UI**: The app layout adapts to different screen sizes, displaying a single column on mobile devices and a two-column grid on tablets.
  * **Progressive Image Loading**: Images load with a low-quality placeholder first, providing a smooth user experience.
  * **Clean Architecture**: The project follows a modular structure with clear separation of concerns using services, components, and type definitions.

## 💻 Technologies

  * **React Native**: The core framework for building native mobile applications.
  * **Expo**: A set of tools and services for building, deploying, and quickly iterating on React Native apps.
  * **TypeScript**: Ensures type safety and provides better developer tooling.
  * **React Navigation**: Handles screen navigation and stack management.
  * **`react-native-safe-area-context`**: Manages safe area insets on different devices (e.g., notches).
  * **`react-native-toast-message`**: Provides a beautiful and simple-to-use toast message component.
  * **`expo-font`**: Loads custom fonts (Inter).
  * **`@expo/vector-icons`**: Integrates a comprehensive set of vector icons for the UI.

## ⚙️ Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

  * Node.js (LTS version)
  * Yarn or npm
  * Expo Go app on your physical device or a mobile emulator

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/IgnacioSorgentini/BanzaArtApp.git
    cd BanzaArtApp
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Start the Expo development server:**

    ```bash
    yarn start
    # or
    npm start
    ```

4.  **Run the app:**

      * **On a physical device:** Scan the QR code displayed in the terminal with your phone's camera.
      * **On an iOS emulator:** Press `i` in the terminal.
      * **On an Android emulator:** Press `a` in the terminal.

## 🎨 Screenshots

*Add some screenshots or a GIF here to showcase your app's main screens (list, details, favorites). This makes the project much more appealing\!*

## 🤝 Contributing

Contributions are welcome\! If you find a bug or have a suggestion for a new feature, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.