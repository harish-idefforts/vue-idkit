// Vue-IdKit - idefforts Component Library
// Vue 3 components with Tailwind CSS styling

// Form Components
import IdButton from './components/IdButton.vue'
import IdInput from './components/IdInput.vue'
import IdSelect from './components/IdSelect.vue'
import IdTextarea from './components/IdTextarea.vue'
import IdCheckbox from './components/IdCheckbox.vue'
import IdRadio from './components/IdRadio.vue'
import IdToggle from './components/IdToggle.vue'

// Layout Components
import IdCard from './components/IdCard.vue'
import IdSidebar from './components/IdSidebar.vue'
import IdSidebarLogo from './components/IdSidebarLogo.vue'
import IdSidebarCta from './components/IdSidebarCta.vue'
import IdSidebarItemGroup from './components/IdSidebarItemGroup.vue'

// UI Components
import IdModal from './components/IdModal.vue'
import IdTable from './components/IdTable.vue'
import IdDropdown from './components/IdDropdown.vue'
import IdBadge from './components/IdBadge.vue'
import IdAlert from './components/IdAlert.vue'
import IdAccordion from './components/IdAccordion.vue'

// Navigation Components
import IdTabs from './components/IdTabs.vue'
import IdPagination from './components/IdPagination.vue'
import IdBreadcrumb from './components/IdBreadcrumb.vue'

// Feedback Components
import IdTooltip from './components/IdTooltip.vue'
import IdSpinner from './components/IdSpinner.vue'
import IdProgress from './components/IdProgress.vue'
import IdToast from './components/IdToast.vue'

// Export composables
export { useIdTheme } from './composables/useIdTheme'

// Export components individually
export {
  // Form Components
  IdButton,
  IdInput,
  IdSelect,
  IdTextarea,
  IdCheckbox,
  IdRadio,
  IdToggle,
  // Layout Components
  IdCard,
  IdSidebar,
  IdSidebarLogo,
  IdSidebarCta,
  IdSidebarItemGroup,
  // UI Components
  IdModal,
  IdTable,
  IdDropdown,
  IdBadge,
  IdAlert,
  IdAccordion,
  // Navigation Components
  IdTabs,
  IdPagination,
  IdBreadcrumb,
  // Feedback Components
  IdTooltip,
  IdSpinner,
  IdProgress,
  IdToast
}

// Default export with all components
export default {
  IdButton,
  IdInput,
  IdSelect,
  IdTextarea,
  IdCheckbox,
  IdRadio,
  IdToggle,
  IdCard,
  IdSidebar,
  IdSidebarLogo,
  IdSidebarCta,
  IdSidebarItemGroup,
  IdModal,
  IdTable,
  IdDropdown,
  IdBadge,
  IdAlert,
  IdAccordion,
  IdTabs,
  IdPagination,
  IdBreadcrumb,
  IdTooltip,
  IdSpinner,
  IdProgress,
  IdToast
}

/**
 * Install function for Vue plugin
 * Usage: app.use(IdKit)
 */
export const IdKit = {
  install(app) {
    // Form Components
    app.component('IdButton', IdButton)
    app.component('IdInput', IdInput)
    app.component('IdSelect', IdSelect)
    app.component('IdTextarea', IdTextarea)
    app.component('IdCheckbox', IdCheckbox)
    app.component('IdRadio', IdRadio)
    app.component('IdToggle', IdToggle)
    // Layout Components
    app.component('IdCard', IdCard)
    app.component('IdSidebar', IdSidebar)
    app.component('IdSidebarLogo', IdSidebarLogo)
    app.component('IdSidebarCta', IdSidebarCta)
    app.component('IdSidebarItemGroup', IdSidebarItemGroup)
    // UI Components
    app.component('IdModal', IdModal)
    app.component('IdTable', IdTable)
    app.component('IdDropdown', IdDropdown)
    app.component('IdBadge', IdBadge)
    app.component('IdAlert', IdAlert)
    app.component('IdAccordion', IdAccordion)
    // Navigation Components
    app.component('IdTabs', IdTabs)
    app.component('IdPagination', IdPagination)
    app.component('IdBreadcrumb', IdBreadcrumb)
    // Feedback Components
    app.component('IdTooltip', IdTooltip)
    app.component('IdSpinner', IdSpinner)
    app.component('IdProgress', IdProgress)
    app.component('IdToast', IdToast)
  }
}
