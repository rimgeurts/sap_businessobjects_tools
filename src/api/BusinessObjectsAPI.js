let BASE_URL;
let SERVER_URL;

export const login = async (name, password, server, auth) => {
  let response;
  SERVER_URL = server;
  BASE_URL = `http://${SERVER_URL}/biprws`;
  try {
    response = await fetch(`${BASE_URL}/logon/long/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        clientType: "",
        auth: auth,
        userName: name
      })
    });
  } catch (e) {
    var data = { error_code: "SERVER_ERROR" };
    var blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    var init = { status: 401, statusText: "ServerError" };
    response = new Response(blob, init);
  }
  return response.json();
};

export const getData = async (logonToken, url, overrideUrl = false, method = "GET", payload = null) => {
  if (overrideUrl) {
    BASE_URL = "";
  }
  if (!overrideUrl) {
    BASE_URL = `http://${SERVER_URL}/biprws`;
  }
  const response = await fetch(BASE_URL + url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-SAP-LogonToken": logonToken
    },
    body: payload
  });
  return response.json();
};

export const getParentFolders = async (
  logonToken,
  url,
  parentFolderId,
  overrideUrl = false,
  folderPath = []
) => {
  const response = await getData(logonToken, url, overrideUrl);
  folderPath = [...folderPath, response.name];

  const parentURL = response.up.__deferred.uri;

  if (!parentURL.includes("Root")) {
    const override = true;
    return await getParentFolders(
      logonToken,
      parentURL,
      parentFolderId,
      override,
      folderPath
    );
  }

  if (parentURL.includes("Root")) {
    const folderPathString = [...folderPath, "Public Folders"]
      .reverse()
      .join(" / ");

    return folderPathString;
  }
};
