import ArcadeSVG from "/assets/images/icon-arcade.svg?url"
import AdvancedSVG from "/assets/images/icon-advanced.svg?url"
import ProSVG from "/assets/images/icon-pro.svg?url"

export type Plan = {
	id: string
	title: "Arcade" | "Advanced" | "Pro"
	/** In USD */
	pricePerMonth: number
	/** In USD */
	pricePerYear: number
	yearlyBonus?: string
	logoURL: string
}

export type Add_on = {
	id: string
	title: string
	description: string
	/** In USD */
	pricePerMonth: number
	/** In USD */
	pricePerYear: number
}

export const PLANS: ReadonlyArray<Plan> = [
	{
		id: "arcade-osbz0t7ma0r",
		title: "Arcade",
		pricePerMonth: 9,
		pricePerYear: 90,
		yearlyBonus: "2 months free",
		logoURL: ArcadeSVG
	},
	{
		id: "advanced-ayl2j3tskv",
		title: "Advanced",
		pricePerMonth: 12,
		pricePerYear: 120,
		yearlyBonus: "2 months free",
		logoURL: AdvancedSVG
	},
	{
		id: "pro-3sd0pcz62ir",
		title: "Pro",
		pricePerMonth: 15,
		pricePerYear: 150,
		yearlyBonus: "2 months free",
		logoURL: ProSVG
	}
]

export const ADD_ONS: ReadonlyArray<Add_on> = [
	{
		id: "online-service-88fhl3l0wbd",
		title: "Online service",
		description: "Access to multiplayer games",
		pricePerMonth: 1,
		pricePerYear: 10
	},
	{
		id: "larger-storage-s5iwa2en9s",
		title: "Larger storage",
		description: "Extra 1TB of cloud save",
		pricePerMonth: 2,
		pricePerYear: 20
	},
	{
		id: "customizable-profile-2k7x7ez2anw",
		title: "Customizable Profile",
		description: "Custom theme on your profile",
		pricePerMonth: 2,
		pricePerYear: 20
	}
]
