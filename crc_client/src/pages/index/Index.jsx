import { Fragment } from "react";

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
            <Fragment>
                {/* Meta Pixel Code */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '818883853621692');
          fbq('track', 'PageView');
        `,
                    }}
                />
                {/* End Meta Pixel Code */}
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=818883853621692&ev=PageView&noscript=1"
                    />
                </noscript>
            </Fragment>

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
