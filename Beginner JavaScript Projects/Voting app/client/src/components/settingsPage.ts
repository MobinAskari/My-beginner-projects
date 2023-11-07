import { urlSetter } from "../router/urlSetter";
import database from "../server/db";
import type { UserAPIResponse } from "../types/user.types";
import handleAlertElement from "../utils/handleAlertElement";
import { clearButtonLoadingState, setButtonLoadingState } from "../utils/loadingIndicators";
import { setOnMountTheme } from "../utils/themeToggler";
import { generateContainer } from "./getContainer";
import { getUserPfpImg } from "./getUserProfilePic";
import addHeader from "./header";
import { showLoginPage } from "./loginpage";
import addSidebar from "./sidebar";
import * as _ from 'lodash';

export default async function showSettingsPage() {
	await database.collection('users').authRefresh();

	const isAuthorized = database.authStore.isValid && database.authStore.model != null;

	if (!isAuthorized) {
		alert("You're not authorized");
		showLoginPage();
		return;
	}

	let user = () => database.authStore.model as UserAPIResponse;
	const userCopy: UserAPIResponse = _.cloneDeep(user());

	urlSetter('settings');

	await addHeader();
	await addSidebar();

	const container = generateContainer();
	container.classList.add('container', 'settingsCon', 'hasHeader', 'hasSidebar');

	const { metadata } = user();
	const userBirthDateForDateInput = () => {
		const date = new Date(metadata.birthDate);
		if (date.toString() === 'Invalid Date') return false;

		const splitted = date.toISOString().split('-')
		return `${splitted[0]}-${splitted[1]}-${splitted[2].slice(0, 2)}`;
	}

	container.innerHTML = `
		<div class="head-ux-actions-container">
		<button class="back-btn">
			<a href="/home">
				<span class="material-symbols-rounded">arrow_back</span>
			</a>
		</button>
		</div>
		<div class="add-section horizontal">
		<div class="current-profile-picture-wrapper">
			${await getUserPfpImg()}
			<!-- 
			<img src="/pfps/profile-2.jpg" alt="">
			<svg>
			 <use href="/icons.svg#icon_userNoPfp">
			</svg>
			-->
		</div>
		<div class="profile-picture-actions-container">
			<div class="profile-picture-actions-buttons">
				<button class="def-btn blue">Upload a new photo</button>
				${user().profile_picture ? `<button class="hollow-btn red js-remove-btn">Remove</button>` : ''}
			</div>
			<div class="profile-picture-actions-description">
			<p>Supports all image formats with a max size of 3MB</p>
			</div>
		</div>
		</div>
		<div class="add-section">
		<div class="horiz-space-between">
			<label for="usernameInput" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_userNoPfp"></use>
			</svg>
			<p>Username:</p>
			</label>
			<button class="editBtn" data-open-edit-for="usernameInput" data-target-is-open="false">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_pencil"></use>
			</svg>
			</button>
		</div>
		<input type="text" id="usernameInput" class="js-poll-title-input usernameInput" placeholder="..." value="${user().username}" disabled="true"
		data-user-obj-property-name="username">
		</div>
		<div class="add-section">
		<div class="horiz-space-between">
			<label for="emailInput" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_mail"></use>
			</svg>
			<p>Email:</p>
			</label>
			<button class="editBtn" data-open-edit-for="emailInput" data-target-is-open="false">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_pencil"></use>
			</svg>
			</button>
		</div>
		<input type="text" id="emailInput" class="js-poll-title-input emailInput" placeholder="..." value="${user().email}" disabled="true"
		data-user-obj-property-name="email">
		</div>
		<div class="add-section">
		<label for="firstPasswordInput" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
			<use href="/icons.svg#icon_mail"></use>
			</svg>
			<p>Change your password:</p>
		</label>
		<input type="password" id="firstPasswordInput" class="js-poll-title-input" placeholder="Current password">
		<input type="password" id="newPasswordInput" class="js-poll-title-input" placeholder="New password">
		<input type="password" id="newPasswordReenterInput" class="js-poll-title-input"
			placeholder="New password reenter">
		<button class="form__submit-btn">Forgot your password?</button>
		</div>
		<div class="add-section">
		<div class="horiz-space-between">
			<label for="always-loggedin-checkbox" class="add-section-input-label">
			<svg width="1.25rem" height="1.25rem">
				<use href="/icons.svg#icon_settings"></use>
			</svg>
			<p>Always stay logged-in:</p>
			</label>
			<div class="add-slots-container">
			<input type="checkbox" id="always-loggedin-checkbox" class="always-open-checkbox" ${user().settings.stayLoggedIn && 'checked'} data-user-obj-property-name="settings:stayLoggedIn">
			<label for="always-loggedin-checkbox" class="always-open-checkbox-label"></label>
			</div>
		</div>
		<div class="horiz-space-between">
			<label for="themesSelect" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_sun"></use>
			</svg>
			<p>Theme:</p>
			</label>
			<div class="form__part-inputs">
			<select name="themesSelect" id="themesSelect" data-user-obj-property-name="settings:theme">
				<option 
				${user().settings.theme === 'dark-mode' && 'selected'} 
				value="dark-mode">dark-mode</option>
				<option 
				${user().settings.theme === 'light-mode' && 'selected'} 
				value="light-mode">light-mode</option>
			</select>
			</div>
		</div>

		</div>
		<div class="add-section">
		<div class="horiz-space-between">
			<label for="genderSelect" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_userNoPfp"></use>
			</svg>
			<p>Gender:</p>
			</label>
			<div class="form__part-inputs">
			<select id="genderSelect" data-user-obj-property-name="metadata:gender">
				<option ${metadata.gender === 'null' && 'selected'} value="null">Not specified</option>
				<option ${metadata.gender === 'male' && 'selected'} value="male">Male</option>
				<option ${metadata.gender === 'female' && 'selected'} value="female">Female</option>
			</select>
			</div>
		</div>
		<div class="horiz-space-between">
			<label for="ageInput" class="add-section-input-label">
			<svg width="1.4rem" height="1.4rem">
				<use href="/icons.svg#icon_calendar"></use>
			</svg>
			<p>Birth date:</p>
			</label>
			<div class="form__part-inputs">
			<input type="date" id="ageInput" value="${userBirthDateForDateInput()}"} data-user-obj-property-name="metadata:birthDate">
			</div>
		</div>
		<div class="horiz-space-between">
			<label for="bioInput" class="add-section-input-label">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_chat"></use>
			</svg>
			<p>Your bio</p>
			</label>
			<button class="editBtn" data-open-edit-for="bioInput" data-target-is-open="false">
			<svg width="1.5rem" height="1.5rem">
				<use href="/icons.svg#icon_pencil"></use>
			</svg>
			</button>
		</div>
		<input name="bioInput" class="bioInput" id="bioInput" disabled="true" data-user-obj-property-name="metadata:bio" value="${user().metadata.bio}">
		<!-- 
		<textarea name="bioInput" class="bioInput" id="bioInput" disabled="true"></textarea>
		-->
		</div>
		<div class="add-section">
		<div class="social-media-con">
			<div class="social-media-logo">
			<img src="/icons/icons8-twitter-240.svg" alt="">
			</div>
			<div class="social-media-meta">
			<div class="social-media-meta-description">
				<h3>Twitter</h3>
				<p>Link your account and sign-in using it!</p>
			</div>
			<div class="social-media-meta-action">
				<button class="form__submit-btn" disabled>Link</button>
			</div>
			</div>
			</div>
		</div>
		<p class="alertElement hidden" style="align-self: center;"></p>
		<button class="form__submit-btn submitBtn">Save changes</button>
  	`;

	const editBtns = [...document.querySelectorAll('.editBtn')] as HTMLButtonElement[];

	editBtns.forEach(btn => btn.addEventListener('click', () => handleEditBtn(btn)));

	const submitBtn = document.querySelector('.submitBtn') as HTMLButtonElement;

	const alertElement = document.querySelector('.alertElement') as HTMLParagraphElement;

	submitBtn.addEventListener('click', async () => await handleSettingsUpdate(user(), userCopy));

	const removeButton = document.querySelector('.js-remove-btn') as HTMLButtonElement;

	removeButton?.addEventListener('click', async () => {
		userCopy.profile_picture = '';
		try {
			setButtonLoadingState(removeButton)
			setButtonLoadingState(submitBtn)

			if (_.isEqual(user, userCopy)) return;

			const result = await updateSettings(userCopy)

			if (!result) return;

			handleAlertElement(
				alertElement,
				result.message,
				result.status
			);

			clearButtonLoadingState(removeButton, 'remove');
			clearButtonLoadingState(submitBtn, 'Save changes');
		} catch (error) {

		}
	});

}

