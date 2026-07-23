import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import './Dashboard.css';

const salesData = [
  { day: 'Mon', sales: 30 },
  { day: 'Tue', sales: 55 },
  { day: 'Wed', sales: 35 },
  { day: 'Thu', sales: 70 },
  { day: 'Fri', sales: 45 },
  { day: 'Sat', sales: 85 },
  { day: 'Sun', sales: 60 },
];

const revenueData = [
  { name: 'YouTube', value: 40, color: '#ef4444' },
  { name: 'Facebook', value: 35, color: '#3b82f6' },
  { name: 'Twitter', value: 25, color: '#06b6d4' },
];

const trafficSources = [
  { label: 'Direct', value: 72, color: '#3461ff' },
  { label: 'Social', value: 48, color: '#3461ff' },
  { label: 'Referral', value: 31, color: '#3461ff' },
  { label: 'Bounce', value: 55, color: '#3461ff' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <span>${payload[0].value * 13}</span>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="pie-legend">
    {payload.map((entry, i) => (
      <div key={i} className="pie-legend-item">
        <span className="pie-legend-dot" style={{ background: entry.color }} />
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function Dashboard() {
  const [promoBannerOpen, setPromoBannerOpen] = useState(true);
  const [promoCardOpen, setPromoCardOpen] = useState(true);

  return (
    <div className="dashboard">
      {/* Stat Cards Row */}
      <div className="stats-grid">
        <StatCard
          value="$30200"
          label="All Earnings"
          icon="earnings"
          badgeText="10% changes on profit"
          badgeColor="orange"
          trend="up"
        />
        <StatCard
          value="145"
          label="Task"
          icon="task"
          badgeText="28% task performance"
          badgeColor="red"
          trend="down"
        />
        <StatCard
          value="290+"
          label="Page Views"
          icon="views"
          badgeText="10k daily views"
          badgeColor="green"
          trend="up"
        />
        <StatCard
          value="500"
          label="Downloads"
          icon="downloads"
          badgeText="1k download in App store"
          badgeColor="blue"
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Sales Per Day */}
        <div className="chart-card card sales-card">
          <div className="chart-header">
            <h3>Sales Per Day</h3>
            <div className="chart-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              </svg>
              <span>3%</span>
            </div>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="white"
                  strokeWidth={2.5}
                  fill="url(#salesGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: 'white' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="sales-footer">
            <div className="sales-stat">
              <span className="sales-stat-value">$4230</span>
              <span className="sales-stat-label">Total Revenue</span>
            </div>
            <div className="sales-stat">
              <span className="sales-stat-value">321</span>
              <span className="sales-stat-label">Today Sales</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Donut */}
        <div className="chart-card card revenue-card">
          <div className="chart-header-plain">
            <h3>Total Revenue</h3>
          </div>
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="chart-card card traffic-card">
          <div className="chart-header-plain">
            <h3>Traffic Sources</h3>
          </div>
          <div className="traffic-list">
            {trafficSources.map((src, i) => (
              <div key={i} className="traffic-item">
                <span className="traffic-label">{src.label}</span>
                <div className="traffic-bar-wrap">
                  <div
                    className="traffic-bar"
                    style={{ width: `${src.value}%`, background: src.color }}
                  />
                </div>
                <span className="traffic-val">{src.value}%</span>
              </div>
            ))}
          </div>

          {/* Promo Card */}
          {promoCardOpen && (
            <div className="promo-card">
              <button className="promo-card-close" onClick={() => setPromoCardOpen(false)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="promo-card-preview">
                <div className="promo-preview-bar orange" />
                <div className="promo-preview-bar blue" />
                <div className="promo-preview-bar green" />
                <div className="promo-chip">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3461ff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Done
                </div>
              </div>
              <div className="promo-card-text">
                <p>Unlock more with</p>
                <button className="promo-buy-btn" id="promo-buy-btn">
                  Buy Now <span className="pro-badge">PRO</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Promo Banner */}
      {promoBannerOpen && (
        <div className="promo-banner">
          <span>🔥 Unlock Able Pro 14-in-1 Bundle at <strong>30% OFF</strong></span>
          <button className="promo-banner-btn" id="promo-banner-btn">Use Code – ABLE30</button>
          <button className="promo-banner-close" onClick={() => setPromoBannerOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
