import { useEffect } from "react";
import { useAlert } from "../context/AlertContext";

export default function useSseAlert() {
  const { openAlert } = useAlert();

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/sse/alerts"
    );

    eventSource.addEventListener("alert", (event) => {
      openAlert({
        title: "알림",
        description: event.data,
      });
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [openAlert]);
}
