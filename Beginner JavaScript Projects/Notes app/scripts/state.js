import { onboarding } from "./modals.js"
import { folders } from "./components.js"

export let states = JSON.parse(sessionStorage.getItem('states')) ?? {
  isLogined: false,
}

if (!states.isLogined) {
  onboarding('signin');
} else {
  folders()
}