const handleSettingsUpdate = async (
	user: UserAPIResponse,
	userCopy: UserAPIResponse
) => {
	const allInputs = [...document.querySelectorAll('[data-user-obj-property-name]')] as HTMLInputElement[];

	const alertElement = document.querySelector('.alertElement') as HTMLParagraphElement;

	const submitBtn = document.querySelector('.submitBtn') as HTMLButtonElement;

	allInputs.map(input => {
		const propertyName = input.dataset.userObjPropertyName;

		if (!propertyName) return;

		const { value, checked }: {
			value: string,
			checked: boolean
		} = input;

		const [mainProp, childProp] = propertyName.split(':');

		if (!(mainProp in userCopy)) return;

		//@ts-ignore
		if (userCopy[mainProp][childProp]) {
			//@ts-ignore
			if (typeof userCopy[mainProp][childProp] === 'boolean') {
				//@ts-ignore
				userCopy[mainProp][childProp] = checked
			}
			//@ts-ignore
			if (typeof userCopy[mainProp][childProp] === 'string') {
				//@ts-ignore
				userCopy[mainProp][childProp] = value
			}
			return;
		}

		//@ts-ignore
		if (typeof userCopy[mainProp] === 'boolean') {
			//@ts-ignore
			userCopy[mainProp] = checked
		}
		//@ts-ignore
		if (typeof userCopy[mainProp] === 'string') {
			//@ts-ignore
			userCopy[mainProp] = value
		}

		return;
		/*
		const main = user[mainProp as keyof typeof user];
		if (!main) return;
		const child = main[childProp as keyof typeof main];
		if (!child) {
			if (typeof user[mainProp] === 'boolean') {
				user[mainProp] = checked
			}
			if (typeof user[mainProp] === 'string') {
				user[mainProp] = value
			}
			return;
		}
		if (typeof main[childProp] === 'boolean') {
			main[childProp] = checked
		}
		if (typeof main[childProp] === 'string') {
			main[childProp] = value
		}
		*/
	});

	console.log(user.settings.theme, userCopy.settings.theme);

	if (_.isEqual(user, userCopy)) return;

	try {
		setButtonLoadingState(submitBtn, 'Updating...');

		const updateResult = await updateSettings(userCopy);

		setOnMountTheme();

		handleAlertElement(
			alertElement,
			updateResult.message,
			updateResult.status
		);
	} catch (error) {
		console.log(error);
	}

	clearButtonLoadingState(
		submitBtn,
		'Save changes'
	);
}

