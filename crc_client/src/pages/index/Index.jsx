import { CustomNavbar } from "../../components/indexPage/CustomNavbar";
import { HeadIcons } from "../../components/indexPage/HeadIcons";
import { HomeSection } from "../../components/indexPage/HomeSection";
import { InfoSection } from "../../components/indexPage/InfoSection";
import { PricesSection } from "../../components/indexPage/PricesSection";
import { ContactSection } from "../../components/indexPage/ContactSection";
import { FooterSection } from "../../components/indexPage/FooterSection";
import { EndPage } from "../../components/indexPage/EndPage";

export function Index() {
    return (
        <div>
            <CustomNavbar />
            <HeadIcons />
            <HomeSection />
            <InfoSection />
            {/* <PricesSection /> */}
            <ContactSection />
            <FooterSection />
            <EndPage />
        </div>
    );
}
