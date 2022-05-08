
const create_webhook_json = (title, type, options, user_id) => {
  return {
    title: title,
    type: type,
    options: options,
    user_id: user_id
  }
}

module.exports = {
  create_webhook_json
}