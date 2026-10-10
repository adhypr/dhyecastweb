import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState(1);

  const sections = [
    {
      id: 1,
      title: "1. The Dhyecast Story",
      content: (
        <p className="text-gray-600 leading-relaxed">
          Dhyecast started from a simple hobby. Collecting 1:64 scale diecast cars is fun, but finding them in mint condition can be a headache. We built Dhyecast to share our passion with other collectors. We are not just a toy store; we are a hub for gearheads and miniature car enthusiasts who want authentic, high-quality models without the drama.
        </p>
      ),
    },
    {
      id: 2,
      title: "2. Our Collections",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">We sell what we actually love to collect. Here is what you can find in our store:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
            <li><strong className="text-gray-900">High-Detail 1:64 Scale:</strong> Mini GT, Inno64, Tarmac Works, Kaido House.</li>
            <li><strong className="text-gray-900">Collector Mainlines & Premiums:</strong> Hot Wheels Car Culture, Boulevard, Fast & Furious editions.</li>
            <li><strong className="text-gray-900">Classic & Pop Culture:</strong> Tomica Limited Vintage and iconic retro cars.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. The Collector's Standard",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">We know that for collectors, the card and blister condition is just as important as the car itself. That is why we take packing seriously.</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
            <li><strong className="text-gray-900">Mint Condition Guarantee:</strong> No soft corners, no cracked blisters before shipping.</li>
            <li><strong className="text-gray-900">Armored Packaging:</strong> We use thick bubble wrap and sturdy hardboxes.</li>
            <li><strong className="text-gray-900">100% Authentic:</strong> Official licensed products only.</li>
          </ul>
        </div>
      ),
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Dhyecast</h1>
          <p className="text-lg text-gray-500">Curated Diecast Collectibles for Real Enthusiasts.</p>
        </div>

        {/* Section 1, 2, 3: Accordion / Tabs */}
        <div className="space-y-4 mb-12">
          {sections.map((section) => (
            <div key={section.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === section.id ? null : section.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-lg">{section.title}</span>
                <span className="text-2xl text-gray-400">
                  {activeTab === section.id ? "−" : "+"}
                </span>
              </button>
              
              {/* Expandable Content */}
              {activeTab === section.id && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section 4: Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b pb-4">Our Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-black mb-2">1,500+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Cars Delivered</div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-black mb-2">99%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Mint Condition</div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-black mb-2">50+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Brands Curated</div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-black mb-2">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Authentic</div>
            </div>
          </div>
        </div>

        {/* Section 5: Store Information & Operations */}
        <div className="bg-black text-white p-8 rounded-sm shadow-md flex flex-col md:flex-row gap-8 justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Operational & Contact</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong className="text-white">Operating Hours:</strong> Monday - Saturday (09:00 - 21:00 WIB)</li>
              <li><strong className="text-white">Hub Location:</strong> Bali, Indonesia</li>
              <li><strong className="text-white">Email Support:</strong> hello@dhyecast.com</li>
            </ul>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-2">Join our community</p>
            <a 
              href="https://instagram.com/dhyecast" 
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-white text-white px-6 py-2 rounded-sm hover:bg-white hover:text-black transition-colors font-semibold"
            >
              Follow @dhyecast
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
