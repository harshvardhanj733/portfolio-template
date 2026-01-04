// HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface HeroProps {
  data: {
    name: string;
    role: string;
    resume: string;
    socials: { [key: string]: string }[];
  };
  loading: boolean;
}

export default function Hero({ data, loading }: HeroProps) {
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-72 h-6 bg-neutral-800 rounded animate-pulse" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-fuchsia-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-3xl text-center px-6">
        {/* Animated name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
        >
          {data.name}
        </motion.h1>

        {/* Animated role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-xl text-neutral-400"
        >
          {data.role}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href={data.resume}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition"
          >
            View Resume
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex justify-center gap-6 text-neutral-400"
        >
          {/* {data.socials.github && (
            <a href={data.socials.github} target="_blank" className="hover:text-white transition">
              <Github size={22} />
            </a>
          )}
          {data.socials.linkedin && (
            <a href={data.socials.linkedin} target="_blank" className="hover:text-white transition">
              <Linkedin size={22} />
            </a>
          )}
          {data.socials.twitter && (
            <a href={data.socials.twitter} target="_blank" className="hover:text-white transition">
              <Twitter size={22} />
            </a>
          )}
          {data.socials.email && (
            <a href={`mailto:${data.socials.email}`} className="hover:text-white transition">
              <Mail size={22} />
            </a>
          )} */}
          {data.socials &&
            data.socials.map((social, idx) => {
              const [key, url] = Object.entries(social)[0];

              let IconComponent: React.ElementType | null = null;

              switch (key.toLowerCase().trim()) {
                case "github":
                  IconComponent = Github;
                  break;
                case "linkedin":
                  IconComponent = Linkedin;
                  break;
                case "twitter":
                  IconComponent = Twitter;
                  break;
                case "email":
                  IconComponent = Mail;
                  break;
                default:
                  IconComponent = null;
              }

              return (
                <a
                  key={`${key}-${idx}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  {IconComponent ? (
                    <IconComponent size={22} />
                  ) : (
                    <span className="capitalize">{key}</span>
                  )}
                </a>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
