import authApi from "@/api/auth";
import {setItem} from "@/helpers/persistanceStorage";

const state = {
	isSubmitting: false,
	currentUser: null,
	validationErrors: null,
	isLoggedIn: null
}

export const mutationsType = {
	registerStart: '[auth] registerStart',
	registerSuccess: '[auth] registerSuccess',
	registerFailure: '[auth] registerFailure',
	
	loginStart: '[auth] loginStart',
	loginSuccess: '[auth] loginSuccess',
	loginFailure: '[auth] loginFailure'
}

const mutations = {
	[mutationsType.registerStart](state) {
		state.isSubmitting = true
		state.validationErrors = null
	},
	[mutationsType.registerSuccess](state, payload) {
		state.isSubmitting = false
		state.currentUser = payload
		state.isLoggedIn = true
	},
	[mutationsType.registerFailure](state, payload) {
		state.isSubmitting = false
		state.validationErrors = payload
	},
	[mutationsType.loginStart](state) {
		state.isSubmiting = true;
		state.validationErrors = null
	},
	[mutationsType.loginSuccess](state, payload){
		state.isSubmiting = false
		state.currentUser = payload
		state.isLoggedIn = true
	},
	[mutationsType.loginFailure](state, payload) {
		state.isSubmiting = false
		state.validationErrors = payload
	}
}

export const actionTypes = {
	register: '[auth] register',
	login: '[auth] login'
}

export const getterTypes = {
	currentUser: '[auth] currentUser',
	isLoggedIn: '[auth] isLoggedIn',
	isAnonymous: '[auth] isAnonymous'
}

const getters = {
	[getterTypes.currentUser]: state => {
		return state.currentUser
	},
	[getterTypes.isLoggedIn]: state => {
		return Boolean(state.isLoggedIn)
	},
	[getterTypes.isAnonymous]: state => {
		return state.isLoggedIn === false
	}
}

const actions = {
	[actionTypes.register](context, credentials) {
		return new Promise(resolve => {
			context.commit(mutationsType.registerStart)
			authApi.register(credentials)
				.then(response => {
					context.commit(mutationsType.registerSuccess, response.data.user)
					setItem('accessToken', response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result => {
					context.commit(mutationsType.registerFailure, result.response.data.errors)
				})
		})
		/*setTimeout(() => {
			context.commit('registerStart')
		}, 1000)*/
	},
	
	[actionTypes.login](context, credentials) {
		return new Promise(resolve => {
			context.commit(mutationsType.loginStart)
			authApi.login(credentials)
				.then(response => {
					context.commit(mutationsType.loginSuccess, response.data.user)
					setItem('accessToken', response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result => {
					context.commit(mutationsType.loginFailure, result.response.data.errors)
				})
		})
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}