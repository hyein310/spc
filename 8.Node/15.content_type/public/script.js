document.getElementById("jsonSendBtn").addEventListener("click", async () => {
  const data = document.getElementById("jsonInput").value;
  console.log("textarea : ", data);
  const res = await fetch("/submit-json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });

  //   const text = await res.text();
  const text = await res.json();

  console.log(text);
  document.getElementById("output").textContent = JSON.stringify(text);
});

document.getElementById("formSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("formName");
  const age = document.getElementById("formAge");

  //   JSON으로 변환해서 보내기
  //   const jsonData = {
  //     name: name,
  //     age: age,
  //   };

  //   const res = await fetch("/submit-form", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(jsonData),
  //   });

  // /submit-form?name=hyein&age=10
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("age", age);

  const res = await fetch("/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
});

document.getElementById("textSendBtn").addEventListener("click", async () => {
  const data = document.getElementById("textInput").value;

  const res = await fetch("/submit-text", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  });
});
