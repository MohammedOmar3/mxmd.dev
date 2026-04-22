import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../lib/api';
import type { AdminBlogPostPayload, BlogPost, BlogPostFull } from '../types';
import { markdownComponents } from '../lib/markdownComponents';

// ── Types ─────────────────────────────────────────────────────────────────────

type View = 'list' | 'editor';

interface EditorState {
  id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  tagsRaw: string;
  content: string;
  isDraft: boolean;
}

const EMPTY_EDITOR: EditorState = { id: null, title: '', slug: '', excerpt: '', tagsRaw: '', content: '', isDraft: true };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── API Key Gate ──────────────────────────────────────────────────────────────

function ApiKeyGate({ onKey }: { onKey: (key: string) => void }) {
  const [input, setInput] = useState('');
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase mb-6">
          // ADMIN ACCESS
        </p>
        <form
          onSubmit={e => { e.preventDefault(); if (input.trim()) onKey(input.trim()); }}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="API Key"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full font-mono text-sm border border-gray-300 focus:border-black outline-none px-4 py-3 bg-white"
            autoFocus
          />
          <button
            type="submit"
            className="w-full font-mono text-xs tracking-widest uppercase bg-black text-white py-3 hover:bg-gray-900 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}

// ── Post List ─────────────────────────────────────────────────────────────────

function PostList({
  apiKey,
  onEdit,
  onNew,
}: {
  apiKey: string;
  onEdit: (post: BlogPostFull) => void;
  onNew: () => void;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    api.adminGetAllPosts(apiKey)
      .then(posts => setPosts(posts))
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [apiKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: number) => {
    try {
      await api.adminDeletePost(id, apiKey);
      setPosts(p => p.filter(x => x.id !== id));
      setConfirmDelete(null);
    } catch {
      setError('Delete failed — check your API key.');
    }
  };

  const handleEdit = async (post: BlogPost) => {
    try {
      const full = await api.adminGetPost(post.id, apiKey);
      onEdit(full);
    } catch {
      setError('Could not load post content.');
    }
  };

  if (loading) return (
    <div className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full space-y-3 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-100" />)}
    </div>
  );

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full pb-20">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
          // POSTS ({posts.length})
        </p>
        <button
          onClick={onNew}
          className="font-mono text-xs tracking-widest uppercase bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors"
        >
          + New Post
        </button>
      </div>

      {error && (
        <p className="font-mono text-xs text-red-500 mb-6">{error}</p>
      )}

      {posts.length === 0 && (
        <p className="font-mono text-sm text-gray-400">No posts yet.</p>
      )}

      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {posts.map(post => (
          <div key={post.id} className="flex items-center justify-between py-4 gap-4">
            <div className="min-w-0 flex items-center gap-2">
              <div>
                <p className="font-mono text-sm font-medium text-black truncate">{post.title}</p>
                <p className="font-mono text-[10px] text-gray-400 mt-0.5">
                  {post.slug} · {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
              {post.isDraft && (
                <span className="font-mono text-[9px] tracking-widest uppercase border border-gray-300 text-gray-400 px-1.5 py-0.5 shrink-0">
                  draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {confirmDelete === post.id ? (
                <>
                  <span className="font-mono text-[10px] text-gray-500">sure?</span>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="font-mono text-[10px] text-red-500 hover:text-red-700 uppercase tracking-widest"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest"
                  >
                    No
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(post)}
                    className="font-mono text-[10px] text-gray-500 hover:text-black uppercase tracking-widest transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(post.id)}
                    className="font-mono text-[10px] text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ── Toolbar ───────────────────────────────────────────────────────────────────

function insertAtCursor(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  setter: (v: string) => void,
  before: string,
  after = '',
) {
  const el = ref.current;
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = el.value.slice(start, end);
  const newVal = el.value.slice(0, start) + before + selected + after + el.value.slice(end);
  setter(newVal);
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + selected.length);
  });
}

function Toolbar({ taRef, setContent }: { taRef: React.RefObject<HTMLTextAreaElement | null>; setContent: (v: string) => void }) {
  const ins = (b: string, a = '') => insertAtCursor(taRef, setContent, b, a);
  const insertImage = () => {
    const url = window.prompt('Image URL:');
    if (url) ins(`![image](${url})`);
  };

  const tools: { label: string; title: string; action: () => void }[] = [
    { label: 'B', title: 'Bold', action: () => ins('**', '**') },
    { label: 'I', title: 'Italic', action: () => ins('_', '_') },
    { label: 'H2', title: 'Heading 2', action: () => ins('\n## ', '') },
    { label: 'H3', title: 'Heading 3', action: () => ins('\n### ', '') },
    { label: '`', title: 'Inline code', action: () => ins('`', '`') },
    { label: '```', title: 'Code block', action: () => ins('\n```language\n', '\n```\n') },
    { label: '>"', title: 'Blockquote', action: () => ins('\n> ', '') },
    { label: '—', title: 'Divider', action: () => ins('\n---\n', '') },
    { label: '⬡', title: 'Image', action: insertImage },
  ];

  return (
    <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
      {tools.map(t => (
        <button
          key={t.label}
          type="button"
          title={t.title}
          onClick={t.action}
          className="font-mono text-[10px] px-2 py-1 border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors bg-white"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Post Editor ───────────────────────────────────────────────────────────────

function PostEditor({
  initial,
  apiKey,
  onBack,
}: {
  initial: EditorState;
  apiKey: string;
  onBack: () => void;
}) {
  const [state, setState] = useState<EditorState>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const set = <K extends keyof EditorState>(key: K, val: EditorState[K]) =>
    setState(s => ({ ...s, [key]: val }));

  const handleTitleChange = (v: string) => {
    setState(s => ({ ...s, title: v, slug: s.id === null ? slugify(v) : s.slug }));
  };

  const setContent = (v: string) => set('content', v);

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    if (!state.title.trim() || !state.slug.trim() || !state.content.trim()) {
      setError('Title, slug, and content are required.');
      return;
    }
    const payload: AdminBlogPostPayload = {
      title: state.title.trim(),
      slug: state.slug.trim(),
      excerpt: state.excerpt.trim(),
      content: state.content,
      tags: state.tagsRaw.split(',').map(t => t.trim()).filter(Boolean),
      isDraft: state.isDraft,
    };
    setSaving(true);
    try {
      if (state.id === null) {
        await api.adminCreatePost(payload, apiKey);
      } else {
        await api.adminUpdatePost(state.id, payload, apiKey);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed.';
      if (msg.includes('401') || msg.includes('403')) {
        setError('Unauthorised — wrong API key?');
      } else if (msg.includes('409')) {
        setError('A post with this slug already exists.');
      } else {
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col max-w-screen-xl mx-auto px-4 py-8 w-full pb-20">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
        >
          ← All Posts
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreview(p => !p)}
            className="font-mono text-[10px] tracking-widest uppercase border border-gray-300 px-3 py-1.5 hover:border-black transition-colors"
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={state.isDraft}
              onChange={e => set('isDraft', e.target.checked)}
              className="accent-black h-3.5 w-3.5"
            />
            <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500">Draft</span>
          </label>
          {error && <span className="font-mono text-[10px] text-red-500">{error}</span>}
          {success && <span className="font-mono text-[10px] text-[#39FF14]">Saved ✓</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs tracking-widest uppercase bg-black text-white px-5 py-2 hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : state.isDraft ? 'Save Draft' : state.id === null ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>

      {/* Meta fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={e => handleTitleChange(e.target.value)}
          className="font-mono text-sm border border-gray-200 focus:border-black outline-none px-4 py-2.5 bg-white"
        />
        <input
          type="text"
          placeholder="slug (auto-generated)"
          value={state.slug}
          onChange={e => set('slug', e.target.value)}
          className="font-mono text-sm border border-gray-200 focus:border-black outline-none px-4 py-2.5 bg-white text-gray-500"
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={state.excerpt}
          onChange={e => set('excerpt', e.target.value)}
          className="font-mono text-sm border border-gray-200 focus:border-black outline-none px-4 py-2.5 bg-white sm:col-span-2"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated: .NET, Azure, SQL)"
          value={state.tagsRaw}
          onChange={e => set('tagsRaw', e.target.value)}
          className="font-mono text-sm border border-gray-200 focus:border-black outline-none px-4 py-2.5 bg-white sm:col-span-2"
        />
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="flex-1 border border-gray-200 p-6 overflow-y-auto min-h-[500px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {state.content || '_Nothing to preview yet._'}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex-1 border border-gray-200 flex flex-col min-h-[500px]">
          <Toolbar taRef={taRef} setContent={setContent} />
          <textarea
            ref={taRef}
            value={state.content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your post in markdown..."
            className="flex-1 font-mono text-sm p-4 outline-none resize-none bg-white leading-7 min-h-[500px]"
            spellCheck={false}
          />
        </div>
      )}
    </main>
  );
}

// ── Root Admin Page ───────────────────────────────────────────────────────────

export function Admin() {
  const [apiKey, setApiKey] = useState<string | null>(() => sessionStorage.getItem('adminKey'));
  const [view, setView] = useState<View>('list');
  const [editing, setEditing] = useState<EditorState>(EMPTY_EDITOR);

  const handleKey = (key: string) => {
    sessionStorage.setItem('adminKey', key);
    setApiKey(key);
  };

  const handleEdit = (post: BlogPostFull) => {
    setEditing({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      tagsRaw: post.tags.join(', '),
      content: post.content,
      isDraft: post.isDraft ?? false,
    });
    setView('editor');
  };

  const handleNew = () => {
    setEditing(EMPTY_EDITOR);
    setView('editor');
  };

  const handleBack = () => setView('list');

  if (!apiKey) return <ApiKeyGate onKey={handleKey} />;

  if (view === 'editor') {
    return <PostEditor initial={editing} apiKey={apiKey} onBack={handleBack} />;
  }

  return <PostList apiKey={apiKey} onEdit={handleEdit} onNew={handleNew} />;
}
