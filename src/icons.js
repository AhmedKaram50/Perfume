import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import {
    faFacebookF,
    faGithub,
    faTwitter,
    faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faFacebookF,
    faGithub,
    faTwitter,
    faLinkedinIn,
);

import {
    faHeart,
    faUser,
    faShoppingCart,
    faBars,
    faTimes,
    faRadiation,
    faHeartbeat,
    faPrescriptionBottle,
    faCoins,
    faWineBottle,
    faMagic,
    faShower,
    faChevronRight,
    faPlay,
    faClock,
    faUserPlus,
    faPen,
    faSignOutAlt,

} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHeart,
    faUser,
    faShoppingCart,
    faBars,
    faTimes,
    faRadiation,
    faHeartbeat,
    faPrescriptionBottle,
    faCoins,
    faWineBottle,
    faMagic,
    faShower,
    faChevronRight,
    faPlay,
    faClock,
    faUserPlus,
    faPen,
    faSignOutAlt
);

Vue.component("fa-icon", FontAwesomeIcon);