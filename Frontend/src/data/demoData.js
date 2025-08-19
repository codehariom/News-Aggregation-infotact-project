// Demo data for the News Aggregation platform
// This file contains sample data that can be used when the API is not available

export const demoArticles = [
  {
    _id: 'demo1',
    title: 'AI Breakthrough: New Language Model Shows Human-Level Understanding',
    source: 'TechDaily',
    category: 'Technology',
    createdAt: '2024-01-15T10:30:00Z',
    reliabilityScore: 95,
    summary: 'Researchers have developed a new AI model that demonstrates unprecedented understanding of human language and context. This breakthrough could revolutionize how we interact with technology and open new possibilities in natural language processing.',
    content: 'A groundbreaking development in artificial intelligence has been achieved by researchers at Stanford University...',
    sourceUrl: 'https://techdaily.com/ai-breakthrough-2024'
  },
  {
    _id: 'demo2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    source: 'WorldNews',
    category: 'Politics',
    createdAt: '2024-01-14T14:20:00Z',
    reliabilityScore: 88,
    summary: 'World leaders have agreed on ambitious new targets to combat climate change at the annual summit. The agreement includes unprecedented commitments to reduce carbon emissions and invest in renewable energy.',
    content: 'In a historic moment for environmental policy, representatives from over 150 countries...',
    sourceUrl: 'https://worldnews.com/climate-summit-2024'
  },
  {
    _id: 'demo3',
    title: 'Breakthrough in Cancer Treatment Shows Promising Results',
    source: 'HealthJournal',
    category: 'Health',
    createdAt: '2024-01-13T09:15:00Z',
    reliabilityScore: 92,
    summary: 'Clinical trials of a new immunotherapy treatment have shown remarkable success rates in treating advanced cancer. Early results indicate a 70% improvement in survival rates for patients with previously untreatable forms of the disease.',
    content: 'Medical researchers have announced promising results from phase III clinical trials...',
    sourceUrl: 'https://healthjournal.com/cancer-breakthrough-2024'
  },
  {
    _id: 'demo4',
    title: 'Underdog Team Makes Stunning Victory in Championship Finals',
    source: 'SportsCentral',
    category: 'Sports',
    createdAt: '2024-01-12T20:45:00Z',
    reliabilityScore: 85,
    summary: 'The underdog team has achieved an unexpected victory against the defending champions. This remarkable upset has been hailed as one of the greatest moments in sports history, with fans celebrating worldwide.',
    content: 'In what many are calling the greatest upset in sports history...',
    sourceUrl: 'https://sportscentral.com/underdog-victory-2024'
  },
  {
    _id: 'demo5',
    title: 'SpaceX Successfully Launches Revolutionary Satellite Constellation',
    source: 'SpaceExplorer',
    category: 'Technology',
    createdAt: '2024-01-11T16:30:00Z',
    reliabilityScore: 90,
    summary: 'SpaceX has successfully deployed the first batch of its next-generation satellite network. This new constellation promises to provide global internet coverage with unprecedented speed and reliability.',
    content: 'Elon Musk\'s aerospace company has achieved another milestone in space technology...',
    sourceUrl: 'https://spaceexplorer.com/spacex-constellation-2024'
  },
  {
    _id: 'demo6',
    title: 'New Economic Policy Announced to Address Inflation Concerns',
    source: 'BusinessTimes',
    category: 'Politics',
    createdAt: '2024-01-10T11:00:00Z',
    reliabilityScore: 87,
    summary: 'Government officials have unveiled a comprehensive economic plan to tackle rising inflation. The new policy includes measures to stabilize prices, support small businesses, and protect consumers from economic hardship.',
    content: 'In response to growing economic concerns, policymakers have introduced...',
    sourceUrl: 'https://businesstimes.com/economic-policy-2024'
  },
  {
    _id: 'demo7',
    title: 'Revolutionary Electric Vehicle Battery Technology Unveiled',
    source: 'AutoTech',
    category: 'Technology',
    createdAt: '2024-01-09T13:45:00Z',
    reliabilityScore: 89,
    summary: 'A major automotive manufacturer has revealed breakthrough battery technology that promises to double the range of electric vehicles while reducing charging time by 60%.',
    content: 'The automotive industry is on the brink of a major transformation...',
    sourceUrl: 'https://autotech.com/ev-battery-breakthrough-2024'
  },
  {
    _id: 'demo8',
    title: 'Major Breakthrough in Renewable Energy Storage',
    source: 'GreenTech',
    category: 'Technology',
    createdAt: '2024-01-08T10:20:00Z',
    reliabilityScore: 91,
    summary: 'Scientists have developed a new energy storage system that could solve the intermittency problem of renewable energy sources, making clean energy more reliable and accessible.',
    content: 'The renewable energy sector has received a significant boost...',
    sourceUrl: 'https://greentech.com/energy-storage-2024'
  }
];

export const demoUsers = [
  {
    _id: 'user1',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    joinDate: '2024-01-01T00:00:00Z',
    articlesSubmitted: 5,
    factChecksCompleted: 12,
    reliabilityScore: 85
  },
  {
    _id: 'user2',
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    joinDate: '2023-12-15T00:00:00Z',
    articlesSubmitted: 8,
    factChecksCompleted: 25,
    reliabilityScore: 92
  },
  {
    _id: 'user3',
    username: 'admin_user',
    email: 'admin@example.com',
    role: 'admin',
    joinDate: '2023-11-01T00:00:00Z',
    articlesSubmitted: 15,
    factChecksCompleted: 50,
    reliabilityScore: 95
  }
];

export const demoSources = [
  {
    _id: 'source1',
    name: 'TechDaily',
    url: 'https://techdaily.com',
    category: 'Technology',
    reliabilityScore: 85,
    factChecksCompleted: 45,
    status: 'verified'
  },
  {
    _id: 'source2',
    name: 'WorldNews',
    url: 'https://worldnews.com',
    category: 'Politics',
    reliabilityScore: 78,
    factChecksCompleted: 32,
    status: 'verified'
  },
  {
    _id: 'source3',
    name: 'HealthJournal',
    url: 'https://healthjournal.com',
    category: 'Health',
    reliabilityScore: 92,
    factChecksCompleted: 28,
    status: 'verified'
  }
];

export const demoCategories = [
  'Technology',
  'Politics', 
  'Health',
  'Sports',
  'Science',
  'Business',
  'Environment',
  'Entertainment'
];

export const demoStats = {
  totalArticles: 15420,
  totalUsers: 8920,
  totalFactChecks: 23450,
  totalSources: 1560,
  averageReliabilityScore: 87.5
};
