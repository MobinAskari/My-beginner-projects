import React, { FormEvent, ReactElement } from "react"

import { createContext } from "react"
import { Add_on, Plan } from "../data/data"

export type Step = {
	title: string
	component: ReactElement
}

export type selectAbleAddOn = Add_on & {
	isSelected: boolean
}

export type BillingCycle = "monthly" | "yearly"

export type UserInfo = {
	name: string | null
	email: string | null
	phoneNumber: string | null
}

export type OnSubmitReturn =
	| void
	| {
			ok: false
			errors: string
	  }
	| {
			ok: true
			data: FormContextValue["data"]
	  }

export type FormContextValue = {
	form: {
		currentStepIndex: number
		step: Step
		steps: Step[]
		isFirstStep: boolean
		isLastStep: boolean
		isCompleted: boolean
		setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
		goTo: (index: number) => void
		next: () => void
		back: () => void
		onSubmit(e: FormEvent, data: FormContextValue["data"]): OnSubmitReturn
	}
	data: {
		billingCycle: BillingCycle
		setBillingCycle: React.Dispatch<React.SetStateAction<BillingCycle>>
		userInfo: UserInfo
		setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
		selectedPlan: Plan
		setSelectedPlan: React.Dispatch<React.SetStateAction<Plan>>
		addOns: selectAbleAddOn[]
		setAddOns: React.Dispatch<React.SetStateAction<selectAbleAddOn[]>>
	}
}

export const FormContext = createContext<FormContextValue>(
	undefined as unknown as FormContextValue
)
