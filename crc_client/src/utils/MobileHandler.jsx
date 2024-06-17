// React
import { useState, useEffect } from "react";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";

export function MobileHandler() {
    const [isMobile, setIsMobile] = useState(false);

    // X-Small	None < 576px
    // Small	sm	≥ 576px
    // Medium	md	≥ 768px
    // Large	lg	≥ 992px
    // Extra large	xl ≥ 1200px
    // Extra extra large xxl ≥ 1400px
    const handleResize = () => {
        if (window.innerWidth <= 992) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        Aos.init({ duration: 1000, once: true });

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        isMobile,
    };
}
