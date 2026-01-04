"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6 text-center"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-4 text-muted-foreground">
          Sign in to continue your journey.
        </p>

        {/* Login CTA */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-base font-medium text-background transition hover:opacity-90"
        >
          Continue with Login
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Subtle helper text */}
        <p className="mt-6 text-xs text-muted-foreground">
          Secure authentication powered by OAuth
        </p>
      </motion.div>
    </section>
  );
}
