# Syncnoz

Syncnoz is a React.js-based event scheduling application designed to streamline planning and managing events with intuitive drag-and-drop functionality. Built with an emphasis on user experience, Syncnoz enables easy creation, scheduling, and management of events through a visually interactive calendar.

## Features

- **Interactive Drag-and-Drop Calendar:** Allows users to add and rearrange events directly on the calendar.
- **Responsive Design:** Optimized for various screen sizes and devices, ensuring seamless usage on mobile and desktop.
- **Customizable Event Creation:** Users can set event details like title, date, time, and description.
- **Easy-to-Use Interface:** Intuitive, user-friendly design with quick access to key features.
- **Real-Time Updates:** Changes to events reflect immediately, providing a smooth and efficient user experience.
- **Font Awesome Icons:** Rich collection of icons for enhancing UI and adding visual appeal to events.
  
## Getting Started

### Prerequisites

- **Node.js** and **npm** (Node Package Manager)
  - Install Node.js from [https://nodejs.org/](https://nodejs.org/).
  - This will include npm, which will be used for package management.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AkshaySharma008/syncnoz.git
   cd syncnoz
   ```

2. **Install Dependencies**
   Install all necessary dependencies, including Font Awesome and FullCalendar:
   ```bash
   npm install
   ```

   If not automatically installed, you can explicitly add the following packages:

   ```bash
   npm install @fortawesome/fontawesome-free @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   The application will open on `http://localhost:3000` by default.

## Project Structure

```plaintext
syncnoz/
├── public/               # Public assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Page-level logics
│   ├── utils/            # Utility functions
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point for ReactDOM
├── .gitignore
├── package.json
└── README.md
```

## Key Components

- **Calendar Component:** Main interactive calendar interface where users can view, create, and schedule events using FullCalendar.
- **Event Card:** Pop-up or overlay allowing users to input details for individual events.
- **Navigation Bar:** Contains navigation options for quickly switching between calendar views.
- **Font Awesome Icons:** Used to enrich UI elements and enhance the user interface with visually appealing icons.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in the development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production to the `build` folder.

## Contributing

1. **Fork** the repository.
2. **Clone** your fork.
3. Create a **feature branch**: `git checkout -b my-feature`.
4. **Commit** your changes: `git commit -am 'Add new feature'`.
5. **Push** to the branch: `git push origin my-feature`.
6. Create a **Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - for the robust front-end library.
- [Font Awesome](https://fontawesome.com/) - for the wide range of icons.
- [FullCalendar](https://fullcalendar.io/) - for the powerful and flexible calendar library.
