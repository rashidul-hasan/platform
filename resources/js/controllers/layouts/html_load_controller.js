import { Controller } from 'stimulus';
import Turbolinks from 'turbolinks';
import axios from 'axios';
import platform from '../../platform';

export default class extends Controller {
    /**
     *
     */
    initialize() {
        Turbolinks.start();
        Turbolinks.setProgressBarDelay(50);
        window.platform = platform();
    }

    /**
     *
     */
    connect() {
        this.csrf();
    }

    /**
     * We'll load the axios HTTP library which allows us to easily issue requests
     * to our Laravel back-end. This library automatically handles sending the
     * CSRF token as a header based on the value of the "XSRF" token cookie.
     */
    csrf() {
        const token = document.head.querySelector('meta[name="csrf_token"]');
        window.axios = axios;

        /**
         * Next we will register the CSRF Token as a common header with Axios so that
         * all outgoing HTTP requests automatically have it attached. This is just
         * a simple convenience so we don't have to attach every token manually.
         */
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
        window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    /**
     *
     */
    goToTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}
