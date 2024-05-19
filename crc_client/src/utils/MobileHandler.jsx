// React
import { useState, useEffect } from "react";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";

export function MobileHandler() {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= 768) {
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
