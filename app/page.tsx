import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import GlowCard from "@/app/components/GlowCard";

export default function Home() {
  const allPosts = getAllPosts();
  
  const resume = allPosts.find((p) => p.type === "resume");
  const projects = allPosts.filter((p) => p.type === "project");
  const blogs = allPosts.filter((p) => p.type === "blog" || !p.type); // Default to blog if no type

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20 relative z-10">
      {/* Hero Section */}
      <section className="hero text-center mb-24 max-w-4xl mx-auto px-6">
        <div className="mb-6 inline-block">
          <span className="py-1 px-3 rounded-full border border-[var(--c)]/30 bg-[var(--c)]/10 text-[var(--c)] text-xs tracking-widest uppercase backdrop-blur-md">
            全栈开发者 · AI 爱好者
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--c)] to-[var(--b)] drop-shadow-[0_0_30px_rgba(36,214,255,0.3)]">
          Sheeplamb<br/>
          <span className="text-2xl md:text-4xl font-light text-white/80 mt-2 block">用代码与 AI 构建未来</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          专注于构建高性能 Web 应用、三维可视化交互以及大语言模型（LLM）应用落地。
          <br className="hidden md:block" />
          <span className="text-[var(--c)]">React</span> · <span className="text-[var(--b)]">Three.js</span> · <span className="text-white">Next.js</span> · <span className="text-[var(--a)]">LangChain</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
           <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--a)] to-[var(--b)] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <Link href={resume ? `/blog/${resume.slug}` : "#"} className="relative px-8 py-3 bg-black rounded-full leading-none flex items-center divide-x divide-gray-600">
                <span className="pr-6 text-gray-100 font-bold tracking-wider group-hover:text-[var(--c)] transition">查看简历</span>
                <span className="pl-6 text-[var(--c)] group-hover:text-white transition">&rarr;</span>
              </Link>
           </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-6xl px-6 mb-24">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-[family-name:var(--font-orbitron)] text-white/90">
            <span className="text-[var(--a)] mr-2">01.</span>
            精选项目
          </h2>
          <span className="text-xs text-gray-500 font-mono">项目集</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block h-full">
              <GlowCard className="h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group hover:border-[var(--c)]/50 transition-all duration-500">
                {p.image && (
                  <div className="project-image h-48 overflow-hidden relative">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                   <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags?.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-[var(--c)] border border-white/10">
                          {tag}
                        </span>
                      ))}
                   </div>
                   <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[var(--c)] transition-colors">{p.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                   <div className="flex items-center text-xs text-gray-500 font-mono">
                      <span>查看项目详情</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform text-[var(--c)]">&rarr;</span>
                   </div>
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning / Blog Section */}
      <section className="w-full max-w-6xl px-6">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-[family-name:var(--font-orbitron)] text-white/90">
            <span className="text-[var(--b)] mr-2">02.</span>
            学习记录
          </h2>
          <span className="text-xs text-gray-500 font-mono">知识库</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((p) => (
            <li key={p.slug} className="group">
              <Link className="block h-full" href={`/blog/${p.slug}`}>
                <GlowCard as="div" className="h-full bg-gradient-to-br from-white/5 via-white/5 to-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[var(--b)]/50 hover:from-[var(--b)]/10 hover:to-[var(--c)]/10 transition-all duration-300">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                         <div className="text-xs font-mono text-[var(--b)] flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-[var(--b)]"></span>
                           {p.date}
                         </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--b)] transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                          {p.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                       {p.tags?.map(tag => (
                          <span key={tag} className="text-[10px] text-gray-500">#{tag}</span>
                       ))}
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
