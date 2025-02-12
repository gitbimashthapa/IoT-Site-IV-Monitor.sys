import React from "react";
import {
  Wifi,
  Droplet,
  Battery,
  AlertTriangle,
  WifiOff,
  Scale,
} from "lucide-react";
import { IVData } from "../types";
import { StatusCard } from "./StatusCard";
import { VolumeGauge } from "./VolumeGauge";
import { PercentageGauge } from "./PercentageGauge";
import { HistoryChart } from "./HistoryChart";

interface DashboardProps {
  data: IVData;
  history: IVData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ data, history }) => {
  const getAlertStatus = () => {
    if (data.percentage <= 20) return "error";
    if (data.percentage <= 50) return "warning";
    return "success";
  };

  const alertStatus = getAlertStatus();
  const displayAlertStatus =
    data.percentage <= 20
      ? "critical"
      : data.percentage <= 50
      ? "warning"
      : "normal";

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Connection Status"
          value={data.isConnected ? "Connected" : "Disconnected"}
          icon={data.isConnected ? Wifi : WifiOff}
          status={data.isConnected ? "success" : "error"}
        />

        <StatusCard
          title="Current Volume"
          value={`${data.volumeInMl} mL`}
          icon={Droplet}
          status="info"
        />

        <StatusCard
          title="IV Bag Level"
          value={`${data.percentage}%`}
          icon={Battery}
          status={alertStatus}
        />

        <StatusCard
          title="HX711 Sensor"
          value={data.hx711Connected ? "Connected" : "Disconnected"}
          icon={Scale}
          status={data.hx711Connected ? "success" : "error"}
        />
      </div>

      {/* Alert Message */}
      {(displayAlertStatus === "critical" ||
        displayAlertStatus === "warning") && (
        <div
          className={`rounded-xl shadow-lg p-4 mb-6 transition-all duration-200 animate-pulse backdrop-blur-sm ${
            displayAlertStatus === "critical"
              ? "bg-red-900/20 dark:bg-red-900/30 text-red-200 border border-red-800/50"
              : "bg-yellow-900/20 dark:bg-yellow-900/30 text-yellow-200 border border-yellow-800/50"
          }`}
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span className="font-medium">
              {displayAlertStatus === "critical"
                ? "Critical: IV Bag level is very low! Please replace immediately."
                : "Warning: IV Bag is at 50% capacity."}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-100 rounded-xl shadow-xl p-6 transition-all duration-200 hover:shadow-2xl dark:shadow-dark-300/50">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
            <Droplet className="w-5 h-5 mr-2 text-blue-500" />
            Real-time Volume
          </h3>
          <div className="h-[400px]">
            <VolumeGauge value={data.volumeInMl} maxValue={500} />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-xl shadow-xl p-6 transition-all duration-200 hover:shadow-2xl dark:shadow-dark-300/50">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
            <Battery className="w-5 h-5 mr-2 text-purple-500" />
            IV Bag Percentage
          </h3>
          <div className="h-[400px]">
            <PercentageGauge percentage={data.percentage} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-100 rounded-xl shadow-xl p-6 transition-all duration-200 hover:shadow-2xl dark:shadow-dark-300/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-indigo-500" />
            History
          </h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Volume (mL)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Percentage (%)
              </span>
            </div>
          </div>
        </div>
        <div className="h-[400px]">
          <HistoryChart data={history} />
        </div>
      </div>
    </div>
  );
};
