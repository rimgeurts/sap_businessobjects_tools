let BASE_URL;

export const login = async (name, password, server, auth) => {
  let response;
  BASE_URL = `http://${server}/biprws`;
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

export const getData = async (logonToken, url, overrideUrl = false) => {
  if (overrideUrl) {
    BASE_URL = "";
  }
  const response = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-SAP-LogonToken": logonToken
    }
  });
  return response.json();
};

export const getParentFolders =  async (logonToken, url, parentFolderId, overrideUrl = false
) => {
  const response = await getData(logonToken, url, overrideUrl)
  const folderPath = response.name;
  console.log(folderPath);
  
  const parentURL = response.up.__deferred.uri;
  
  if (!parentURL.includes("Root")) {
    const override = true;
    return folderPath.concat(await getParentFolders(logonToken, parentURL, parentFolderId, override, folderPath));
  }
  
  if (parentURL.includes("Root")) {
    return folderPath;
    console.log(folderPath);
  }
};



