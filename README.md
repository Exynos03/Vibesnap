VibeSnap
VibeSnap is a feature-rich social media application built with React.js, Firebase, and Tailwind CSS. It offers user authentication, infinite scrolling, and a responsive design for seamless and interactive user experiences.

🚀 Features
🔑 User Authentication
Register and log in with email and password.
Google login integration.
Persistent user sessions.
📰 Social Media Feed
Create posts with text, images, and videos.
Support for multi-image uploads in a single post.
Smooth infinite scrolling for posts.
📱 User Profiles
View and edit profile details: bio, name, and profile picture.
"My Posts" section displaying user-created posts.
🎥 Video Interaction
Videos auto-play when in view and pause when out of view.
🌟 Shareable Content
Share posts and content with other applications.
💡 Responsive Design
Optimized for mobile, tablet, and desktop devices.
🛠️ Technologies Used
Frontend: React.js, Tailwind CSS, Vite
Backend: Firebase (Authentication, Firestore)
State Management: React Context API
Styling: Tailwind CSS
🚀 Getting Started
Prerequisites
Node.js installed on your machine.
A Firebase project set up.
Installation
Clone the repository:
git clone https://github.com/your-username/vibesnap.git
Navigate to the project directory:
cd vibesnap
Install dependencies:
npm i
Set up your Firebase configuration in a .env file:
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
Start the development server
npm run dev
🚀 Deployment
Hosting on Firebase
Install Firebase CLI:
npm install -g firebase-tools
Login to Firebase:
firebase login
Initialize Firebase Hosting:
firebase init
Build and deploy the project:
npm run build
firebase deploy
🤝 Contribution
Feel free to fork this repository and contribute by submitting a pull request. For major changes, open an issue first to discuss what you'd like to change.