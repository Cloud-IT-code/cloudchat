import { h, render } from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './default-configuration';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

function injectChat() {
    if (!window.cloudchatId) {
        console.error('Silakan atur window.cloudchatId (lihat contoh di github.com/Cloud-IT-code/cloudchat)');
    } else {
        let root = document.createElement('div');
        root.id = 'cloudchatRoot';
        document.getElementsByTagName('body')[0].appendChild(root);
        const server = window.cloudchatServer || 'https://livecloudchat.herokuapp.com';
        const iFrameSrc = server + '/chat.html';
        const host = window.location.host || 'unknown-host';
        const conf = { ...defaultConfiguration, ...window.cloudchatCustomizations };

        render(
            <Widget cloudchatId={window.cloudchatId}
                    host={host}
                    isMobile={window.screen.width < 500}
                    iFrameSrc={iFrameSrc}
                    conf={conf}
            />,
            root
        );

        try {
            const request = new XMLHttpRequest();
            request.open('POST', server + '/usage-start?host=' + host);
            request.send();
        } catch (e) { /* Fail silently */ }

    }

}
