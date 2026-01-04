"use client";

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

function Contact({
  email,
  loading,
}: {
  email: string
  loading?: boolean
}) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {loading ? (
          <div className="mx-auto h-14 w-64 rounded-xl bg-muted animate-pulse" />
        ) : (
          <>
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
            >
              Let’s build something meaningful
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-4 text-muted-foreground text-base sm:text-lg"
            >
              Open to full-time opportunities and impactful collaborations.
            </motion.p>

            {/* CTA */}
            <motion.a
              href={`mailto:${email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative mt-10 inline-flex items-center gap-3 rounded-xl bg-foreground px-8 py-4 text-sm sm:text-base font-medium text-background transition"
            >
              <Mail className="h-5 w-5" />
              Contact Me

              {/* Hover glow */}
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40" />
            </motion.a>
          </>
        )}
      </div>
    </section>
  )
}

export { Contact }
