"use client";

import { motion } from 'framer-motion'

function ResumeModal({
  url,
  onClose,
}: {
  url: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden bg-background border border-neutral-800 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <span className="text-sm uppercase tracking-widest text-neutral-400">
            Resume
          </span>

          <div className="flex items-center gap-3">
            {/* Download Button */}
            <a
              href={url}
              download
              className="relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-neutral-900
              bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400
              hover:brightness-110 transition
              focus:outline-none"
            >
              Download
              <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition pointer-events-none" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm text-neutral-400 border border-neutral-700
              hover:text-neutral-200 hover:border-neutral-500 transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <iframe
          src={url}
          title="Resume PDF"
          className="w-full h-full bg-neutral-900"
        />
      </motion.div>
    </div>
  )
}

export { ResumeModal }
