export const login = async (name, password, server, auth) => {
  let response;
  try {
    response = await fetch(`http://${server}/biprws/logon/long/`, {
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

export const getData = async (logonToken, reportId) => {
  console.log("passing id:", reportId);
  const url = "http://localhost:6405/biprws/v1/documents/" + reportId;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-SAP-LogonToken": logonToken
    }
  });
  return response.json();
};
