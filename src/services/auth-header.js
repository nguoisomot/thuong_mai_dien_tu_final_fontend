export default function authHeader() {
  const id = JSON.parse(localStorage.getItem('shop'));

  if (id) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { "id": id._id };       // for Node.js Express back-end
  } else {
    return {};
  }
}
