import { Users } from "lucide-react";
import React from "react";

function HeroTotalOrders() {
  return (
    <div className="liquid-glass p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Users className=" size-5 lg:size-8 text-purple-600" />
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-950">
            {127}
          </p>
          <p className="text-green-950/70 text-sm">Today's Orders</p>
          <p className="text-yellow-700 text-xs mt-1">
            {15} pending
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroTotalOrders;
