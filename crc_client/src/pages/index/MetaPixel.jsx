export function MetaPixel() {
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
        <html {...htmlAttrs}>
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
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
            </head>
            <body {...bodyAttrs}>
                <div id="content">// React stuff here</div>
            </body>
        </html>
    );
}