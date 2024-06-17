// Componentes
import { CustomNavbar } from "../../components/indexPage/CustomNavbar";
import { FooterSection } from "../../components/indexPage/FooterSection";
import { EndPage } from "../../components/indexPage/EndPage";
import { AttentionProgress } from "../../components/indexPage/AttentionProgress";

export function Attention() {
    return (
        <div>
            <CustomNavbar />
            <AttentionProgress />
            <FooterSection />
            <EndPage />
        </div>
    );
}