const handleEditBtn = (
	btn: HTMLButtonElement,
) => {
	const { openEditFor, targetIsOpen } = btn.dataset;
	if (!openEditFor || !targetIsOpen) return;

	const elementToOpenEditFor = document.querySelector(`.${openEditFor}`) as HTMLInputElement;

	if (!elementToOpenEditFor) return;

	elementToOpenEditFor.disabled = !elementToOpenEditFor.disabled;

	if (targetIsOpen === 'false') {
		elementToOpenEditFor.disabled = false;
		elementToOpenEditFor.focus();
		elementToOpenEditFor.selectionStart = elementToOpenEditFor.value.length;
		elementToOpenEditFor.selectionEnd = elementToOpenEditFor.value.length;
		btn.style.color = 'var(--rose800)'
		btn.dataset.targetIsOpen = 'true';
	} else {
		elementToOpenEditFor.disabled = true;
		btn.style.color = 'var(--neutral50)';
		btn.dataset.targetIsOpen = 'false';
	}
}

const updateSettings = async (user: UserAPIResponse): Promise<{
	status: 'success' | 'error';
	message: string;
}> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 500));

		await database.collection('users').update(user.id, user);

		await database.collection('users').authRefresh();

		return {
			status: 'success',
			message: 'Your changes have successfully been updated'
		}

	} catch (error) {
		const apiHealthStatus = await database.health.check();

		if (apiHealthStatus.code === 200) {
			return {
				status: 'error',
				message: String(error)
			}
		}

		return {
			status: 'error',
			message: 'There was a problem with connecting to database, please check your internet connection and try again later'
		}
	}
}