// React
import { useState, useEffect } from "react";

// Componentes
import { CustomNavbar } from "../../components/indexPage/CustomNavbar";

// import { HeadIcons } from "../../components/indexPage/...HeadIcons";
import { HomeSection } from "../../components/indexPage/HomeSection";
import { OurTeam } from "../../components/indexPage/OurTeam";
import { InfoSection } from "../../components/indexPage/InfoSection";
import { PricesSection } from "../../components/indexPage/PricesSection";
import { ContactSection } from "../../components/indexPage/ContactSection";
import { FooterSection } from "../../components/indexPage/FooterSection";
import { EndPage } from "../../components/indexPage/EndPage";
import { AboutUs } from "../../components/indexPage/AboutUs";
import { ExampleCase } from "../../components/indexPage/ExampleCase";

// Pixel
import { MetaPixel } from "./MetaPixel";

// Api
import { getPrograms } from "../../api/program";
import { getKines } from "../../api/kine";

export function Index() {
    // Programas
    const [programs, setPrograms] = useState([]);

    // Programa para agendar
    const [program, setProgram] = useState("");

    // Kines
    const [kines, setKines] = useState([]);

    // Cargar programas
    const [loading, setLoading] = useState(true);

    // Obtener los programas
    const getBackedData = async () => {
        try {
            const res = await getPrograms();

            setPrograms(res.data);

            res.data.forEach((element) => {
                if (element.agenda) {
                    if (element.on_sale) {
                        const formattedPrice = `$${element.on_sale_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                        setProgram(`${formattedPrice}`);
                    } else {
                        const formattedPrice = `$${element.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                        setProgram(`${formattedPrice}`);
                    }
                }
            });

            const res2 = await getKines();

            setKines(res2.data);

            setLoading(false);
        } catch (error) {
            console.log("Hubo un error inesperado");
        }
    };

    function handleReload() {
        setTimeout(() => {
            getBackedData();
        }, 500);
    }

    // Obtener los programas al cargar el componente
    useEffect(() => {
        handleReload();
    }, []);

    return (
        <div>
            <MetaPixel />
            <CustomNavbar />
            {/* <HeadIcons /> */}
            <HomeSection />
            {/* <OurTeam kines={kines} loading={loading} /> */}
            <InfoSection />
            {/* <AboutUs /> */}
            {/* <ExampleCase /> */}
            <PricesSection
                program={program}
                programs={programs}
                loading={loading}
            />
            <ContactSection />
            <FooterSection />
            <EndPage />
        </div>
    );
}
