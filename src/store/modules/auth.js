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
	registerFailure: '[auth] registerFailure'
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
	}
}

export const actionTypes = {
	register: '[auth] register'
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
	}
}

export default {
	state,
	mutations,
	actions
}