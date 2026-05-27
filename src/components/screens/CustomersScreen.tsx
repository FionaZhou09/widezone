"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { request } from "@/lib/api/request";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AddCustomerModal } from "@/components/modals/AddCustomerModal";

type Customer = {
  id: number;
  businessName: string;
  state: string;
  salesRepId: string;
  pipelineStatus: string;
  lastContactedAt: string | null;
};

const statusColors = {
  potential: { bg: "bg-stone-100", border: "border-stone-200", text: "text-stone-700" },
  contacted: { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-700" },
  negotiating: { bg: "bg-amber-100", border: "border-amber-200", text: "text-amber-800" },
  won: { bg: "bg-emerald-100", border: "border-emerald-200", text: "text-emerald-800" },
  lost: { bg: "bg-red-100", border: "border-red-200", text: "text-red-700" },
};

const statusLabels = {
  potential: "Potential / 潜在客户",
  contacted: "Contacted / 已联系",
  negotiating: "Negotiating / 谈判中",
  won: "Won / 已签约",
  lost: "Lost / 已流失",
};

export function CustomersScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      setShowAddModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await request("/api/customers");
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const getDaysUncontacted = (lastContactedAt: string | null) => {
    if (!lastContactedAt) return "从未联系";
    const days = Math.floor((Date.now() - new Date(lastContactedAt).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "今天联系";
    if (days === 1) return "昨天联系";
    return `${days}天前联系`;
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.potential;
  };

  const getStatusLabel = (status: string) => {
    return statusLabels[status as keyof typeof statusLabels] || status;
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = searchQuery === "" || c.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || c.pipelineStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: customers.length,
    negotiating: customers.filter((c) => c.pipelineStatus === "negotiating").length,
    won: customers.filter((c) => c.pipelineStatus === "won").length,
    potential: customers.filter((c) => c.pipelineStatus === "potential").length,
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <div className="h-8 bg-white rounded-lg animate-pulse" />
        <div className="h-10 bg-white rounded-xl animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#2E5A35]">
              客户档案数据库 / Clients Directory
            </h2>
            <p className="text-[10px] text-[#7A9682]">Search through regional buyer profiles</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#2E5A35] text-white hover:bg-[#429362] font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition-colors"
          >
            + 新增 / Add
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#7A9682] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#D2DFD6] placeholder-[#7A9682] focus:outline-none focus:ring-1 focus:ring-[#429362]"
            placeholder="搜索餐厅名字, 英文, 或负责代表..."
          />
        </div>

        {/* Filter Tags */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5">
          <button
            onClick={() => setFilterStatus(null)}
            className={`text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
              filterStatus === null
                ? "bg-[#2E5A35] text-white"
                : "bg-white border border-[#D2DFD6] text-[#3B5E43]"
            }`}
          >
            全部 / All ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilterStatus("negotiating")}
            className={`text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
              filterStatus === "negotiating"
                ? "bg-[#2E5A35] text-white"
                : "bg-white border border-[#D2DFD6] text-[#3B5E43]"
            }`}
          >
            谈判中 / Negotiating ({statusCounts.negotiating})
          </button>
          <button
            onClick={() => setFilterStatus("won")}
            className={`text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
              filterStatus === "won"
                ? "bg-[#2E5A35] text-white"
                : "bg-white border border-[#D2DFD6] text-[#3B5E43]"
            }`}
          >
            已签约 / Won ({statusCounts.won})
          </button>
          <button
            onClick={() => setFilterStatus("potential")}
            className={`text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
              filterStatus === "potential"
                ? "bg-[#2E5A35] text-white"
                : "bg-white border border-[#D2DFD6] text-[#3B5E43]"
            }`}
          >
            潜在 / Potential ({statusCounts.potential})
          </button>
        </div>

        {/* Customer List */}
        <div className="flex flex-col gap-2.5">
          {filteredCustomers.length === 0 ? (
            <div className="bg-white border border-[#D2DFD6] p-8 rounded-2xl text-center">
              <p className="text-[#7A9682] text-sm">
                {searchQuery ? "未找到匹配的客户 / No matching customers" : "暂无客户 / No customers yet"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 bg-[#2E5A35] text-white hover:bg-[#429362] font-bold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-1" />
                添加第一个客户 / Add first customer
              </button>
            </div>
          ) : (
            filteredCustomers.map((customer, index) => {
              const statusColor = getStatusColor(customer.pipelineStatus);
              const daysText = getDaysUncontacted(customer.lastContactedAt);
              const isUrgent = customer.lastContactedAt && 
                Math.floor((Date.now() - new Date(customer.lastContactedAt).getTime()) / (1000 * 60 * 60 * 24)) > 30;

              return (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/customers/${customer.id}`)}
                  className="bg-white border border-[#D2DFD6] p-3.5 rounded-2xl cursor-pointer hover:border-[#429362] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-[#142517]">{customer.businessName}</h4>
                    </div>
                    <span className={`${statusColor.bg} border ${statusColor.border} text-[9px] ${statusColor.text} font-bold px-2 py-0.5 rounded-full`}>
                      {getStatusLabel(customer.pipelineStatus)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#F5F7F5] mt-2.5 pt-2 text-[9px] text-[#7A9682]">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#F5F7F5] text-[#3B5E43] py-0.5 px-1.5 rounded font-extrabold">
                        {customer.state}
                      </span>
                    </div>
                    <span className={isUrgent ? "text-red-600 font-bold" : "text-[#429362] font-semibold"}>
                      {daysText}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {showAddModal && (
        <AddCustomerModal
          onClose={() => {
            setShowAddModal(false);
            router.replace("/customers");
          }}
          onSuccess={(newCustomer) => {
            setCustomers((prev) => [newCustomer, ...prev]);
            setShowAddModal(false);
            router.replace("/customers");
          }}
        />
      )}
    </>
  );
}
