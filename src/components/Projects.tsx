import { useState, useEffect } from 'react';
import { FolderGit2, ArrowUpRight, Github, X, Terminal, Copy, Check, Star, GitFork, Eye } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';
import { ProjectSkeleton } from './SkeletonLoader';

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
}

const FALLBACK_STATS: Record<string, RepoStats> = {
  "network-client-monitor": { stars: 12, forks: 4, watchers: 5 },
  "ghost-trace-research": { stars: 24, forks: 8, watchers: 14 },
  "php-secure-login": { stars: 18, forks: 5, watchers: 8 },
  "wifi-security-toolkit": { stars: 32, forks: 11, watchers: 19 },
  "ctf-automation-scripts": { stars: 15, forks: 3, watchers: 6 },
  "web-vulnerability-scanner": { stars: 28, forks: 7, watchers: 11 },
};

interface ProjectStatsProps {
  projectId: string;
  githubUrl: string;
}

function ProjectStats({ projectId, githubUrl }: ProjectStatsProps) {
  const defaultStats = FALLBACK_STATS[projectId] || { stars: 10, forks: 3, watchers: 5 };
  const [stats, setStats] = useState<RepoStats>(defaultStats);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;

    const owner = match[1];
    const repo = match[2];

    const cacheKey = `gh-stats-${projectId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Cache for 1 hour
        if (Date.now() - parsed.timestamp < 3600000) {
          setStats(parsed.data);
          setIsLive(true);
          return;
        }
      } catch (e) {
        // ignore
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      if (active) controller.abort();
    }, 4000);

    fetch(`https://api.github.com/repos/${owner}/${repo}`, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('API limit or Repo dynamic status check failed');
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        const fetched = {
          stars: data.stargazers_count ?? defaultStats.stars,
          forks: data.forks_count ?? defaultStats.forks,
          watchers: data.watchers_count ?? defaultStats.watchers,
        };
        setStats(fetched);
        setIsLive(true);
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: fetched
        }));
      })
      .catch(() => {
        clearTimeout(timeoutId);
        if (!active) return;
        setStats(defaultStats);
        setIsLive(false);
      });

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [projectId, githubUrl]);

  return (
    <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a] mt-3 font-mono text-[10px]">
      <div className="flex items-center space-x-4">
        {/* Stars */}
        <div className="flex items-center space-x-1" title="GitHub Stars">
          <Star className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#F27D26]/70 transition-colors" />
          <span className="text-neutral-400 font-semibold">{stats.stars}</span>
        </div>
        {/* Forks */}
        <div className="flex items-center space-x-1" title="GitHub Forks">
          <GitFork className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#F27D26]/70 transition-colors" />
          <span className="text-neutral-400 font-semibold">{stats.forks}</span>
        </div>
        {/* Watchers */}
        <div className="flex items-center space-x-1" title="Watchers">
          <Eye className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#F27D26]/70 transition-colors" />
          <span className="text-neutral-400 font-semibold">{stats.watchers}</span>
        </div>
      </div>

      {/* Connection Handshake indicator */}
      <span className={`text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded flex items-center space-x-1 ${
        isLive 
          ? 'text-emerald-500/80 bg-emerald-500/5 border border-emerald-500/15' 
          : 'text-neutral-600 bg-neutral-900/40 border border-[#222]'
      }`}>
        <span className={`w-1 h-1 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`}></span>
        <span>{isLive ? 'Live API' : 'Static'}</span>
      </span>
    </div>
  );
}

interface ProjectsProps {
  isLoading?: boolean;
}

