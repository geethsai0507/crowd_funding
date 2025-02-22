import React, { useState } from 'react';
import { Sparkles, TrendingUp, Filter } from 'lucide-react';
import { CampaignCard } from '../components/CampaignCard';
import type { Campaign } from '../types';

// Demo data
const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    title: 'Revolutionary Smart Watch',
    description: 'A next-generation smartwatch that revolutionizes how you interact with technology.',
    target_amount: 50000,
    current_amount: 35000,
    end_date: '2024-12-31',
    image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000',
    creator_id: '1',
    created_at: '2024-02-22',
    category: 'technology'
  },
  {
    id: '2',
    title: 'Eco-Friendly Art Installation',
    description: 'A sustainable art project that raises awareness about environmental conservation.',
    target_amount: 25000,
    current_amount: 15000,
    end_date: '2024-11-30',
    image_url: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=1000',
    creator_id: '2',
    created_at: '2024-02-21',
    category: 'art'
  },
  {
    id: '3',
    title: 'Independent Film Project',
    description: 'A compelling documentary about local communities and their traditions.',
    target_amount: 75000,
    current_amount: 45000,
    end_date: '2024-10-31',
    image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000',
    creator_id: '3',
    created_at: '2024-02-20',
    category: 'film'
  }
];

export function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(DEMO_CAMPAIGNS);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = category === 'all' || campaign.category === category;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', 'technology', 'art', 'music', 'film', 'games'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Discover Campaigns</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <TrendingUp className="h-5 w-5 mr-2" />
            Load More Campaigns
          </button>
        </div>
      </div>
    </div>
  );
}