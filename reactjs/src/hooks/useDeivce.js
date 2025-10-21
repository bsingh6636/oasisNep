import { useEffect, useState } from "react";

function useDevice() {
  const [device, setDevice] = useState({
    isMobile: window.innerWidth < 768,
    isMobileOrTab: window.innerWidth < 1024,
    isLargeDevice: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const update = () =>
      setDevice({
        isMobile: window.innerWidth < 768,
        isMobileOrTab: window.innerWidth < 1024,
        isLargeDevice: window.innerWidth >= 1024,
      });

    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return device;
}

export default useDevice;
