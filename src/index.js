import { fetchUsers } from "./users.js";

fetchUsers()
    .then(() => console.log('Данные успешно получены'))
    .catch(error => console.log('Ошибка:', error));