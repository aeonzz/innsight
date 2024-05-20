"use client";

import React from "react";
import { Card } from "../ui/card";

const DashboardScreen = () => {
  return (
    <div className="border w-full p-3 space-y-6">
      <h2 className="font-semibold text-4xl text-secondary">Dashboard</h2>
      <div className="w-full">
        <div className="grid grid-cols-4 grid-rows-1 h-24 gap-10">
          <Card className="bg-red-700 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">150</h3>
            <p>New Booking</p>
          </Card>
          <Card className="bg-red-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">205</h3>
            <p>Scheduled Room</p>
          </Card>
          <Card className="bg-green-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">45</h3>
            <p>Check-In</p>
          </Card>
          <Card className="bg-yellow-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">67</h3>
            <p>Check-Out</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
