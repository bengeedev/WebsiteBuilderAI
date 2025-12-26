"use client";

import Link from "next/link";

type Props = {
  id: string;
  title: string;
  icon: string;
  status: string;
  statusColor: "green" | "yellow" | "red" | "gray" | "blue";
  metric: string;
  href: string;
  gradient: string;
};

const statusColors = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-gray-500",
  blue: "bg-blue-500",
};

export function DashboardCard({
  title,
  icon,
  status,
  statusColor,
  metric,
  href,
  gradient,
}: Props) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and title */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}
            >
              {icon}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${statusColors[statusColor]} animate-pulse`}
              />
              <span className="text-xs text-gray-400">{status}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
            {title}
          </h3>

          {/* Metric */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {metric}
          </p>

          {/* Arrow indicator */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
