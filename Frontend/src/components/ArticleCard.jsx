import React from 'react';
import {
  FaRegBookmark,
  FaBookmark,
  FaShareAlt,
  FaEye,
  FaClock,
  FaExternalLinkAlt,
  FaStar,
} from 'react-icons/fa';

function formatDate(date) {
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}d ago`;
    return d.toLocaleDateString();
  } catch {
    return '';
  }
}

function readingTime(text) {
  if (!text) return '1 min read';
  const words = String(text).trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function scoreRingColor(score) {
  if (score == null) return 'ring-gray-300 text-gray-600';
  if (score >= 80) return 'ring-green-500 text-green-700';
  if (score >= 60) return 'ring-yellow-500 text-yellow-700';
  if (score >= 40) return 'ring-orange-500 text-orange-700';
  return 'ring-red-500 text-red-700';
}

export default function ArticleCard({
  title,
  summary,
  imageUrl,
  href,
  sourceName,
  author,
  publishedAt,
  tags = [],
  reliabilityScore = null,
  views,
  isBookmarked = false,
  onBookmarkToggle,
  onShare,
}) {
  const handleBookmark = (e) => {
    e.preventDefault();
    onBookmarkToggle && onBookmarkToggle();
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (onShare) return onShare();
    try {
      if (navigator.share) {
        await navigator.share({ title, text: summary, url: href });
      } else if (href) {
        await navigator.clipboard.writeText(href);
        // optional: toast here
      }
    } catch (_) {}
  };

  return (
    <a href={href || '#'} target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined} className="block">
      <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Media */}
        {imageUrl ? (
          <div className="relative aspect-[16/9] bg-gray-100">
            <img src={imageUrl} alt={title || 'article image'} className="absolute inset-0 w-full h-full object-cover" />
            {reliabilityScore != null && (
              <div className="absolute top-3 left-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 ring-2 ${scoreRingColor(reliabilityScore)}`}>
                  <span className="text-xs font-semibold">{Math.round(reliabilityScore)}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-gray-100 h-40 flex items-center justify-center">
            {reliabilityScore != null && (
              <div className="absolute top-3 left-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 ring-2 ${scoreRingColor(reliabilityScore)}`}>
                  <span className="text-xs font-semibold">{Math.round(reliabilityScore)}</span>
                </div>
              </div>
            )}
            <FaExternalLinkAlt className="text-gray-400" />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Meta */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {sourceName && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  <FaStar className="text-amber-400" />
                  {sourceName}
                </span>
              )}
              {author && <span className="truncate">by {author}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleShare} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Share">
                <FaShareAlt />
              </button>
              <button onClick={handleBookmark} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Bookmark">
                {isBookmarked ? <FaBookmark className="text-blue-600" /> : <FaRegBookmark />}
              </button>
            </div>
          </div>

          {/* Title */}
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
              {title}
            </h3>
          )}

          {/* Summary */}
          {summary && (
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
              {summary}
            </p>
          )}

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 5).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">#{tag}</span>
              ))}
              {tags.length > 5 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">+{tags.length - 5}</span>
              )}
            </div>
          )}

          {/* Footer Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              {publishedAt && <span>{formatDate(publishedAt)}</span>}
              <span className="inline-flex items-center gap-1">
                <FaClock /> {readingTime(`${title} ${summary}`)}
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <FaEye /> {views ? Intl.NumberFormat('en', { notation: 'compact' }).format(views) : 0}
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
