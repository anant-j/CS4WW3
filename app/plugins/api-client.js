export default (context, inject) => {
  inject('api', api)
  context.$api = api
}

const api = {
  login(email, password) {
    return postAPI('/api/login', {
      email,
      password,
    })
  },
  register(email, password, firstName, lastName, dob, latitude, longitude) {
    return postAPI('/api/register', {
      firstName,
      lastName,
      email,
      password,
      dob,
      latitude,
      longitude,
    })
  },
  verifyToken(token, email) {
    return postAPI('/api/verifyJWT', {
      token,
      email,
    })
  },
  addRestaurant(
    name,
    description,
    latitude,
    longitude,
    website = null,
    phone = null,
    token = null,
    image = null
  ) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('website', website)
    formData.append('phone', phone)
    formData.append('token', token)
    formData.append('image', image)
    const data = fetch('/api/addRestaurant', {
      method: 'POST',
      body: formData,
    })
    return data
    // return postAPI('/api/addRestaurant', {
    //   name,
    //   description,
    //   latitude,
    //   longitude,
    //   website,
    //   phone,
    //   token,
    //   image
    // })
  },
  addReview(restaurantId, title, rating, review, token) {
    return postAPI('/api/addReview', {
      restaurantId,
      title,
      rating,
      review,
      token,
    })
  },
  getRestaurant(id, token) {
    return getAPI('/api/getRestaurant', { id })
  },
  getRestaurants(name = null, rating = null) {
    if (name) {
      return getAPI('/api/getRestaurants', { name })
    } else if (rating) {
      return getAPI('/api/getRestaurants', { rating })
    } else {
      return getAPI('/api/getRestaurants')
    }
  },
  getReviews(id) {
    return getAPI('/api/getReviews', { id })
  },
}

function postAPI(url, body) {
  const data = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return data
}

function getAPI(url, parameters = null) {
  let baseUrl="https://4ww3.anant-j.com";
  if (process.browser){
    baseUrl = window.location.origin;
  }
  let urlString = `${baseUrl}${url}`
  let firstAdded = false
  if (parameters) {
    for (const parameter of Object.keys(parameters)) {
      if (!firstAdded) {
        urlString += `?${parameter}=${parameters[parameter]}`
        firstAdded = true
      } else {
        urlString += `&${parameter}=${parameters[parameter]}`
      }
    }
  }
  const data = fetch(urlString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}
