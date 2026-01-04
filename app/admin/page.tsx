"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Experience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

interface Project {
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  tech: string[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
}

interface Social {
  [key: string]: string;
}

interface Skill {
  [key: string]: number;
}

interface PortfolioTemplate {
  name: string;
  role: string;
  about: string;
  email: string;
  experience?: Experience[];
  socials?: Social[];
  projects?: Project[];
  education?: Education[];
  skills?: Skill[];
  resume: string;
}

/* ---------- API Calls ---------- */
const save = async (data: PortfolioTemplate) => {
  console.log("Saving draft...", data);
  try {
    const response = await fetch("/api/save", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok && response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Saved data:", result);
    alert("Draft saved");
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save draft");
  }
};

const publish = async (data: PortfolioTemplate) => {
  console.log("Publishing...", data);
  try {
    const response = await fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok && response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Published data:", result);
    alert("Portfolio published");
  } catch (error) {
    console.error("Error publishing data:", error);
    alert("Failed to publish portfolio");
  }
};

/* ---------- Page ---------- */

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioTemplate>({
    name: "",
    role: "",
    about: "",
    email: "",
    experience: [],
    socials: [],
    projects: [],
    education: [],
    skills: [],
    resume: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /* ---------- Auth Guard ---------- */

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const response = await fetch("/api/save");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched saved data:", data);
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching saved data:", error);
      }
    };
    if (status === "authenticated") {
      fetchSavedData();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  /* ---------- Validation ---------- */

  const validateRequired = () => {
    const newErrors: { [key: string]: string } = {};

    if (!portfolio.name.trim()) newErrors.name = "Name is required";
    if (!portfolio.role.trim()) newErrors.role = "Role is required";
    if (!portfolio.about.trim()) newErrors.about = "About is required";
    if (!portfolio.resume.trim()) newErrors.resume = "Resume URL is required";

    // Validate experience entries
    portfolio.experience?.forEach((exp, i) => {
      if (!exp.company.trim()) newErrors[`exp-company-${i}`] = "Company is required";
      if (!exp.position.trim()) newErrors[`exp-position-${i}`] = "Position is required";
      if (!exp.duration.trim()) newErrors[`exp-duration-${i}`] = "Duration is required";
      if (exp.responsibilities.length === 0 || exp.responsibilities.every(r => !r.trim())) {
        newErrors[`exp-resp-${i}`] = "At least one responsibility is required";
      }
    });

    // Validate project entries
    portfolio.projects?.forEach((proj, i) => {
      if (!proj.title.trim()) newErrors[`proj-title-${i}`] = "Title is required";
      if (!proj.description.trim()) newErrors[`proj-desc-${i}`] = "Description is required";
      if (proj.tech.length === 0 || proj.tech.every(t => !t.trim())) {
        newErrors[`proj-tech-${i}`] = "At least one technology is required";
      }
    });

    // Validate education entries
    portfolio.education?.forEach((edu, i) => {
      if (!edu.institution.trim()) newErrors[`edu-inst-${i}`] = "Institution is required";
      if (!edu.degree.trim()) newErrors[`edu-degree-${i}`] = "Degree is required";
      if (!edu.duration.trim()) newErrors[`edu-duration-${i}`] = "Duration is required";
    });

    // Validate social entries
    portfolio.socials?.forEach((social, i) => {
      const key = Object.keys(social)[0];
      if (!key || !key.trim()) newErrors[`social-key-${i}`] = "Platform name is required";
      if (!social[key] || !social[key].trim()) newErrors[`social-value-${i}`] = "URL is required";
    });

    // Validate skill entries
    portfolio.skills?.forEach((skill, i) => {
      const key = Object.keys(skill)[0];
      if (!key || !key.trim()) newErrors[`skill-key-${i}`] = "Skill name is required";
      if (skill[key] < 0 || skill[key] > 5) {
        newErrors[`skill-value-${i}`] = "Proficiency must be between 0-5";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Helpers ---------- */

  const updateField = (key: keyof PortfolioTemplate, value: any) => {
    setPortfolio((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handleSave = () => {
    if (validateRequired()) {
      save(portfolio);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handlePublish = () => {
    if (validateRequired()) {
      publish(portfolio);
    } else {
      alert("Please fill in all required fields");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm px-4 py-2 rounded-lg border hover:bg-muted transition"
          >
            Logout
          </button>
        </div>

        {/* ---------- Basic Info (Required) ---------- */}
        <Section title="Basic Information" required>
          <Input
            label="Name"
            value={portfolio.name}
            onChange={(v: string) => updateField("name", v)}
            error={errors.name}
            required
          />
          <Input
            label="Role"
            value={portfolio.role}
            onChange={(v: string) => updateField("role", v)}
            error={errors.role}
            required
          />
          <Textarea
            label="About"
            value={portfolio.about}
            onChange={(v: string) => updateField("about", v)}
            error={errors.about}
            required
          />
          <Input
            label="Resume URL"
            value={portfolio.resume || ""}
            onChange={(v: string) => updateField("resume", v)}
            error={errors.resume}
            required
            placeholder="https://..."
          />
        </Section>

        {/* ---------- Experience (Optional) ---------- */}
        <Section title="Experience" optional>
          {(portfolio.experience || []).map((exp, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Experience #{i + 1}
                </span>
                <button
                  onClick={() => {
                    const updated = portfolio.experience!.filter((_, idx) => idx !== i);
                    updateField("experience", updated);
                  }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Company"
                value={exp.company}
                onChange={(v: string) => {
                  const updated = [...portfolio.experience!];
                  updated[i].company = v;
                  updateField("experience", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`exp-company-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`exp-company-${i}`]}
                required
              />
              <Input
                label="Position"
                value={exp.position}
                onChange={(v: string) => {
                  const updated = [...portfolio.experience!];
                  updated[i].position = v;
                  updateField("experience", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`exp-position-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`exp-position-${i}`]}
                required
              />
              <Input
                label="Duration"
                value={exp.duration}
                onChange={(v: string) => {
                  const updated = [...portfolio.experience!];
                  updated[i].duration = v;
                  updateField("experience", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`exp-duration-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`exp-duration-${i}`]}
                required
                placeholder="e.g. Jan 2020 - Present"
              />
              <Textarea
                label="Responsibilities (comma separated)"
                value={exp.responsibilities.join(", ")}
                onChange={(v: string) => {
                  const updated = [...portfolio.experience!];
                  updated[i].responsibilities = v.split(",").map(s => s.trim());
                  updateField("experience", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`exp-resp-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`exp-resp-${i}`]}
                required
                placeholder="Led team, Developed features, etc."
              />
            </Card>
          ))}
          <AddButton
            onClick={() =>
              updateField("experience", [
                ...(portfolio.experience || []),
                { company: "", position: "", duration: "", responsibilities: [] },
              ])
            }
          />
        </Section>

        {/* ---------- Projects (Optional) ---------- */}
        <Section title="Projects" optional>
          {(portfolio.projects || []).map((proj, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Project #{i + 1}
                </span>
                <button
                  onClick={() => {
                    const updated = portfolio.projects!.filter((_, idx) => idx !== i);
                    updateField("projects", updated);
                  }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Title"
                value={proj.title}
                onChange={(v: string) => {
                  const updated = [...portfolio.projects!];
                  updated[i].title = v;
                  updateField("projects", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`proj-title-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`proj-title-${i}`]}
                required
              />
              <Textarea
                label="Description"
                value={proj.description}
                onChange={(v: string) => {
                  const updated = [...portfolio.projects!];
                  updated[i].description = v;
                  updateField("projects", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`proj-desc-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`proj-desc-${i}`]}
                required
              />
              <Input
                label="Live URL"
                value={proj.liveUrl || ""}
                onChange={(v: string) => {
                  const updated = [...portfolio.projects!];
                  updated[i].liveUrl = v;
                  updateField("projects", updated);
                }}
                placeholder="https://... (optional)"
              />
              <Input
                label="GitHub URL"
                value={proj.githubUrl || ""}
                onChange={(v: string) => {
                  const updated = [...portfolio.projects!];
                  updated[i].githubUrl = v;
                  updateField("projects", updated);
                }}
                placeholder="https://github.com/... (optional)"
              />
              <Input
                label="Tech Stack (comma separated)"
                value={proj.tech.join(", ")}
                onChange={(v: string) => {
                  const updated = [...portfolio.projects!];
                  updated[i].tech = v.split(",").map(s => s.trim());
                  updateField("projects", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`proj-tech-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`proj-tech-${i}`]}
                required
                placeholder="React, Node.js, MongoDB"
              />
            </Card>
          ))}
          <AddButton
            onClick={() =>
              updateField("projects", [
                ...(portfolio.projects || []),
                { title: "", description: "", tech: [] },
              ])
            }
          />
        </Section>

        {/* ---------- Education (Optional) ---------- */}
        <Section title="Education" optional>
          {(portfolio.education || []).map((edu, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Education #{i + 1}
                </span>
                <button
                  onClick={() => {
                    const updated = portfolio.education!.filter((_, idx) => idx !== i);
                    updateField("education", updated);
                  }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(v: string) => {
                  const updated = [...portfolio.education!];
                  updated[i].institution = v;
                  updateField("education", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`edu-inst-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`edu-inst-${i}`]}
                required
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(v: string) => {
                  const updated = [...portfolio.education!];
                  updated[i].degree = v;
                  updateField("education", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`edu-degree-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`edu-degree-${i}`]}
                required
              />
              <Input
                label="Duration"
                value={edu.duration}
                onChange={(v: string) => {
                  const updated = [...portfolio.education!];
                  updated[i].duration = v;
                  updateField("education", updated);
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`edu-duration-${i}`];
                    return newErrors;
                  });
                }}
                error={errors[`edu-duration-${i}`]}
                required
                placeholder="e.g. 2016 - 2020"
              />
            </Card>
          ))}
          <AddButton
            onClick={() =>
              updateField("education", [
                ...(portfolio.education || []),
                { institution: "", degree: "", duration: "" },
              ])
            }
          />
        </Section>

        {/* ---------- Socials (Optional) ---------- */}
        <Section title="Social Links" optional>
          {(portfolio.socials || []).map((social, i) => {
            const key = Object.keys(social)[0] || "";
            return (
              <Card key={i}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Social #{i + 1}
                  </span>
                  <button
                    onClick={() => {
                      const updated = portfolio.socials!.filter((_, idx) => idx !== i);
                      updateField("socials", updated);
                    }}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  label="Platform Name"
                  value={key}
                  onChange={(v: string) => {
                    const updated = [...portfolio.socials!];
                    updated[i] = { [v]: social[key] };
                    updateField("socials", updated);
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors[`social-key-${i}`];
                      return newErrors;
                    });
                  }}
                  error={errors[`social-key-${i}`]}
                  required
                  placeholder="e.g. LinkedIn, GitHub, Twitter"
                />
                <Input
                  label="URL"
                  value={social[key] || ""}
                  onChange={(v: string) => {
                    const updated = [...portfolio.socials!];
                    updated[i] = { [key]: v };
                    updateField("socials", updated);
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors[`social-value-${i}`];
                      return newErrors;
                    });
                  }}
                  error={errors[`social-value-${i}`]}
                  required
                  placeholder="https://..."
                />
              </Card>
            );
          })}
          <AddButton
            onClick={() =>
              updateField("socials", [...(portfolio.socials || []), { "": "" }])
            }
          />
        </Section>

        {/* ---------- Skills (Optional) ---------- */}
        <Section title="Skills" optional>
          {(portfolio.skills || []).map((skill, i) => {
            const key = Object.keys(skill)[0] || "";
            return (
              <Card key={i}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Skill #{i + 1}
                  </span>
                  <button
                    onClick={() => {
                      const updated = portfolio.skills!.filter((_, idx) => idx !== i);
                      updateField("skills", updated);
                    }}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  label="Skill Name"
                  value={key}
                  onChange={(v: string) => {
                    const updated = [...portfolio.skills!];
                    updated[i] = { [v]: skill[key] };
                    updateField("skills", updated);
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors[`skill-key-${i}`];
                      return newErrors;
                    });
                  }}
                  error={errors[`skill-key-${i}`]}
                  required
                  placeholder="e.g. JavaScript, Python"
                />
                <Input
                  label="Proficiency (0–5)"
                  type="number"
                  value={skill[key] || 0}
                  onChange={(v: string) => {
                    const updated = [...portfolio.skills!];
                    updated[i] = { [key]: Number(v) };
                    updateField("skills", updated);
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors[`skill-value-${i}`];
                      return newErrors;
                    });
                  }}
                  error={errors[`skill-value-${i}`]}
                  required
                  placeholder="0-5"
                />
              </Card>
            );
          })}
          <AddButton
            onClick={() =>
              updateField("skills", [...(portfolio.skills || []), { "": 0 }])
            }
          />
        </Section>

        {/* ---------- Actions ---------- */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl border hover:bg-muted transition"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable UI ---------- */

function Section({
  title,
  children,
  required,
  optional,
}: {
  title: string;
  children: any;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {required && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-medium">
            Required
          </span>
        )}
        {optional && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium">
            Optional
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function Card({ children }: any) {
  return (
    <div className="p-4 rounded-xl border bg-muted/30 space-y-3">{children}</div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  error,
  required,
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border bg-background ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border bg-background ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function AddButton({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="text-sm underline text-muted-foreground hover:text-foreground"
    >
      + Add
    </button>
  );
}