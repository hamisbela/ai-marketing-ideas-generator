import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, Lightbulb, Star, Copy, Check } from 'lucide-react';
import { genAI } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [description, setDescription] = useState('');
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateIdeas = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate creative and effective marketing ideas based on this business information: ${description}. 
      Format the response in markdown with proper headings, bullet points, and sections.
      
      Include these sections with proper markdown formatting:
      
      # Content Marketing Ideas
      ## Blog Post Ideas
      - List of creative blog post topics
      - Content themes and angles
      
      # Social Media Marketing
      ## Platform-specific Ideas
      ### Instagram
      - Post ideas
      - Reel concepts
      - Story ideas
      
      ### TikTok
      - Video concepts
      - Trending hashtags to use
      - Content series ideas
      
      ### LinkedIn
      - Professional content ideas
      - Thought leadership topics
      
      # Video Marketing
      - YouTube video concepts
      - Short-form video ideas
      - Live streaming topics
      
      # Viral Marketing Ideas
      - Viral campaign concepts
      - Challenge ideas
      - Shareable content themes
      
      # Email Marketing
      - Newsletter themes
      - Email campaign concepts
      - Lead magnet ideas
      
      # Offline Marketing
      - Event concepts
      - Print marketing ideas
      - Local marketing strategies
      
      # Innovative Marketing Tactics
      - Unique promotional ideas
      - Cross-promotion opportunities
      - Guerrilla marketing concepts`;
      
      const result = await model.generateContent(prompt);
      setIdeas(result.response.text());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating marketing ideas');
      setIdeas('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(ideas);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text leading-tight">
            AI Marketing Idea Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Generate creative marketing ideas that make your brand stand out! 🚀
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your business, target audience, industry, brand personality, and any specific marketing goals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-purple-400"
              />
              
              <Button 
                onClick={generateIdeas}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Generate Marketing Ideas ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {ideas && (
          <Card className="p-6 mb-12 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-xl font-semibold">Your Marketing Ideas</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 hover:bg-purple-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {ideas}
              </ReactMarkdown>
            </div>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-purple-500" />
            <h2 className="text-2xl font-bold">Support Our Work 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
              Free AI Marketing Idea Generator: Create Winning Marketing Campaigns ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our Free AI Marketing Idea Generator helps you create innovative, engaging, and 
                effective marketing campaigns across all channels. Perfect for marketers, 
                entrepreneurs, and businesses looking for fresh marketing ideas.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-purple-500" />
                  The #1 AI Marketing Idea Generator 🎯
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <span>Multi-channel marketing ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered creative suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Generate ideas in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Platform-specific content ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with unlimited generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Marketing Ideas For Every Channel 📱</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Social media content ideas</li>
                  <li>• Blog post topics and themes</li>
                  <li>• Video marketing concepts</li>
                  <li>• Email marketing campaigns</li>
                  <li>• Viral marketing strategies</li>
                  <li>• Offline marketing tactics</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Marketing Best Practices ✍️</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Know your target audience</li>
                  <li>Create platform-specific content</li>
                  <li>Focus on value and engagement</li>
                  <li>Test and optimize campaigns</li>
                  <li>Stay consistent with brand voice</li>
                </ol>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}