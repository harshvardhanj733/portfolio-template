"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
};

function Projects({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/3 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-1/3 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-full sm:mb-16 sm:max-w-2xl"
        >
          <p className="text-sm font-medium tracking-wider text-indigo-500">
            SELECTED WORK
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Projects that define my craft
          </h2>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            A curated collection of systems, products, and experiments where
            engineering meets design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-neutral-200 animate-pulse"
              />
            ))}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
        >
          {loading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-neutral-200 animate-pulse"
              />
          ))}

          {!loading && projects.map((project, index) => (
            <motion.article
              key={index}
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
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 sm:w-auto"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted sm:w-auto"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Projects };
