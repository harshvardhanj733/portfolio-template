"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { CardTemplate } from "./types/CardTemplate";

export default function HomePage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<CardTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch("/api/publish");
        const data: CardTemplate[] = await res.json();
        setResumes(data);
      } catch {
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const filteredResumes = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (q === "") {
      console.log("Returning all resumes");
      return resumes;
    }

    const filtered = resumes.filter((r) => {
      const match =
        r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q);
      if (match) {
        console.log("Match found:", r.name, r.role);
      }
      return match;
    });

    console.log("Filtered results:", filtered.length);
    return filtered;
  }, [query, resumes]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-28 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-semibold tracking-tight"
        >
          Resumbrary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 max-w-xl mx-auto text-muted-foreground text-lg"
        >
          Discover beautifully crafted resumes or publish your own.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-10 h-[3px] w-24 origin-left rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500"
        />
      </section>

      {/* Search */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full rounded-xl border border-border bg-muted/40 pl-10 pr-4 py-3 text-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        </div>
      </section>

      {/* Horizontal Resume Rail */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading published resumes…
            </p>
          ) : filteredResumes.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No matching resumes found.
            </p>
          ) : (
            <motion.div
              initial="hidden"
              key={filteredResumes.map(r => r.id).join(',')}
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06 },
                },
              }}
              className="
          flex
          flex-col
          gap-3
          overflow-x-auto
        "
            >
              {filteredResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => router.push(`/${resume.id}`)}
                  className="
              group
              cursor-pointer
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-border
              bg-muted/30
              px-5
              py-4
              backdrop-blur
              hover:bg-muted/50
              transition
            "
                >
                  {/* Left: Name + Role */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="font-medium text-sm sm:text-base">
                      {resume.name}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {resume.role}
                    </span>
                  </div>

                  {/* Right: Arrow */}
                  <span
                    className="
                text-muted-foreground
                text-lg
                transition-transform
                group-hover:translate-x-1
              "
                  >
                    →
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground"
        >
          Want to create your own resume?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-medium underline hover:text-foreground transition"
          >
            Login
          </button>{" "}
          to continue
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>
            Created and developed by <strong>Harsh Vardhan Jain</strong> with
          </span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>

        <div className="mt-3 flex justify-center gap-4">
          <a
            href={process.env.LINKEDIN_URL}
            target="_blank"
            className="underline hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={process.env.GITHUB_URL}
            target="_blank"
            className="underline hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
