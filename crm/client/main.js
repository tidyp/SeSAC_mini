const url = "/auth/signin";

const fetchsignin = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("로그인 성공:", data);
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
    });
};

const signinBtn = () => {
  const email = document.getElementById("email").value;
  const passwd = document.getElementById("password").value;

  console.log(email, passwd);

  fetchLogin(url, { email: email, password: passwd });
};

const sigininHandelr = () => {
  const el = document.getElementById("myButton");
  el.addEventListener("click", signinBtn);
};
