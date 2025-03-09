import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { FormProvider } from "./providers/form-provider.tsx"
import StepOne from "./components/step-one.tsx"
import StepTwo from "./components/step-two.tsx"
import StepThree from "./components/step-three.tsx"
import StepFour from "./components/step-four.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<FormProvider
			steps={[
				{
					title: "Your info",
					component: <StepOne />
				},
				{
					title: "Select plan",
					component: <StepTwo />
				},
				{
					title: "Add-ons",
					component: <StepThree />
				},
				{
					title: "Summary",
					component: <StepFour />
				}
			]}
		>
			<App />
		</FormProvider>
	</StrictMode>
)
