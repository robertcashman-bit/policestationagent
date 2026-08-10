'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ChevronLeft, BookOpen, FolderOpen, Search } from 'lucide-react';
import { MODULE_VIEWED_KEY } from '@/components/dashboard/FirstVisitChecklist';

interface Module {
  id: string;
  title: string;
  content: string;
  category: string;
  order_index: number;
}

const CATEGORY_COLORS = [
  'bg-primary/10 text-primary',
  'bg-emerald-50 text-emerald-700',
  'bg-amber-50 text-amber-700',
  'bg-purple-50 text-purple-700',
  'bg-rose-50 text-rose-700',
  'bg-cyan-50 text-cyan-700',
];

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('content_modules')
        .select('*')
        .order('order_index', { ascending: true });

      const seen = new Map<string, Module>();
      const unique: Module[] = [];
      (data || []).forEach((m: Module) => {
        const key = `${m.title}|${m.category}`;
        if (!seen.has(key)) { seen.set(key, m); unique.push(m); }
      });
      setModules(unique);
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const categories = Array.from(new Set(modules.map((m) => m.category)));

  const categoryColorMap = Object.fromEntries(
    categories.map((cat, i) => [cat, CATEGORY_COLORS[i % CATEGORY_COLORS.length]]),
  );

  const filtered = modules.filter((m) => {
    const matchCat = activeCategory === 'all' || m.category === activeCategory;
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = categories.reduce<Record<string, Module[]>>((acc, cat) => {
    const items = filtered.filter((m) => m.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  /* ── Module reading view ── */
  if (selectedModule) {
    return (
      <div className="max-w-3xl animate-fade-in space-y-6">
        <button
          onClick={() => setSelectedModule(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to modules
        </button>

        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-7 pt-7 pb-6 border-b border-border">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block ${
                categoryColorMap[selectedModule.category] || 'bg-muted text-muted-foreground'
              }`}
            >
              {selectedModule.category}
            </span>
            <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">
              {selectedModule.title}
            </h1>
          </div>

          <div className="px-7 py-7">
            <div className="prose-clear whitespace-pre-wrap text-foreground leading-relaxed">
              {selectedModule.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Module list view ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">Loading modules…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-fade-in-up">
      {/* Page header */}
      <div className="app-page-header">
        <p className="section-label mb-1.5">Study materials</p>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground mt-1 text-[0.9375rem]">
          Topic-based materials covering every key area of police station work.
        </p>
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Module grid */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-5 h-5 text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-foreground mb-1">No modules found</h2>
          <p className="text-muted-foreground text-sm">
            {search ? 'Try a different search term.' : 'No modules are available yet. Check back soon.'}
          </p>
        </div>
      ) : (
        <div className="space-y-9">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[0.9375rem] font-bold text-foreground">{category}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">
                  {items.length} {items.length === 1 ? 'module' : 'modules'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      localStorage.setItem(MODULE_VIEWED_KEY, '1');
                      setSelectedModule(module);
                    }}
                    className="app-quick-link text-left group flex-col !items-start gap-3"
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="icon-tile-gradient w-9 h-9 flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {module.title}
                        </h3>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 inline-block ${
                            categoryColorMap[module.category] || 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {module.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 w-full">
                      {module.content.substring(0, 160).trim()}
                      {module.content.length > 160 ? '…' : ''}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read module →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
