"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "@/lib/api/request";
import { UserPlus, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type DashboardStats = {
  totalCustomers: number;
  activePipeline: number;
  wonThisMonth: number;
  lostThisMonth: number;
  needsFollowUp: number;
  pipelineStats: {
    potential: number;
    contacted: number;
    negotiating: number;
    won: number;
    lost: number;
  };
  byState: Record<string, number>;
  byBusinessType: Record<string, number>;
  needsFollowUpList: Array<{
    id: number;
    businessName: string;
    state: string;
    salesRepId: string;
    pipelineStatus: string;
    lastContactedAt: string | null;
  }>;
};

export function DashboardScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await request("/api/dashboard");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getDaysUncontacted = (lastContactedAt: string | null) => {
    if (!lastContactedAt) return "从未联系";
    const days = Math.floor((Date.now() - new Date(lastContactedAt).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} 天未联络`;
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <div className="h-8 bg-white rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-white border border-[#D2DFD6] p-8 rounded-2xl text-center">
          <p className="text-[#7A9682]">加载失败 / Failed to load dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
      {/* Founder Team Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#D2DFD6] p-4 rounded-2xl shadow-sm flex flex-col gap-3"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-[#D2DFD6]">
          <svg className="w-4 h-4 text-[#2E5A35]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
          </svg>
          <h3 className="text-xs md:text-sm font-bold text-[#2E5A35] tracking-wide">
            创始人团队 / Executive Leadership
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs">
          <div className="bg-[#F5F7F5] p-2 rounded-lg border border-[#D2DFD6]/60">
            <p className="font-extrabold text-[#142517]">Steven Wang (王培铖)</p>
            <p className="text-[9px] text-[#3B5E43] font-semibold mt-0.5">
              创始人 & 首席执行官<br />Founder & CEO
            </p>
          </div>
          <div className="bg-[#F5F7F5] p-2 rounded-lg border border-[#D2DFD6]/60">
            <p className="font-extrabold text-[#142517]">Dai Zhao (赵岱)</p>
            <p className="text-[9px] text-[#3B5E43] font-semibold mt-0.5">
              联合创始人 & 首席技术官<br />Co-founder & CTO
            </p>
          </div>
          <div className="bg-[#F5F7F5] p-2 rounded-lg border border-[#D2DFD6]/60">
            <p className="font-extrabold text-[#142517]">Yong Shi (施勇)</p>
            <p className="text-[9px] text-[#3B5E43] font-semibold mt-0.5">
              联合创始人 & 副总裁<br />Co-founder & VP
            </p>
          </div>
          <div className="bg-[#F5F7F5] p-2 rounded-lg border border-[#D2DFD6]/60">
            <p className="font-extrabold text-[#142517]">Yuqi Li (李瑀奇)</p>
            <p className="text-[9px] text-[#3B5E43] font-semibold mt-0.5">
              总经理<br />General Manager
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-2.5"
      >
        <div className="bg-white border border-[#D2DFD6] p-3 rounded-2xl flex flex-col justify-between">
          <p className="text-[9px] md:text-[10px] text-[#3B5E43] uppercase tracking-wider font-semibold">
            客户总数 / Total Clients
          </p>
          <h4 className="text-xl font-bold text-[#2E5A35] mt-1 tabular-nums">
            {stats.totalCustomers} <span className="text-xs text-[#7A9682]">家</span>
          </h4>
          <span className="text-[8px] text-[#22C55E] mt-1 inline-block">● Active</span>
        </div>

        <div className="bg-white border border-[#D2DFD6] p-3 rounded-2xl flex flex-col justify-between">
          <p className="text-[9px] md:text-[10px] text-[#3B5E43] uppercase tracking-wider font-semibold">
            谈判跟进中 / Open Deals
          </p>
          <h4 className="text-xl font-bold text-[#BF7F2A] mt-1 tabular-nums">
            {stats.activePipeline} <span className="text-xs text-[#7A9682]">个</span>
          </h4>
          <span className="text-[8px] text-[#3B5E43] mt-1 inline-block">Active Pipeline</span>
        </div>

        <div className="bg-white border border-[#D2DFD6] p-3 rounded-2xl flex flex-col justify-between">
          <p className="text-[9px] md:text-[10px] text-[#3B5E43] uppercase tracking-wider font-semibold">
            本月签约 / Monthly Wins
          </p>
          <h4 className="text-xl font-bold text-[#2E5A35] mt-1 tabular-nums">
            {stats.wonThisMonth} <span className="text-xs text-[#7A9682]">家</span>
          </h4>
          <span className="text-[8px] text-[#429362] mt-1 font-semibold">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Conversion
          </span>
        </div>

        <div className="bg-red-50 border border-red-200 p-3 rounded-2xl flex flex-col justify-between">
          <p className="text-[9px] md:text-[10px] text-red-700 uppercase tracking-wider font-bold">
            流失预警 / Urgent Alerts
          </p>
          <h4 className="text-xl font-bold text-red-600 mt-1 tabular-nums">
            {stats.needsFollowUp} <span className="text-xs text-red-500">家</span>
          </h4>
          <span className="text-[8px] text-red-600 mt-1 font-semibold">30+ Days No Contact</span>
        </div>
      </motion.div>

      {/* Priority Follow-Up Alerts */}
      {stats.needsFollowUpList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#D2DFD6] rounded-2xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between border-b border-[#F5F7F5] pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-xs md:text-sm font-extrabold text-[#142517]">
                临期客户紧急跟进 / Alert Queue
              </h3>
            </div>
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {stats.needsFollowUp} 账户失联
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {stats.needsFollowUpList.map((customer) => (
              <motion.div
                key={customer.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/customers/${customer.id}`)}
                className="bg-[#F5F7F5] hover:bg-white border border-[#D2DFD6]/40 hover:border-[#429362] p-2.5 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all"
              >
                <div className="flex flex-col">
                  <p className="font-bold text-xs">{customer.businessName}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#3B5E43] mt-0.5">
                    <span className="bg-stone-200/60 px-1 py-0.5 rounded font-bold">{customer.state}</span>
                    <span>Stage: {customer.pipelineStatus}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-red-600 font-bold block">
                    {getDaysUncontacted(customer.lastContactedAt)}
                  </span>
                  <AlertTriangle className="w-3 h-3 text-red-500 ml-auto mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add Customer Shortcut */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/customers?add=true")}
        className="w-full bg-[#2E5A35] hover:bg-[#429362] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span>快速新增客户档案 / Add Sales Client</span>
      </motion.button>
    </div>
  );
}
