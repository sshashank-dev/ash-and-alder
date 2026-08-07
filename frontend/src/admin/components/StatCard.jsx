import React from "react";

export function StatCard({ title, value, icon: Icon, subtext }) {
    return (
        <div className="bg-white border border-[#e5e5e5] p-6 rounded-lg space-y-2 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
                <span className="text-[10px] text-[#737373] uppercase tracking-wider font-semibold">
                    {title}
                </span>
                {Icon && (
                    <div className="p-2 bg-neutral-100 rounded text-black">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-black tracking-tight">{value}</h3>
                {subtext && (
                    <p className="text-[10px] text-[#737373] mt-1">{subtext}</p>
                )}
            </div>
        </div>
    );
}