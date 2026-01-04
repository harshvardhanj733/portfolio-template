"use client";

import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import { ResumeModal } from "../components/ResumeModal";
import { PortfolioTemplate } from "../types/PortfolioTemplate";
import { useParams } from "next/navigation";

export default function Page() {
  const [data, setData] = useState({} as PortfolioTemplate);
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/publish/${id}`);
        if(!res.ok){
          throw new Error("Failed to fetch portfolio data");
        }
        const data: PortfolioTemplate = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen">
      <Hero
        data={{
          name: data.name,
          role: data.role,
          resume: data?.resume || "",
          socials: data?.socials || [],
        }}
        loading={loading}
      />
      {data.about && <About about={data.about} loading={loading} />}
      {data.skills && <Skills skills={data?.skills || []} loading={loading} />}
      {data.experience && (
        <Experience experience={data?.experience || []} loading={loading} />
      )}
      {data.projects?.length !== 0 && (
        <Projects projects={data?.projects || []} loading={loading} />
      )}
      <Contact email={data.email} loading={loading} />
      {showResume && !loading && data.resume && (
        <ResumeModal url={data?.resume} onClose={() => setShowResume(false)} />
      )}
    </main>
  );
}
