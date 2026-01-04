"use client";

import { motion } from 'framer-motion'

interface Skill {
  [key: string]: number
}

interface SkillsProps {
  skills: Skill[]
  loading: boolean
}

function Skills({ skills, loading }: SkillsProps) {
  const skeletonArray = Array(8).fill(0)

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
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
            SKILLS
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
            Technologies I Master
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Tools and frameworks I’ve worked with across frontend, backend, and infrastructure.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? skeletonArray.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur-xl h-28"
                />
              ))
            : skills.map((skill, idx) => {
                const [name, level] = Object.entries(skill)[0]
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                    className="group relative rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur-xl hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900">{name}</span>
                      <span className="text-xs text-neutral-500">{level}/5</span>
                    </div>

                    {/* Level Bar */}
                    <div className="mt-4 h-2 w-full rounded bg-neutral-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(level / 5) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                      />
                    </div>

                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10" />
                  </motion.div>
                )
              })}
        </div>
      </div>
    </section>
  )
}

export { Skills }
