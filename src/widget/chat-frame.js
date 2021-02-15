import { h, Component } from 'preact';

export default class ChatFrame extends Component {

    shouldComponentUpdate() {
        // do not re-render via diff:
        return false;
    }

    render({cloudchatId, host, iFrameSrc, isMobile, conf},{}) {
        let dynamicConf = window.cloudchatOnOpen || {}; // these configuration are loaded when the chat frame is opened
        let encodedConf = encodeURIComponent(JSON.stringify({...conf, ...dynamicConf}));
        return (
            <iframe src={iFrameSrc + '?id=' + cloudchatId + '&host=' + host + '&conf=' + encodedConf }
                    width='100%'
                    height={isMobile ? '94%' : '100%'}
                    frameborder='0' >
            </iframe>
        );
    }
}
