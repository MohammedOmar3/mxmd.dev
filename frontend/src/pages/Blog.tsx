import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import type { BlogPost } from '../types';
import { BlogPostRow } from '../components/BlogPostRow';
import { Footer } from '../components/Footer';

const PAGE_SIZE = 4;

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      api.getBlogPosts(1, PAGE_SIZE)
        .then((data) => {
          setPosts(data.posts);
          setTotal(data.total);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await api.getBlogPosts(nextPage, PAGE_SIZE);
      setPosts((prev) => [...prev, ...data.posts]);
      setPage(nextPage);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const hasMore = posts.length < total;

  return (
    <>
      <main className="flex-1 px-6 pb-20 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="pt-12 pb-6">
          <h1 className="font-mono text-4xl sm:text-5xl font-bold text-black tracking-wide mb-2">
            The Source Code<span className="text-gray-300">.</span>
          </h1>
          <div className="w-8 h-0.5 bg-black mt-3" />
        </div>

        {/* Post list */}
        <div className="mt-8">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="font-mono text-sm text-gray-400">No posts yet.</p>
          ) : (
            posts.map((post) => <BlogPostRow key={post.id} post={post} />)
          )}
        </div>

        {/* Load more */}
        {!loading && hasMore && (
          <div className="mt-8">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="font-mono text-xs text-[#39FF14] hover:underline underline-offset-4 uppercase tracking-widest font-semibold disabled:text-gray-400 disabled:no-underline"
            >
              {loadingMore ? 'LOADING...' : 'LOAD MORE ENTRIES →'}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
