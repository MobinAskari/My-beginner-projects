type pullResult = {
  status: number,
  data: null | any,
  message: string
}

type PushResult = {
  status: number,
  message: string
}

export const pullSessionStorage = (key: string): pullResult => {
  if (!key) {
    return {
      status: 400,
      data: null,
      message: "Providing a key is mandatory"
    };
  }

  const data = sessionStorage.getItem(key);

  if (!data) {
    return {
      status: 404,
      data: null,
      message: "Item does not exist in session storage"
    };
  }

  try {
    return {
      status: 200,
      data: JSON.parse(data),
      message: "OK"
    };
  } catch (error: any) {
    return {
      status: 501,
      data: null,
      message: `Error parsing data from session storage:: ${error.message}`
    };
  }
}

export const pushToSessionStorage = (key: string, value: any): PushResult => {
  if (!key) return {
    status: 400,
    message: "Providing a key is mandatory"
  };

  if (!value) return {
    status: 400,
    message: "Providing a value is mandatory"
  };

  const stringifiedValue = JSON.stringify(value);
  
  try {
    sessionStorage.setItem(key, stringifiedValue);
    return {
      status: 200,
      message: "OK"
    };
  } catch (error: any) {
    return {
      status: 501,
      message: `Error pushing data to session storage:: ${error.message}`
    };
  }

}