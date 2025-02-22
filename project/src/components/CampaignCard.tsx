import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import type { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.current_amount / campaign.target_amount) * 100;
  const timeLeft = formatDistance(new Date(campaign.end_date), new Date(), { addSuffix: true });

  return (
    <Link to={`/campaign/${campaign.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={campaign.image_url}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${campaign.current_amount.toLocaleString()} raised
              </span>
              <span className="text-gray-600">
                ${campaign.target_amount.toLocaleString()} goal
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-indigo-600 font-medium">
                {Math.round(progress)}% funded
              </span>
              <span className="text-gray-600">Ends {timeLeft}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}