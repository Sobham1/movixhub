import "../css/About.css";

function About() {
  return (
    <div className="about-page" style={{ padding: "2rem", maxWidth: "800px", margin: "auto", fontFamily: "Lucida Console", color: "white" }}>
      <h2 style={{ fontSize: "2rem", color: "#e50914", marginBottom: "1.5rem" }}>
        About MovixHub🎬 
      </h2>

      <p style={{ fontSize: "1rem", lineHeight: "1.8" }}>
        MovixHub is a movie discovery platform built to deliver cinematic simplicity with a personalized touch. Whether you're browsing popular blockbusters, exploring upcoming releases, or curating your own list of favorites—MovixHub offers a clean, intuitive experience powered by modern web technology.
      </p>

      <h3 style={{ marginTop: "2rem", color: "#e50914" }}>🔧 Tech Stack</h3>
      <ul>
        <li>React (Vite-based setup for blazing-fast performance)</li>
        <li>Firebase Authentication & Firestore for secure user access and data tracking</li>
        <li>TMDB-powered movie API search and preview</li>
        <li>GitHub Pages deployment with custom branding and analytics</li>
      </ul>

      <h3 style={{ marginTop: "2rem", color: "#e50914" }}>👨‍💻 Crafted by Sobham</h3>
      <p>
        I'm a newbie in web development passionate about interactive, user-centric design. MovixHub is part of my personal mission to blend technology and emotion—delivering an app that feels both functional and cinematic.
      </p>
      <p>
        Whether it's refining the mobile experience, responding to feedback, or exploring what's next in modern UI, I will build with curiosity and care. MovixHub reflects my journey and my love for sharing creativity through code.
      </p>

      <h3 style={{ marginTop: "2rem", color: "#e50914" }}>🚀 What You’ll Find Inside</h3>
      <ul>
        <li>🔎 Live search with dynamic search results</li>
        <li>❤️ Favorites gated for authenticated users</li>
        <li>📈 Firestore-backed signup tracking</li>
        <li>🔐 Login & Signup with alerts and a welcome message</li>
        <li>🎥 Coming Soon scroll and responsive movie cards</li>
        <li>📱 Mobile-first design with a focus on performance</li>
      </ul>

      <h3 style={{ marginTop: "2rem", color: "#e50914" }}>📬 Connect with Me</h3>
      <p>
        You’ll find me on <a href="https://github.com/Sobham1" style={{ color: "#e50914" }}>GitHub</a> and <a href="https://linkedin.com/in/sobham-sandilya" style={{ color: "#e50914" }}>LinkedIn</a>, where I share my projects, thoughts, and updates. Hope you enjoyed MovixHub— reach out if you want to collaborate!
      </p>

      <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#aaa" }}>
        Crafted with code & love by Sobham 🚀
      </p>
    </div>
  );
}

export default About;
