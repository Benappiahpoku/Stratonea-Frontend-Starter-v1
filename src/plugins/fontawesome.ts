import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import icons you need from each style
import {
    faUser,
    faSpinner,
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faPlusCircle,
    faDownload,
    faCog,
    faBell,
    faCopy,
    faTimes,
    faEnvelope,
    faMobileScreen,
    faEye,
    faTrash,
    faTriangleExclamation,
    faReceipt,
    faArrowLeft,
    faBox,
    faListAlt,
    faCircle as fasCircle,
    // ===== [New Icons] START =====
    faChartBar,          // For Sales card icon
    faUsers,             // For Customers card icon
    faWarehouse,         // For Stock card icon
    faBuilding,          // For Company Info card icon
    faChartLine,         // For Reports card and stats
    faClock,             // For pending orders stat
    faExclamationTriangle, // For low stock alert (alternative name)
    faUserPlus,          // For new customer activity
    faShoppingCart,      // For sales activity
    faInfoCircle,        // For general info/fallback activity
    // ===== [New Icons] END =====
} from '@fortawesome/free-solid-svg-icons'

import {
    faBell as farBell,

} from '@fortawesome/free-regular-svg-icons'

import {
    faWhatsapp,
    faGithub
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    // Solid icons
    faUser,
    faSpinner,
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faCog,
    faBell,
    faPlusCircle,
    faDownload,
    faCopy,
    faTimes,
    faEnvelope,
    faMobileScreen,
    faArrowLeft,
    faBox,
    faListAlt,
    faEye,
    faTrash,
    faTriangleExclamation,
    faReceipt,
    // ===== [New Icons] START =====
    faChartBar,
    faUsers,
    faWarehouse,
    faBuilding,
    faChartLine,
    faClock,
    faExclamationTriangle,
    faUserPlus,
    faShoppingCart,
    faInfoCircle,
    // ===== [New Icons] END =====
    // Regular icons
    farBell,
    fasCircle,
    // Brand icons
    faWhatsapp,
    faGithub
)

export { FontAwesomeIcon }