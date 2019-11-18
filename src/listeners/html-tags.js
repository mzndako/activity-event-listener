import { linkClick, buttonClick } from '../event-emitter/constants';
import { trigger } from '../event-emitter';

const activate = () => {
    if (typeof document === 'undefined') {
        return;
    }
    const targetNode = document.querySelector('body');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function () {
        linkListener();
        buttonListener();
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
};

const linkListener = () => {
    document.querySelectorAll('a:not([data-activity-event-listener])[href]').forEach((link) => {
        link.addEventListener('click', function () {
            const event = {
                link: this.href,
                name: this.innerText
            };
            trigger(event, linkClick);
        });
        link.setAttribute('data-activity-event-listener', true);
    });
};

const buttonListener = () => {
    document.querySelectorAll('button:not([data-activity-event-listener])[href]').forEach((button) => {
        button.addEventListener('click', function () {
            const event = {
                name: this.innerText
            };
            trigger(event, buttonClick);
        });
        button.setAttribute('data-activity-event-listener', true);
    });
};

activate();