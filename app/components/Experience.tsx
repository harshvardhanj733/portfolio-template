"use client";

import { motion } from "framer-motion";

interface Experience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

interface ExperienceSectionProps {
  experience: Experience[];
  loading: boolean;
}

function Experience({ experience, loading }: ExperienceSectionProps) {
  const skeletonArray = Array(2).fill(0);

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl text-center sm:text-left"
        >
          <p className="text-sm font-medium tracking-widest text-indigo-500 uppercase">
            EXPERIENCE
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Where I’ve applied my skills
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Real-world projects where engineering meets impact.
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {loading
            ? skeletonArray.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur-xl h-64"
                />
              ))
            : experience.map((item, idx) => (
                <motion.article
                  key={item.company + idx}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur-xl"
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 blur-xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                          {item.company}
                        </h3>
                        <p className="text-neutral-600">{item.position}</p>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {item.duration}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

                    {/* Responsibilities */}
                    <ul className="mt-6 space-y-3">
                      {item.responsibilities.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          className="flex gap-3 text-neutral-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Experience };
