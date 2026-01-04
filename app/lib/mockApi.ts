function fetchPortfolioData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "XYZ",
        role: "Full Stack Developer",
        about:
          "I am a passionate Full Stack Developer with expertise in building dynamic and responsive web applications. I love to explore new technologies and continuously improve my skills.",
        resume: "https://drive.google.com/file/d/1-0T7OvWmufEDR7u4QSHF3tnvxzV2p3XK/view",
        experience: [
          {
            company: "Tech Solutions Inc.",
            position: "Software Engineer",
            duration: "June 2021 - Present",
            responsibilities: [
              "Developed and maintained web applications using React and Node.js.",
              "Collaborated with cross-functional teams to define, design, and ship new features.",
              "Optimized applications for maximum speed and scalability.",
            ],
          },
          {
            company: "Web Innovators LLC",
            position: "Junior Developer",
            duration: "Jan 2020 - May 2021",
            responsibilities: [
              "Assisted in the development of client websites and applications.",
              "Participated in code reviews and team meetings.",
              "Wrote clean, maintainable code following best practices.",
            ],
          }
        ],
        socials: [
          { linkedin: "https://www.linkedin.com/in/xyz/" },
          { github: "https://www.github.com/xyz98" },
          { email: "xyz98@gmail.com" },
          { leetcode: "https://leetcode.com/xyz98/" },
        ],
        projects: [
          {
              title: "Multilingual Sentiment Analyzer",
              description:
                "AI-powered system to detect sentiment across multiple languages using Transformer models and language detection pipelines.",
              tech: ["XLM-R", "Transformers", "Next.js", "FastAPI"],
              liveUrl: "#",
              githubUrl: "#",
            },
            {
              title: "AI Video Processing Platform",
              description:
                "End-to-end AI tooling to transcribe, subtitle, generate voiceovers, and enhance news videos at scale.",
              tech: ["Next.js", "Vercel AI SDK", "LLMs", "FFmpeg"],
              githubUrl: "#",
            },
        ],
        education: [
          {
            institution: "ABC University",
            degree: "Bachelor of Science in Computer Science",
            duration: "2016 - 2020",
          },
        ],
        skills: [{ JavaScript: 5 }, { React: 4 }, { "Node.js": 4 }],
      });
    }, 1200);
  });
}

export { fetchPortfolioData };
