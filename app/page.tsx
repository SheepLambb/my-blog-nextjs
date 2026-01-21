import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import GlowCard from "@/app/components/GlowCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20 relative z-10">
      {/* Hero Section */}
      <section className="text-center mb-24 max-w-4xl mx-auto px-6">
        <div className="mb-6 inline-block">
          <span className="py-1 px-3 rounded-full border border-[var(--c)]/30 bg-[var(--c)]/10 text-[var(--c)] text-xs tracking-widest uppercase backdrop-blur-md">
            前沿智慧 · 探索未来
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--c)] to-[var(--b)] drop-shadow-[0_0_30px_rgba(36,214,255,0.3)]">
          欢迎来到Sheeplamb的<br/>个人空间！
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          追踪全球前沿科技动态与顶刊科学突破。 
          <br className="hidden md:block" />
          <span className="text-[var(--c)]">Nature</span> · <span className="text-[var(--b)]">Science</span> · <span className="text-white">AI Agents</span> · <span className="text-[var(--a)]">Quantum</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
           <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--a)] to-[var(--b)] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-8 py-3 bg-black rounded-full leading-none flex items-center divide-x divide-gray-600">
                <span className="pr-6 text-gray-100 font-bold tracking-wider group-hover:text-[var(--c)] transition">探索研究</span>
                <span className="pl-6 text-[var(--c)] group-hover:text-white transition">&rarr;</span>
              </button>
           </div>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="w-full max-w-6xl px-6">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-[family-name:var(--font-orbitron)] text-white/90">
            <span className="text-[var(--a)] mr-2">/</span>
            研究日志
          </h2>
          <span className="text-xs text-gray-500 font-mono">GLOBAL SCIENCE NETWORK</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <li key={p.slug} className="group">
              <Link className="block h-full" href={`/blog/${p.slug}`}>
                <GlowCard as="div" className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[var(--c)]/50 transition-all duration-300">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                         <div className="text-xs font-mono text-[var(--c)] flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-[var(--c)] animate-pulse"></span>
                           {p.date}
                         </div>
                         {/* Auto-tag based on keywords in title/desc (Simulated) */}
                         <div className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-400">
                           {p.title.includes("Alpha") || p.title.includes("GPT") ? "AI RESEARCH" : 
                            p.title.includes("Nature") || p.title.includes("Cell") ? "TOP JOURNAL" : "FRONTIER TECH"}
                         </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--c)] transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {p.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 flex items-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-wider">
                      Read Protocol &gt;&gt;
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
