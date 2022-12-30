const CAST = {
  status: 400,
  message: 'Ошибочный тип данных',
};

const VALIDATION = {
  status: 400,
  message: 'Недопустимое значение',
};

const NOTAUTHORIZED = {
  status: 401,
  message: 'Вы не авторизованы',
};

const FORBIDDEN = {
  status: 403,
  message: 'Нет разрешения',
};

const NOTFOUND = {
  status: 404,
  message: 'Не найдено',
};

const CONFLICT = {
  status: 409,
  message: 'Уже используется',
};

const SERVER = {
  status: 500,
  message: 'Ошибка на сервере',
};

module.exports = {
  CAST,
  VALIDATION,
  NOTAUTHORIZED,
  FORBIDDEN,
  NOTFOUND,
  CONFLICT,
  SERVER,
};
