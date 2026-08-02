"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function subscribeToConnectivity(onStoreChange: () => void) {
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);

  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getServerOnlineSnapshot() {
  return true;
}

export function PwaControls() {
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const refreshingRef = useRef(false);
  const isOnline = useSyncExternalStore(
    subscribeToConnectivity,
    getOnlineSnapshot,
    getServerOnlineSnapshot,
  );
  const isOffline = !isOnline;

  useEffect(() => {
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    let disposed = false;
    let removeRegistrationUpdateListener: (() => void) | undefined;

    if (
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => {
          if (disposed) return;

          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
          }

          const observedWorkers = new WeakSet<ServiceWorker>();
          const observeInstallation = (installingWorker: ServiceWorker | null) => {
            if (!installingWorker || observedWorkers.has(installingWorker)) return;
            observedWorkers.add(installingWorker);

            const handleStateChange = () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setWaitingWorker(installingWorker);
              }

              if (
                installingWorker.state === "installed" ||
                installingWorker.state === "redundant"
              ) {
                installingWorker.removeEventListener(
                  "statechange",
                  handleStateChange,
                );
              }
            };

            installingWorker.addEventListener("statechange", handleStateChange);
            handleStateChange();
          };

          const handleUpdateFound = () => {
            observeInstallation(registration.installing);
          };

          // register() already checks for a newer worker. Observe an update that
          // may have started before its promise resolved instead of forcing a
          // second, immediate update() call on an unstable registration.
          observeInstallation(registration.installing);
          registration.addEventListener("updatefound", handleUpdateFound);
          removeRegistrationUpdateListener = () =>
            registration.removeEventListener("updatefound", handleUpdateFound);
        })
        .catch(() => {
          // The site remains fully usable if registration is blocked.
        });

      const handleControllerChange = () => {
        if (refreshingRef.current) return;
        refreshingRef.current = true;
        window.location.reload();
      };

      navigator.serviceWorker.addEventListener(
        "controllerchange",
        handleControllerChange,
      );

      return () => {
        disposed = true;
        removeRegistrationUpdateListener?.();
        window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
        window.removeEventListener("appinstalled", handleInstalled);
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          handleControllerChange,
        );
      };
    }

    return () => {
      disposed = true;
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const applyUpdate = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
  };

  if (!installPrompt && !isOffline && !waitingWorker) return null;

  return (
    <aside className="pwa-controls" aria-live="polite" aria-label="Estado de la aplicación">
      {isOffline && (
        <p>
          <strong>Estás sin conexión.</strong> Puedes seguir consultando las
          páginas visitadas.
        </p>
      )}
      {installPrompt && (
        <button type="button" onClick={installApp}>
          Instalar FrescoCerca
        </button>
      )}
      {waitingWorker && (
        <button type="button" onClick={applyUpdate}>
          Actualizar aplicación
        </button>
      )}
    </aside>
  );
}
