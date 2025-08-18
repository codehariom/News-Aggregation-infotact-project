import React from 'react';

const ArticleCard = ({ article, onClick }) => {
  // Demo data fallback if no article is provided
  const demoArticle = {
    title: 'Sample Article Title',
    description: 'This is a sample article description that demonstrates how the ArticleCard component looks with content. It includes enough text to show the layout and styling.',
    source: 'Demo Source',
    publishedAt: new Date().toISOString(),
    readTime: '3 min read',
    sourceUrl: 'https://example.com'
  };

  // Use provided article or fallback to demo data
  const displayArticle = article || demoArticle;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(displayArticle);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {displayArticle.source}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(displayArticle.publishedAt)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {displayArticle.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {displayArticle.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {displayArticle.readTime}
          </span>
          <button 
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              if (displayArticle.sourceUrl) {
                window.open(displayArticle.sourceUrl, '_blank');
              }
            }}
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
