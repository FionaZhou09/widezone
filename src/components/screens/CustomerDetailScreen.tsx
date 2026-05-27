"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "@/lib/api/request";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";
import { memory } from "@eazo/sdk";

type Customer = {
  id: number;
  businessName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  contactPerson: string;
  businessType: string;
  productPreferences: Array<{
    productId: number;
    preferredPrice: number;
    usualQuantity: string;
  }>;
  pipelineStatus: string;
  lostReason: string | null;
  salesRepId: string;
  lastContactedAt: string | null;
  createdAt: string;
};

type ActivityLog = {
  id: number;
  customerId: number;
  salesRepId: string;
  salesRepName: string;
  note: string;
  nextFollowUpDate: string | null;
  createdAt: string;
};

const pipelineStages = [
  { value: "potential", label: "POTENTIAL", labelZh: "潜在客户" },
  { value: "contacted", label: "CONTACTED", labelZh: "已联系" },
  { value: "negotiating", label: "NEGOTIATING", labelZh: "谈判中" },
  { value: "won", label: "WON", labelZh: "已签约" },
  { value: "lost", label: "LOST", labelZh: "已流失" },
];

export function CustomerDetailScreen({ customerId }: { customerId: string }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLogNote, setNewLogNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerData, logsData] = await Promise.all([
          request(`/api/customers/${customerId}`),
          request(`/api/customers/${customerId}/logs`),
        ]);
        setCustomer(customerData);
        setLogs(logsData);
      } catch (error) {
        console.error("Failed to fetch customer details:", error);
        toast.error("加载失败 / Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  const handlePipelineChange = async (newStatus: string) => {
    if (!customer) return;

    try {
      await request(`/api/customers/${customerId}/pipeline`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setCustomer({ ...customer, pipelineStatus: newStatus });
      toast.success("阶段已更新 / Stage updated");
    } catch (error) {
      console.error("Failed to update pipeline:", error);
      toast.error("更新失败 / Update failed");
    }
  };

  const handleAddLog = async () => {
    if (!newLogNote.trim()) return;

    setSubmitting(true);
    try {
      const newLog = await request(`/api/customers/${customerId}/logs`, {
        method: "POST",
        body: JSON.stringify({ note: newLogNote }),
      });
      setLogs([newLog, ...logs]);
      setNewLogNote("");
      toast.success("记录已添加 / Log added");
    } catch (error) {
      console.error("Failed to add log:", error);
      toast.error("添加失败 / Failed to add");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <div className="h-8 bg-white rounded-lg animate-pulse" />
        <div className="h-32 bg-white rounded-2xl animate-pulse" />
        <div className="h-24 bg-white rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-white border border-[#D2DFD6] p-8 rounded-2xl text-center">
          <p className="text-[#7A9682]">客户未找到 / Customer not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-[#2E5A35] font-semibold text-sm"
          >
            返回 / Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2E5A35] bg-white border border-[#D2DFD6] px-3 py-1.5 rounded-xl hover:bg-[#F5F7F5] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回列表 / Back</span>
        </button>
        <span className="text-xs text-[#7A9682] font-semibold">客户详情档案 / Client profile</span>
      </div>

      {/* Customer Base Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#D2DFD6] rounded-2xl p-4 flex flex-col gap-3"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#142517] leading-tight">
              {customer.businessName}
            </h2>
            <p className="text-xs text-[#3B5E43] font-semibold">{customer.businessType}</p>
          </div>
          <span className="bg-[#2E5A35] text-white text-xs font-extrabold px-3 py-1 rounded-xl">
            {customer.state}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-[#F5F7F5] pt-3">
          <div>
            <span className="text-[10px] text-[#7A9682] block">联络人电话 / Customer Phone</span>
            <a href={`tel:${customer.phone}`} className="font-extrabold text-[#2E5A35] underline">
              {customer.phone}
            </a>
          </div>
          <div>
            <span className="text-[10px] text-[#7A9682] block">联系人 / Contact Person</span>
            <span className="font-semibold text-stone-700">{customer.contactPerson}</span>
          </div>
          <div className="mt-2 col-span-2">
            <span className="text-[10px] text-[#7A9682] block">地址 / Address</span>
            <span className="font-bold text-[#142517]">
              {customer.address}, {customer.city}, {customer.state}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pipeline Stage Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#D2DFD6] rounded-2xl p-4 flex flex-col gap-2.5"
      >
        <p className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider">
          跟进生命周期决策 / Pipeline Stage Selector
        </p>
        <div className="grid grid-cols-5 gap-1">
          {pipelineStages.map((stage) => {
            const isActive = customer.pipelineStatus === stage.value;
            return (
              <button
                key={stage.value}
                onClick={() => handlePipelineChange(stage.value)}
                className={`rounded-lg py-1.5 flex flex-col items-center justify-center text-[8px] font-bold transition-all ${
                  isActive
                    ? stage.value === "negotiating"
                      ? "bg-amber-100 text-amber-900 border border-amber-300 ring-1 ring-amber-300"
                      : stage.value === "won"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300 ring-1 ring-emerald-300"
                      : stage.value === "lost"
                      ? "bg-red-100 text-red-900 border border-red-300 ring-1 ring-red-300"
                      : "bg-[#2E5A35] text-white border border-[#2E5A35] ring-1 ring-[#2E5A35]"
                    : "bg-[#F5F7F5] text-[#3B5E43] border border-[#D2DFD6]"
                }`}
              >
                <span>{stage.label}</span>
                <span>{stage.labelZh}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Activity Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-[#D2DFD6] rounded-2xl p-4 flex flex-col gap-3"
      >
        <div>
          <h3 className="text-xs md:text-sm font-extrabold text-[#142517]">
            销售跟进记录 / Interaction Logs
          </h3>
          <p className="text-[10px] text-[#7A9682]">Real-time collaboration timeline synced across managers</p>
        </div>

        {/* Quick Log Input */}
        <div className="bg-[#F5F7F5] p-2.5 rounded-xl border border-[#D2DFD6]/50 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[#2E5A35]">✎ 快速记录新行动 / Quick Log Activity</span>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={newLogNote}
              onChange={(e) => setNewLogNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddLog()}
              disabled={submitting}
              className="flex-1 bg-white text-xs p-2 rounded-lg border border-[#D2DFD6] focus:outline-none focus:ring-1 focus:ring-[#429362]"
              placeholder="输入跟进细节或客户最新诉求..."
            />
            <button
              onClick={handleAddLog}
              disabled={submitting || !newLogNote.trim()}
              className="bg-[#2E5A35] hover:bg-[#429362] disabled:opacity-50 text-white text-[11px] font-bold px-3.5 rounded-lg transition-colors"
            >
              记录 / Log
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-3.5 mt-2">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-[#7A9682] text-sm">
              暂无记录 / No logs yet
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={log.id} className="relative pl-4 border-l border-[#429362]/50">
                <span
                  className={`absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full ${
                    index === 0 ? "bg-[#429362]" : "bg-[#429362]/40"
                  }`}
                />
                <div className="flex items-center justify-between text-[10px] text-[#7A9682]">
                  <span className="font-bold text-[#3B5E43]">{log.salesRepName}</span>
                  <span className="tabular-nums">
                    {new Date(log.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <p className="text-[11px] text-stone-750 mt-1 leading-relaxed">{log.note}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
