import {
  User,
} from '../lib/api'

export const rebuildProfile = profile => ({
  ...profile,
  id: profile.user.id,
  profileId: profile.id,
})

export const loginUser = async (credentials) => {
  const formData = new FormData()

  Object.entries(credentials).map(
    ([key, value]) => formData.append(key, value),
  )

  const {
    data: {
      success: message,
      data: payload,
      error,
    },
  } = await User.login(formData)
  if (error) throw Error(error)

  return {
    message,
    data: payload,
  }
};

export const registerUser = async data => User.register(data)
