"use client";

import React, { useState, useEffect } from "react";
import {
  getStoredPortfolioState,
  savePortfolioState,
  FullPortfolioState,
} from "@/lib/firebase";

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("header");

  const [state, setState] = useState<FullPortfolioState | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadedState = getStoredPortfolioState();
    setState(loadedState);

    const savedAuth = sessionStorage.getItem("rafsan_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "rafsan1") {
      setIsAuthenticated(true);
      sessionStorage.setItem("rafsan_admin_auth", "true");
      setError("");
    } else {
      setError("Incorrect password! Hint: rafsan1");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (state) {
      savePortfolioState(state);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (!isAuthenticated || !state) {
    return (
      <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex items-center justify-center px-6 font-['Google_Sans',sans-serif]">
        <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block p-3.5 bg-red-50 text-red-600 rounded-2xl border border-red-100 mb-3 text-xl font-bold">
              🔒
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs mt-1">Portfolio Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md shadow-red-600/20"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-4">
            <a href="/" className="text-xs text-red-600 hover:underline font-medium">
              ← Return to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  const navMenuItems = [
    { id: "header", label: "Navigation & Homebar" },
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About & Bio" },
    { id: "expertise", label: "My Expertise" },
    { id: "skills", label: "Skills & Tools (4 Cards)" },
    { id: "projects", label: "Projects Manager (Full)" },
    { id: "certifications", label: "Certifications Manager" },
    { id: "contact", label: "Contact & Links" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 font-['Google_Sans',sans-serif] flex flex-col md:flex-row">
      
      {/* Left Sidebar Menu */}
      <aside className="w-full md:w-72 md:h-screen md:sticky md:top-0 overflow-y-auto bg-white border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white shadow-md">
              R
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Rafsan Admin</h2>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                ● Dynamic Live Sync Active
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-xs md:text-sm font-medium transition-all text-left ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col gap-2.5 mt-8">
          <a
            href="/"
            className="w-full py-2.5 text-center text-xs font-medium bg-gray-100 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-200 transition-colors"
          >
            ← View Main Site
          </a>
          <button
            onClick={() => {
              sessionStorage.removeItem("rafsan_admin_auth");
              setIsAuthenticated(false);
            }}
            className="w-full py-2.5 text-center text-xs font-medium bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Right Content Workspace Area */}
      <main className="flex-1 min-h-screen p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {saveSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center gap-3">
              <span>✓</span>
              <span>Changes saved & main website updated live!</span>
            </div>
          )}

          {/* TAB 1: NAVIGATION & HOMEBAR */}
          {activeTab === "header" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Homebar & Navbar Manager
                </h2>
                <p className="text-gray-500 text-xs">
                  Active/Inactive toggle status & custom label names for each section on the top navbar.
                </p>
              </div>

              <div className="p-6 bg-red-50/40 border border-red-100 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider font-mono mb-4">
                  Homebar Sections Active/Inactive & Name Controls
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {state.sectionsConfig.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="p-4 bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${sec.isActive ? "bg-emerald-500" : "bg-gray-300"}`} />
                        <div>
                          <span className="text-xs font-mono uppercase text-gray-400 font-bold">Section ID: {sec.id}</span>
                          <div className="text-sm font-bold text-gray-900">{sec.navLabel}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={sec.navLabel}
                          onChange={(e) => {
                            const newSections = [...state.sectionsConfig];
                            newSections[idx].navLabel = e.target.value;
                            setState({ ...state, sectionsConfig: newSections });
                          }}
                          placeholder="Homebar Name..."
                          className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 font-medium focus:outline-none focus:border-red-600"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const newSections = [...state.sectionsConfig];
                            newSections[idx].isActive = !newSections[idx].isActive;
                            setState({ ...state, sectionsConfig: newSections });
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            sec.isActive
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {sec.isActive ? "Active" : "Inactive"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                      Logo First Name (Bold)
                    </label>
                    <input
                      type="text"
                      value={state.navData.logoFirstName}
                      onChange={(e) =>
                        setState({ ...state, navData: { ...state.navData, logoFirstName: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                      Logo Last Name (Regular)
                    </label>
                    <input
                      type="text"
                      value={state.navData.logoLastName}
                      onChange={(e) =>
                        setState({ ...state, navData: { ...state.navData, logoLastName: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Resume Drive Link
                  </label>
                  <input
                    type="url"
                    value={state.navData.resumeLink}
                    onChange={(e) =>
                      setState({ ...state, navData: { ...state.navData, resumeLink: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save Navigation Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: HERO SECTION */}
          {activeTab === "hero" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Hero Section Settings
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Edit title lines, subtitle text, and active status.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setState({ ...state, heroData: { ...state.heroData, isActive: !state.heroData.isActive } })
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    state.heroData.isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {state.heroData.isActive ? "Section Active" : "Section Inactive"}
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Hero Title Line 1
                  </label>
                  <input
                    type="text"
                    value={state.heroData.titleLine1}
                    onChange={(e) =>
                      setState({ ...state, heroData: { ...state.heroData, titleLine1: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Hero Title Line 2
                  </label>
                  <input
                    type="text"
                    value={state.heroData.titleLine2}
                    onChange={(e) =>
                      setState({ ...state, heroData: { ...state.heroData, titleLine2: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Hero Subtitle Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={state.heroData.subtitle}
                    onChange={(e) =>
                      setState({ ...state, heroData: { ...state.heroData, subtitle: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save Hero Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ABOUT SECTION */}
          {activeTab === "about" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                About & Bio Settings
              </h2>
              <p className="text-gray-500 text-xs mb-8">
                Edit personal bio paragraph, name tag, and role title.
              </p>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={state.personalInfo.name}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, name: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Role Headline
                  </label>
                  <input
                    type="text"
                    value={state.personalInfo.role}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, role: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Bio Description
                  </label>
                  <textarea
                    rows={3}
                    value={state.personalInfo.bio}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, bio: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save About Info
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: MY EXPERTISE */}
          {activeTab === "expertise" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    My Expertise Editor
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Edit header titles and individual card active/inactive statuses.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setState({
                      ...state,
                      expertiseData: { ...state.expertiseData, isActive: !state.expertiseData.isActive },
                    })
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    state.expertiseData.isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {state.expertiseData.isActive ? "Section Active" : "Section Inactive"}
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider font-mono">
                    1. Section Header & Title
                  </h3>

                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={state.expertiseData.sectionBadge}
                      onChange={(e) =>
                        setState({
                          ...state,
                          expertiseData: { ...state.expertiseData, sectionBadge: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                      Section Title (Typewriter Text)
                    </label>
                    <input
                      type="text"
                      value={state.expertiseData.sectionTitle}
                      onChange={(e) =>
                        setState({
                          ...state,
                          expertiseData: { ...state.expertiseData, sectionTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                      Section Subtitle Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={state.expertiseData.sectionSubtitle}
                      onChange={(e) =>
                        setState({
                          ...state,
                          expertiseData: { ...state.expertiseData, sectionSubtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono">
                    2. Milestone Cards Active/Inactive & Text Controls
                  </h3>

                  {state.expertiseData.cards.map((card, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-red-600 font-bold">
                          Card {card.number} Controls
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            const newCards = [...state.expertiseData.cards];
                            newCards[idx].isActive = !newCards[idx].isActive;
                            setState({
                              ...state,
                              expertiseData: { ...state.expertiseData, cards: newCards },
                            });
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                            card.isActive
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {card.isActive ? "Active" : "Inactive"}
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const newCards = [...state.expertiseData.cards];
                            newCards[idx].title = e.target.value;
                            setState({
                              ...state,
                              expertiseData: { ...state.expertiseData, cards: newCards },
                            });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Card Description Text
                        </label>
                        <textarea
                          rows={3}
                          value={card.description}
                          onChange={(e) => {
                            const newCards = [...state.expertiseData.cards];
                            newCards[idx].description = e.target.value;
                            setState({
                              ...state,
                              expertiseData: { ...state.expertiseData, cards: newCards },
                            });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save All Expertise Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SKILLS & TOOLS */}
          {activeTab === "skills" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Skills & Technical Stack (4 Cards Editor)
              </h2>
              <p className="text-gray-500 text-xs mb-8">
                Edit category title, description, skills list pills, and active status for all 4 cards.
              </p>

              <form onSubmit={handleSave} className="space-y-8">
                {state.skillCardsData.map((card, idx) => (
                  <div key={card.id} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-mono text-red-600 font-bold uppercase">
                        Card {idx + 1}: {card.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const newSkillCards = [...state.skillCardsData];
                          newSkillCards[idx].isActive = !newSkillCards[idx].isActive;
                          setState({ ...state, skillCardsData: newSkillCards });
                        }}
                        className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          card.isActive
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {card.isActive ? "Card Active" : "Card Inactive"}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Category Title
                      </label>
                      <input
                        type="text"
                        value={card.category}
                        onChange={(e) => {
                          const newSkillCards = [...state.skillCardsData];
                          newSkillCards[idx].category = e.target.value;
                          setState({ ...state, skillCardsData: newSkillCards });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 font-bold uppercase font-['Montserrat',sans-serif]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Subtitle / Description Paragraph
                      </label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={(e) => {
                          const newSkillCards = [...state.skillCardsData];
                          newSkillCards[idx].description = e.target.value;
                          setState({ ...state, skillCardsData: newSkillCards });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Skill Tech Pills (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={card.skillsText}
                        onChange={(e) => {
                          const newSkillCards = [...state.skillCardsData];
                          newSkillCards[idx].skillsText = e.target.value;
                          setState({ ...state, skillCardsData: newSkillCards });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Background Video Settings (Card 4 Cloud Only) */}
                    {card.id === "cloud" && (
                      <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-4">
                        <span className="text-xs font-mono text-purple-700 font-bold uppercase block">
                          Background Video (Card 4 Cloud Only)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-gray-500 mb-1">
                              Background Video URL (MP4 Link)
                            </label>
                            <input
                              type="text"
                              value={card.videoUrl || ""}
                              onChange={(e) => {
                                const newSkillCards = [...state.skillCardsData];
                                newSkillCards[idx].videoUrl = e.target.value;
                                setState({ ...state, skillCardsData: newSkillCards });
                              }}
                              placeholder="https://example.com/video.mp4"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-purple-600"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-gray-500 mb-1">
                              Or Upload Local MP4 File
                            </label>
                            <input
                              type="file"
                              accept="video/mp4"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target?.result;
                                    if (typeof result === "string") {
                                      const newSkillCards = [...state.skillCardsData];
                                      newSkillCards[idx].videoUrl = result;
                                      setState({ ...state, skillCardsData: newSkillCards });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save All 4 Skill Cards
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Projects Manager (Full Everything Editor)
              </h2>
              <p className="text-gray-500 text-xs mb-8">
                Edit Title, Subtitle, Description, Features, Image URL, Tech Stack Pills, Live Project Demo Link, and Active Status for each project card!
              </p>

              <form onSubmit={handleSave} className="space-y-8">
                {state.projectsData.map((proj, idx) => (
                  <div key={proj.id} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-5">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-xs font-mono text-red-600 font-bold uppercase">
                        Project {idx + 1}: {proj.title}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].isActive = !newProjs[idx].isActive;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          proj.isActive
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {proj.isActive ? "Project Active" : "Project Inactive"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Project Subtitle Tag
                        </label>
                        <input
                          type="text"
                          value={proj.subtitle}
                          onChange={(e) => {
                            const newProjs = [...state.projectsData];
                            newProjs[idx].subtitle = e.target.value;
                            setState({ ...state, projectsData: newProjs });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono text-red-600 focus:outline-none focus:border-red-600 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Project Main Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const newProjs = [...state.projectsData];
                            newProjs[idx].title = e.target.value;
                            setState({ ...state, projectsData: newProjs });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Project Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].description = e.target.value;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Project Card Image URL
                      </label>
                      <input
                        type="url"
                        value={proj.image}
                        onChange={(e) => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].image = e.target.value;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Live Project Demo Button URL
                      </label>
                      <input
                        type="url"
                        value={proj.link}
                        onChange={(e) => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].link = e.target.value;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono focus:outline-none focus:border-red-600 text-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Tech Stack Pills (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].tech = e.target.value;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Key Highlights / Features (Comma Separated)
                      </label>
                      <textarea
                        rows={2}
                        value={proj.features}
                        onChange={(e) => {
                          const newProjs = [...state.projectsData];
                          newProjs[idx].features = e.target.value;
                          setState({ ...state, projectsData: newProjs });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save All Projects Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: CERTIFICATIONS MANAGER */}
          {activeTab === "certifications" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Certifications Manager (Active/Inactive & Edit)
              </h2>
              <p className="text-gray-500 text-xs mb-8">
                Edit Certification Title, Issuing Organization, Description, Badge Link, and Active/Inactive status.
              </p>

              <form onSubmit={handleSave} className="space-y-8">
                {state.certificationsData.map((cert, idx) => (
                  <div key={cert.id} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-mono text-red-600 font-bold uppercase">
                        Certification {idx + 1}: {cert.title}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const newCerts = [...state.certificationsData];
                          newCerts[idx].isActive = !newCerts[idx].isActive;
                          setState({ ...state, certificationsData: newCerts });
                        }}
                        className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          cert.isActive
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {cert.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Certification Title
                        </label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const newCerts = [...state.certificationsData];
                            newCerts[idx].title = e.target.value;
                            setState({ ...state, certificationsData: newCerts });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          value={cert.organization}
                          onChange={(e) => {
                            const newCerts = [...state.certificationsData];
                            newCerts[idx].organization = e.target.value;
                            setState({ ...state, certificationsData: newCerts });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono text-red-600 focus:outline-none focus:border-red-600 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        Credential Description
                      </label>
                      <textarea
                        rows={2}
                        value={cert.description}
                        onChange={(e) => {
                          const newCerts = [...state.certificationsData];
                          newCerts[idx].description = e.target.value;
                          setState({ ...state, certificationsData: newCerts });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-gray-500 mb-1">
                        View Badge Link URL
                      </label>
                      <input
                        type="url"
                        value={cert.link}
                        onChange={(e) => {
                          const newCerts = [...state.certificationsData];
                          newCerts[idx].link = e.target.value;
                          setState({ ...state, certificationsData: newCerts });
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs font-mono focus:outline-none focus:border-red-600 text-blue-600"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save Certifications Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 8: CONTACT & LINKS */}
          {activeTab === "contact" && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Contact Info & Links
              </h2>
              <p className="text-gray-500 text-xs mb-8">
                Edit contact email and social profile links.
              </p>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={state.personalInfo.email}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, email: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={state.personalInfo.github}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, github: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={state.personalInfo.linkedin}
                    onChange={(e) =>
                      setState({ ...state, personalInfo: { ...state.personalInfo, linkedin: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                  >
                    Save Contact Links
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
