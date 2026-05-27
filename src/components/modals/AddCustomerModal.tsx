"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { request } from "@/lib/api/request";
import { toast } from "sonner";
import { memory } from "@eazo/sdk";

type AddCustomerModalProps = {
  onClose: () => void;
  onSuccess: (customer: any) => void;
};

const US_STATES = [
  { value: "NY", label: "NY (纽约)" },
  { value: "NJ", label: "NJ (新泽西)" },
  { value: "PA", label: "PA (宾州)" },
  { value: "CT", label: "CT (康州)" },
  { value: "CA", label: "CA (加州)" },
  { value: "TX", label: "TX (德州)" },
  { value: "FL", label: "FL (佛州)" },
];

const BUSINESS_TYPES = [
  { value: "Chinese Restaurant", label: "中餐馆 / Chinese Restaurant" },
  { value: "Hotpot Restaurant", label: "火锅店 / Hotpot Restaurant" },
  { value: "Supermarket", label: "超市 / Supermarket" },
  { value: "Other", label: "其他 / Other" },
];

export function AddCustomerModal({ onClose, onSuccess }: AddCustomerModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    city: "",
    state: "NY",
    phone: "",
    contactPerson: "",
    businessType: "Chinese Restaurant",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName || !formData.address || !formData.city || !formData.phone || !formData.contactPerson) {
      toast.error("请填写必填项 / Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const newCustomer = await request("/api/customers", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      memory.reportAction({
        content: `User created new customer: ${formData.businessName} (${formData.state})`,
        event_type: "create",
        page: "customers",
        metadata: { type: "create_customer", customer_id: newCustomer.id, business_name: formData.businessName },
      }).catch(() => {});
      toast.success("客户已添加 / Customer added");
      onSuccess(newCustomer);
    } catch (error) {
      console.error("Failed to create customer:", error);
      toast.error("添加失败 / Failed to add customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />

        {/* Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[#F5F7F5] rounded-t-3xl md:rounded-2xl w-full md:max-w-lg md:max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="bg-[#2E5A35] text-white p-4 flex items-center justify-between sticky top-0 z-10 md:rounded-t-2xl">
            <div>
              <h3 className="text-xs md:text-sm font-extrabold">
                新增客户档案 / Add Sales Customer
              </h3>
              <p className="text-[10px] text-[#F5F7F5]">Wide Zone Food B2B Procurement CRM</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-[#F5F7F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
            {/* Form Card */}
            <div className="bg-white border border-[#D2DFD6] p-4 rounded-2xl flex flex-col gap-3">
              {/* Business Name */}
              <div>
                <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                  商业名称 / Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none focus:ring-1 focus:ring-[#429362]"
                  placeholder="e.g. Fortune Garden Bistro / 福禄双全中餐茶馆"
                />
              </div>

              {/* Phone and Contact Person */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                    联络人电话 / Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                    联系人 / Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none"
                    placeholder="e.g. Manager Lin"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                  地址 / Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none focus:ring-1 focus:ring-[#429362]"
                  placeholder="e.g. 123 Main Street"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                    城市 / City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none"
                    placeholder="e.g. New York"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                    区域划分州 / US State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none text-stone-700 font-semibold"
                  >
                    {US_STATES.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="text-[10px] font-bold text-[#2E5A35] uppercase tracking-wider block mb-1">
                  客户主品类 / Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full bg-[#F5F7F5] text-xs p-2.5 rounded-xl border border-[#D2DFD6] focus:outline-none text-stone-700 font-semibold"
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pb-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white text-stone-600 font-bold text-xs py-3 rounded-xl border border-[#D2DFD6] text-center hover:bg-[#F5F7F5] transition-colors"
              >
                取消 / Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#2E5A35] hover:bg-[#429362] disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl text-center transition-colors"
              >
                {submitting ? "添加中... / Adding..." : "确定录入 / Save Account"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
