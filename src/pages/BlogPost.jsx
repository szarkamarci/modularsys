import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Define the static content for our 4 blog posts
const BLOG_POSTS = {
  'future-of-inventory': {
    title: 'Moving Beyond Spreadsheets: The Future of Inventory Management',
    tag: 'Featured Guide',
    date: 'June 2, 2026',
    readTime: '12 min read',
    image: '/assets/blog/featured_inventory_1780416981216.png',
    content: (
      <>
        <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-10 font-light">
          Manual data entry and disjointed systems are costing you time and money. Here is how predictive analytics and centralized dashboards transform supply chain visibility.
        </p>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The Magic 8-Ball Strategy</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          For decades, retail managers have relied on a combination of historical spreadsheets and "gut feeling" to predict inventory needs. But in today's fast-moving market, this is essentially shaking a Magic 8-Ball and hoping for the best.
        </p>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-10">
          When supply chains are disconnected from real-time point-of-sale data, the inevitable results are stockouts of high-demand items and warehouses overflowing with dead stock.
        </p>

        <div className="bg-surface-container-low border-l-4 border-primary p-8 rounded-r-xl my-12">
          <p className="text-xl font-headline font-medium text-on-surface italic">
            "The organizations that win aren't the ones with the most data, but the ones with the most connected data."
          </p>
        </div>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The ModularAI Approach</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          We built ModularAI to replace the Magic 8-Ball with a crystal ball. By aggregating ERP stock levels, supplier lead times, and webshop search trends into a single, unified view, our predictive models identify exactly what you need to order—weeks before a stockout occurs.
        </p>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          Stop reacting to the past. Start predicting the future.
        </p>
      </>
    ),
  },
  'manual-entry-costs': {
    title: 'The Hidden Cost of Manual Data Entry in Retail',
    tag: 'Blog',
    date: 'May 28, 2026',
    readTime: '8 min read',
    image: '/assets/blog/blog_manual_entry_1780416993408.png',
    content: (
      <>
        <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-10 font-light">
          Copying and pasting is for middle school projects, not enterprise supply chains. Discover how fragmented data silos lead to costly errors and missed opportunities.
        </p>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The Weekend Thief</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          Every Friday afternoon, thousands of highly paid analysts spend hours manually exporting CSV files from one system and importing them into another. We call this the "Weekend Thief." Not only is it soul-crushing, but human error during manual entry accounts for millions of dollars in misordered stock annually.
        </p>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">Reclaiming Your Time</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          An integrated data ecosystem isn't a luxury; it's a necessity. By automating the data pipelines between your POS, warehouse management, and ecommerce platforms, ModularAI ensures that your team spends their time analyzing insights, not formatting columns.
        </p>
      </>
    ),
  },
  'churn-signals': {
    title: 'Identifying Customer Churn Signals Before It\'s Too Late',
    tag: 'Strategy',
    date: 'May 15, 2026',
    readTime: '5 min read',
    image: '/assets/blog/blog_churn_1780417006666.png',
    content: (
      <>
        <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-10 font-light">
          Customer behavior data often holds the key to retention. Learn to recognize early churn indicators using automated anomaly detection and behavioral analysis.
        </p>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The Silent Goodbye</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          Customers rarely call to say they are leaving; they simply fade away. They stop logging in, their search frequency drops, and their basket sizes shrink. By the time a traditional report shows a drop in monthly recurring revenue, the customer is already gone.
        </p>

        <div className="bg-surface-container-low border-l-4 border-warning p-8 rounded-r-xl my-12">
          <p className="text-xl font-headline font-medium text-on-surface italic">
            "Churn signals are louder than you think. You just need the right antenna."
          </p>
        </div>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">Behavioral Anomaly Detection</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          ModularAI constantly monitors these subtle behavioral shifts. When a high-value account deviates from their standard purchasing rhythm, our system flags it instantly, allowing your customer success team to intervene before the relationship goes cold.
        </p>
      </>
    ),
  },
  'agile-vs-legacy': {
    title: 'Agile Analytics vs. Legacy ERPs: Finding the Right Balance',
    tag: 'Comparison',
    date: 'April 30, 2026',
    readTime: '15 min read',
    image: '/assets/blog/blog_agile_1780417021768.png',
    content: (
      <>
        <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-10 font-light">
          Legacy systems are powerful but slow to adapt. See how adding a lightweight, intelligent data layer on top of your existing tools can accelerate decision-making.
        </p>

        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The Goliath Problem</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          Legacy Enterprise Resource Planning (ERP) systems are incredible at storing massive amounts of transactional data. But querying that data? Extracting real-time insights? That often requires a dedicated IT ticket and a two-week wait.
        </p>
        
        <h3 className="text-2xl font-headline font-bold text-on-surface mt-12 mb-6">The David Solution</h3>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
          You don't need to rip and replace your ERP to become data-driven. The modern approach is to layer an agile analytics platform over your existing infrastructure. ModularAI connects directly to your legacy databases, pulling the data into a sleek, fast, and intelligent interface that business users can actually understand.
        </p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  
  const post = BLOG_POSTS[slug];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className="pt-40 pb-32 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-headline font-bold mb-6">Article not found</h1>
        <p className="text-on-surface-variant mb-8">The post you are looking for does not exist.</p>
        <Link to="/resources" className="text-primary font-bold hover:underline">
          &larr; Back to Resources
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Breadcrumb / Back link */}
        <div className="mb-12">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Resources
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6 text-sm font-bold text-primary tracking-widest uppercase">
            <span>{post.tag}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="text-on-surface-variant">{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="text-on-surface-variant">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-on-surface leading-tight mb-8">
            {post.title}
          </h1>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-16 bg-surface-container-low">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg md:prose-xl prose-invert max-w-none">
          {post.content}
        </div>

        {/* Author / CTA Footer */}
        <footer className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <h4 className="text-2xl font-headline font-bold text-on-surface mb-4">
            Ready to apply these insights?
          </h4>
          <p className="text-on-surface-variant max-w-lg mb-8">
            Stop reading about data transformation and start experiencing it. Get a free, focused audit of your current spreadsheets and systems.
          </p>
          <Link to="/audit" className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
            Rescue My Data (Free Audit)
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default BlogPost;
