import React, { createContext, useContext, useMemo } from "react";
import { RANNTA } from "@rannta/sdk";

type Config = { apiKey: string; network: string };
type Ctx = { client: RANNTA };

const RANNTAContext = createContext<Ctx | null>(null);

export const RANNTAProvider: React.FC<{ config: Config; children: React.ReactNode }> = ({
  config,
  children
}) => {
  const client = useMemo(() => new RANNTA(config), [config.apiKey, config.network]);
  return <RANNTAContext.Provider value={{ client }}>{children}</RANNTAContext.Provider>;
};

export function useRANNTA() {
  const ctx = useContext(RANNTAContext);
  if (!ctx) throw new Error("useRANNTA must be used inside RANNTAProvider");
  return ctx.client;
}
