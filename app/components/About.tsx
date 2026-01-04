"use client";

import { motion } from 'framer-motion'

interface AboutProps {
  about: string
  loading: boolean
}

function About({ about, loading }: AboutProps) {
  if (loading) {
    return (
      <section className="py-28 max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-neutral-800 rounded animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -left-40 top-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
          className="absolute -right-40 bottom-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-fuchsia-500/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 0.5, rotate: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center sm:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 30, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-indigo-500"
        >
          About
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 text-neutral-900 text-lg sm:text-xl leading-relaxed"
        >
          {about}
        </motion.p>

        {/* Animated accent */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '8rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="mt-8 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded mx-auto sm:mx-0"
        />
      </div>
    </section>
  )
}

export { About }
