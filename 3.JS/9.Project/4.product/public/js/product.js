document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/productList");
  const productList = await res.json();
  displayTable(productList);
});

function displayTable(productList) {
  //   const productTableBody = document.querySelector("#productTable tbody");
  productList.forEach((p) => {
    // const row = document.createElement("tr");
    console.log("p:: ", p);
    let tr = document.createElement("tr");
    let tId = document.createElement("td");
    tId.innerHTML = p.id;
    let tName = document.createElement("td");
    tName.innerHTML = p.name;
    let tPrice = document.createElement("td");
    tPrice.innerHTML = p.price;
    let tAction = document.createElement("td");
    tAction.innerHTML = `<button id="${p.name}">담기</button>`;

    document.getElementById("tbody").appendChild(tr);
    tr.appendChild(tId);
    tr.appendChild(tName);
    tr.appendChild(tPrice);
    tr.appendChild(tAction);

    addProduct(p.name);
  });
}

function addProduct(productName) {
  document
    .getElementById(`${productName}`)
    .addEventListener("click", async () => {
      console.log("click!!!", productName);

      const res = await fetch(`/productAdd`, {
        method: "POST",
        headers: { "Content-Type": "text/html" },
        body: "추가 요청입니다",
      });
      const result = await res.json();

      console.log("result:: ", result);
    });
}