export default function Projects({ isLoading = false }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'security' | 'ai' | 'dev'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const copyCodeToClipboard = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="projects" className="py-24 bg-[#080808] relative overflow-hidden editorial-grid border-b border-[#222]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
              <FolderGit2 className="w-3.5 h-3.5 text-[#F27D26]" />
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Project Inventory</span>
            </div>
            <h2 className="editorial-title text-3xl sm:text-4xl text-white uppercase select-none">
              Featured Security & AI Systems
            </h2>
            <p className="text-neutral-400 font-serif italic text-sm max-w-xl">
              Audited software built to investigate passive OSINT directories, handle thread allocations, filter packet payloads, and train neural networks.
            </p>
          </div>

          {/* Filter Categories tabbed switcher */}
          <div className="flex flex-wrap gap-2 text-xs font-mono bg-[#0c0c0c] p-1.5 border border-[#222] rounded self-start">
            {(['all', 'security', 'ai', 'dev'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer uppercase tracking-wider font-bold text-[10px] ${
                  filter === cat
                    ? 'bg-[#F27D26] text-black font-extrabold'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                {cat === 'all' 
                  ? 'All Repos' 
                  : cat === 'security' 
                    ? 'Cybersecurity' 
                    : cat === 'ai' 
                      ? 'AI Models' 
                      : 'Automation/Dev'}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="flex flex-col bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/40 hover:bg-[#111] rounded overflow-hidden transition-all duration-300 relative group cursor-pointer"
              >
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Header tag and index indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 bg-[#111] text-[#F27D26] border border-[#222] rounded uppercase">
                      {project.category.toUpperCase()}
                    </span>
                    
                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest font-bold">
                      ID: {project.id.slice(0, 8)}
                    </span>
                  </div>

                  {/* Info Text */}
                  <div className="space-y-2">
                    <h3 className="font-mono text-sm tracking-wider uppercase text-white group-hover:text-[#F27D26] transition-colors leading-normal">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-xs font-sans leading-relaxed line-clamp-3 pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Visual Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#080808] text-neutral-450 border border-[#222] rounded text-[9px] font-mono uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-[#111] text-neutral-500 rounded text-[9px] font-mono uppercase tracking-wider">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Dynamic GitHub stats row */}
                  <ProjectStats projectId={project.id} githubUrl={project.githubUrl} />

                </div>

                {/* Action trigger footer bar */}
                <div className="px-6 py-3.5 bg-[#111] border-t border-[#222] flex justify-between items-center text-[10px] font-mono text-neutral-500 group-hover:text-[#F27D26] transition-colors uppercase tracking-widest">
                  <span>View System Design</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F27D26]" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Technical Deep-Dive Modal Panel */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="bg-[#0c0c0c] border border-[#222] rounded max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-sm relative text-neutral-300">
              
              {/* Header section absolute */}
              <div className="sticky top-0 bg-[#0c0c0c] border-b border-[#222] px-6 py-4 flex justify-between items-center z-10">
                <div className="flex items-center space-x-3">
                  <div className="px-2.5 py-0.5 bg-[#F27D26]/10 border border-[#F27D26]/25 rounded text-xs text-[#F27D26] font-mono font-bold uppercase tracking-wider">
                    {selectedProject.category.toUpperCase()}
                  </div>
                  <h3 className="font-mono text-sm tracking-wider uppercase text-white font-bold">
                    {selectedProject.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 px-3 text-[10px] bg-[#111] hover:bg-[#161616] border border-[#222] hover:border-[#F27D26]/30 text-neutral-400 hover:text-white rounded cursor-pointer flex items-center space-x-1 uppercase font-bold tracking-wider"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>CLOSE</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Description paragraphs */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">SYSTEM OVERVIEW</span>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    {selectedProject.detailDescription}
                  </p>
                </div>

                {/* Key specs row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  {/* Features */}
                  <div className="bg-[#111] border border-[#222] p-4 rounded space-y-2.5">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">CORE FEATURES</span>
                    <ul className="text-xs space-y-2 font-sans text-neutral-300">
                      {selectedProject.keyFeatures.map((feat) => (
                        <li key={feat} className="flex items-start">
                          <span className="text-[#F27D26] mr-2 font-bold font-mono">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture spec */}
                  <div className="bg-[#111] border border-[#222] p-4 rounded flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">SYSTEM ARCHITECTURE</span>
                      <p className="text-xs text-neutral-300 leading-normal font-sans pt-1">
                        {selectedProject.architecture}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-[#0c0c0c] hover:bg-[#161616] border border-[#222] hover:border-[#F27D26]/40 rounded font-mono text-[10px] text-neutral-300 hover:text-white uppercase tracking-wider font-bold transition-all cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5 text-[#F27D26]" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* CLI command demo */}
                {selectedProject.terminalCommandDemo && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">CONSOLE RUN ARGUMENTS</span>
                    <div className="flex items-center justify-between p-3.5 bg-[#111] border border-[#222] rounded">
                      <div className="flex items-center space-x-2 font-mono text-xs text-[#F27D26] overflow-x-auto whitespace-nowrap">
                        <Terminal className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                        <code>{selectedProject.terminalCommandDemo}</code>
                      </div>
                      <button
                        onClick={() => copyCodeToClipboard(selectedProject.terminalCommandDemo)}
                        className="p-1.5 text-neutral-500 hover:text-white cursor-pointer ml-3 bg-[#0c0c0c] border border-[#222] rounded"
                        title="Copy commands"
                      >
                        {copiedSnippet ? <Check className="w-3.5 h-3.5 text-[#F27D26]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Embedded Code Snippet */}
                {selectedProject.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">CORE MODULE SAMPLE</span>
                      <button
                        onClick={() => copyCodeToClipboard(selectedProject.codeSnippet)}
                        className="flex items-center space-x-1 text-[9px] px-2.5 py-1 bg-[#111] hover:bg-[#161616] border border-[#222] rounded font-mono text-neutral-400 hover:text-white uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="w-3 h-3 text-[#F27D26]" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#F27D26]" />
                            <span>COPY CODE</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded border border-[#222] font-mono text-[11px] overflow-x-auto max-h-56 leading-relaxed text-zinc-300">
                      <pre><code>{selectedProject.codeSnippet}</code></pre>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
