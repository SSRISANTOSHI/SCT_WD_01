# SCT_WD_01

💻 CyberShield – Cybersecurity Awareness Web App
CyberShield is a visually engaging and interactive cybersecurity awareness platform. It is designed to educate users—especially students and professionals—about online threats and safe digital practices through visually rich sections, real-time tips, and a quiz module.



🔧 Installation & Setup Instructions
Clone or Download the Repository

bash
Copy
Edit
git clone https://github.com/your-username/cybershield-awareness.git
cd cybershield-awareness
Open the project folder
You can use VS Code or any code editor.

Run Locally
Simply open index.html in your browser.

✅ No server setup required. Works as a static site.

🌟 Website Features
🔒 Fixed Navigation Bar
A responsive, fixed-position navbar with hover animations. Users can click items or use "Next" buttons to smoothly navigate section-by-section.

🎥 Matrix Background Animation
Adds a dynamic feel with continuously streaming binary-style animation using canvas.

🧠 Cyber Safety Quiz

10 real-time questions fetched from OpenTDB (Tech category).

Shows score at the end.

Navigation with Previous/Next buttons.

💡 Live Cyber Tip

Fetched from the AdviceSlip API for a real-time rotating cyber tip.

Fallback tip shown in case of fetch error.

📚 Cybersecurity Modules
Covers essential topics:

Phishing & Social Engineering

Password Management

Safe Browsing

Mobile App Safety

Email Scams

🔗 Resources Section
Direct links to trusted cybersecurity guides like OWASP and CISA.

🌐 Fully Responsive Design
Optimized for desktops, tablets, and mobile devices.

🔁 Navigation Instructions
Use the navigation bar at the top to jump directly to any section.

Alternatively, use the "Next ➜" buttons at the end of each section to move forward in sequence.

Navigation is smooth and section-based. Users can explore linearly or jump directly as needed.

📂 Folder Structure
pgsql
Copy
Edit
cybershield/
│
├── index.html
├── styles.css
├── script.js
├── images/
│   └── cyber-lock.png
