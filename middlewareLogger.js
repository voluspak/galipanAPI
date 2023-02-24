const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.content)
  console.log(request.body)
  console.log('-----')

  next()
}

module.exports = logger
