import { z } from "zod"

export const nameSchema = z
	.string({ message: "Name must not be empty" })
	.min(3, "Name must be at least 3 characters")
	.max(100, "Name must be at most 100 characters")

export const emailSchema = z
	.string({ message: "Email must not be empty" })
	.email()

export const phoneNumberSchema = z
	.string({ message: "Phone number must not be empty" })
	.min(2, "Phone number must be at least 2 characters")
	.max(40, "Phone number must be at most 40 characters")
	.transform((value, ctx) => {
		// We can use a package named "libphonenumber-js" to parse the tel number; but the package size is big

		if (isNaN(Number(value))) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Only numerical characters are allowed"
			})
			return z.NEVER
		}
	})

export const userInfoSchema = z.object({
	email: emailSchema,
	name: nameSchema,
	phoneNumber: phoneNumberSchema
})

export const formValidationSchema = z.object({
	userInfo: userInfoSchema,
	selectedPlan: z.object({
		id: z.string().min(1),
		title: z.string().min(1),
		pricePerMonth: z.number(),
		pricePerYear: z.number(),
		yearlyBonus: z.string().min(1).optional(),
		logoURL: z.string().min(1)
	}),
	addOns: z.array(
		z.object({
			id: z.string().min(1),
			title: z.string().min(1),
			description: z.string().min(1),
			pricePerMonth: z.number(),
			pricePerYear: z.number(),
			isSelected: z.boolean().optional()
		})
	),
	billingCycle: z.enum(["monthly", "yearly"])
})
