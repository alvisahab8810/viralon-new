// hooks/useEmployeePresence.js
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";

export function useEmployeePresence(employee) {
  useEffect(() => {
    if (!employee?._id) return;

    // Ensure server initialized (safe no-op after first call)
    fetch("/api/socket");

    const socket = getSocket();

    const identify = () => {
      socket.emit("employee:identify", {
        employeeId: employee._id,
        name: `${employee.firstName} ${employee.lastName}`,
      });
    };

    socket.on("connect", identify);

    // Send initial identify immediately (in case already connected)
    if (socket.connected) identify();

    // Heartbeat every 30s
    const hb = setInterval(() => {
      socket.emit("employee:heartbeat", { employeeId: employee._id });
    }, 30_000);

    return () => {
      socket.off("connect", identify);
      clearInterval(hb);
      // don't disconnect globally; other parts may use it.
    };
  }, [employee]);
}
