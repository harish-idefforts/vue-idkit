<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="max-w-7xl mx-auto py-10 px-6 space-y-10">
      <header class="space-y-3">
        <p class="text-sm font-semibold text-primary-600 uppercase tracking-wide">
          @idefforts/vue-idkit
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-4xl font-bold">IdKit Demo</h1>
          <IdBadge variant="primary">Vue 3</IdBadge>
          <IdBadge variant="success">Tailwind</IdBadge>
        </div>
        <p class="text-lg text-slate-600 max-w-3xl">
          A condensed example page inspired by the GetLogan IdKitDemo, showing core components wired up
          via <code>app.use(IdKit)</code>.
        </p>
      </header>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <IdCard padding="p-6" shadow class="shadow-soft xl:col-span-2">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 class="text-xl font-semibold">Buttons & States</h2>
            <div class="flex gap-2">
              <IdBadge variant="warning">Primary palette</IdBadge>
              <IdBadge variant="success">Semantic</IdBadge>
            </div>
          </div>
          <div class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold text-slate-500 uppercase mb-3">Solid</h3>
              <div class="flex flex-wrap gap-3">
                <IdButton variant="primary">Primary</IdButton>
                <IdButton variant="secondary">Secondary</IdButton>
                <IdButton variant="success">Success</IdButton>
                <IdButton variant="danger">Danger</IdButton>
                <IdButton variant="warning">Warning</IdButton>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-500 uppercase mb-3">Outline</h3>
              <div class="flex flex-wrap gap-3">
                <IdButton variant="outline-primary">Outline Primary</IdButton>
                <IdButton variant="outline-secondary">Outline Secondary</IdButton>
                <IdButton variant="outline-danger">Outline Danger</IdButton>
              </div>
            </div>
          </div>
        </IdCard>

        <IdCard padding="p-6" shadow class="shadow-soft">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Toggles</h2>
            <IdBadge variant="info">Sizes & Colors</IdBadge>
          </div>
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-4">
              <IdToggle v-model="toggles.notifications" label="Enable notifications" />
              <IdToggle v-model="toggles.autoSave" color="success" label="Auto-save" />
              <IdToggle v-model="toggles.danger" color="danger" size="lg" label="Danger mode" />
            </div>
            <div class="flex flex-wrap items-center gap-4">
              <IdToggle v-model="toggles.small" size="sm" label="Small toggle" />
              <IdToggle v-model="toggles.medium" size="md" label="Medium toggle" />
              <IdToggle v-model="toggles.large" size="lg" label="Large toggle" />
            </div>
          </div>
        </IdCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <IdCard padding="p-6" shadow class="shadow-soft lg:col-span-2">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div class="space-y-1">
              <h2 class="text-xl font-semibold">Form Example</h2>
              <p class="text-slate-600">Inputs, selects, textareas, and action buttons.</p>
            </div>
            <IdBreadcrumb :items="breadcrumbItems" />
          </div>

          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IdInput v-model="form.firstName" label="First name" placeholder="Jane" required />
              <IdInput v-model="form.lastName" label="Last name" placeholder="Doe" required />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IdInput v-model="form.email" type="email" label="Email" placeholder="jane@example.com" />
              <IdSelect
                v-model="form.role"
                label="Role"
                :options="['Admin', 'Editor', 'Viewer']"
                placeholder="Select role"
              />
            </div>

            <IdTextarea
              v-model="form.notes"
              label="Notes"
              placeholder="Anything we should know?"
              :rows="4"
            />

            <div class="flex flex-wrap items-center gap-6">
              <IdToggle v-model="toggles.marketing" label="Marketing emails" />
              <IdCheckbox v-model="form.agree">I agree to the terms</IdCheckbox>
            </div>

            <div class="flex flex-wrap gap-3 pt-1">
              <IdButton variant="primary">Submit</IdButton>
              <IdButton variant="outline-secondary" type="button" @click="resetForm">Reset</IdButton>
            </div>
          </form>
        </IdCard>

        <IdCard padding="p-6" shadow class="shadow-soft">
          <h2 class="text-xl font-semibold mb-4">Alerts & Progress</h2>
          <div class="space-y-3">
            <IdAlert variant="info" title="Heads up">
              Tailwind utilities power the styling. Ensure your Tailwind content includes the library path.
            </IdAlert>
            <IdAlert variant="success" title="Success">
              Components register automatically when you call <code>app.use(IdKit)</code>.
            </IdAlert>
            <div class="space-y-2 pt-2">
              <div class="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Onboarding</span>
                <span>{{ progress }}%</span>
              </div>
              <IdProgress :value="progress" />
            </div>
          </div>
        </IdCard>
      </div>

      <IdCard padding="p-6" shadow class="shadow-soft">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 class="text-xl font-semibold">Table</h2>
          <IdTabs v-model="activeTab" :tabs="tabs" />
        </div>
        <IdTable :columns="columns" :rows="filteredRows" />
        <div class="flex justify-end mt-4">
          <IdPagination
            :page="pagination.page"
            :pages="pagination.pages"
            @change="handlePageChange"
          />
        </div>
      </IdCard>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const toggles = reactive({
  notifications: true,
  autoSave: false,
  danger: false,
  small: true,
  medium: false,
  large: true,
  marketing: true
})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  notes: '',
  agree: false
})

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.role = ''
  form.notes = ''
  form.agree = false
}

const breadcrumbItems = [
  { label: 'Home', href: '#' },
  { label: 'IdKit Demo', href: '#' },
  { label: 'Form' }
]

const progress = 68

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Archived', value: 'archived' }
]
const activeTab = ref('active')

const columns = [
  { label: 'Name', field: 'name' },
  { label: 'Role', field: 'role' },
  { label: 'Status', field: 'status' }
]

const rows = [
  { name: 'Jane Doe', role: 'Admin', status: 'Active' },
  { name: 'Alex Smith', role: 'Editor', status: 'Pending' },
  { name: 'Taylor Ray', role: 'Viewer', status: 'Inactive' },
  { name: 'Sam Lee', role: 'Admin', status: 'Active' },
  { name: 'Jordan Kim', role: 'Editor', status: 'Pending' }
]

const filteredRows = computed(() => {
  if (activeTab.value === 'pending') return rows.filter((r) => r.status === 'Pending')
  if (activeTab.value === 'archived') return rows.filter((r) => r.status === 'Inactive')
  return rows.filter((r) => r.status !== 'Inactive')
})

const pagination = reactive({
  page: 1,
  pages: 3
})

const handlePageChange = (page) => {
  pagination.page = page
}
</script>
