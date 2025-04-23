document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/cart");
  const data = await response.json();

  displayTable(data.cart);
});

function displayTable(cart) {
  const cartTableBody = document.querySelector("#cartTable tbody");
  cartTableBody.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}
              <button class="plusBtn" data-id="${item.id}">+</button>
              <button class="minusBtn" data-id="${item.id}">-</button>
            </td>
            <td><button class="delBtn" data-id="${item.id}">삭제</button></td>
        `;
    cartTableBody.appendChild(row);
  });
  quantityClick();
}

function quantityClick() {
  document.querySelectorAll(".plusBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-id");
      await updateQuantity(productId, "plus");
    });
  });

  document.querySelectorAll(".minusBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-id");
      await updateQuantity(productId, "minus");
    });
  });

  document.querySelectorAll(".delBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-id");
      await deleteProduct(productId);
    });
  });
}

async function updateQuantity(productId, action) {
  const res = await fetch(`/api/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action }),
  });

  const updateResult = await res.json();
  displayTable(updateResult.cart);
}

async function deleteProduct(productId) {
  const res = await fetch(`/api/cart/${productId}`, {
    method: "DELETE",
  });
  const updateResult = await res.json();
  displayTable(updateResult.cart);
}
