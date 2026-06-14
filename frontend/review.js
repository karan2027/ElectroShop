const API_URL = "http://localhost:5000";

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const productName = params.get("name");

const productNameEl = document.getElementById("productName");
const stars = document.querySelectorAll("#stars span");
const commentBox = document.getElementById("comment");
const eraseBtn = document.getElementById("eraseBtn");
const autoFillBtn = document.getElementById("autoFillBtn");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const reviewImage = document.getElementById("reviewImage");
const previewImage = document.getElementById("previewImage");
const message = document.getElementById("message");

let selectedRating = 0;

productNameEl.innerText = productName || "Unknown Product";

const autoComments = {
  1: `Product quality was not good.
I am not satisfied with this item.`,

  2: `Product is average.
Some features are okay, but quality needs improvement.

Delivery was fine, but the product did not meet my expectations.`,

  3: `Product is good for normal use.
Quality is acceptable according to the price.

Design is nice and easy to use.
Overall, it is a decent product.

Delivery and packaging were also okay.
I may recommend it for basic users.`,

  4: `Product quality is very good.
It works smoothly and looks premium.

The price is reasonable for this product.
Performance is also better than expected.

Packaging was safe and delivery was quick.
I am happy with this purchase.

Overall, it is a very good product.
I would recommend it to others.`,

  5: `Excellent product with premium quality.
I am fully satisfied with this item.

Performance is smooth and reliable.
The design also looks very attractive.

Packaging was safe and delivery was fast.
Everything was received in good condition.

This product gives great value for money.
It is better than I expected.

Overall, this is an amazing product.
I would definitely recommend it.`
};

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = Number(star.dataset.value);

    stars.forEach(s => s.classList.remove("active"));

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }
  });
});

autoFillBtn.addEventListener("click", () => {
  if (selectedRating === 0) {
    showMessage("Please select star rating first", "red");
    return;
  }

  commentBox.value = autoComments[selectedRating];
});

eraseBtn.addEventListener("click", () => {
  commentBox.value = "";
});

reviewImage.addEventListener("change", () => {
  const file = reviewImage.files[0];

  if (!file) return;

  previewImage.src = URL.createObjectURL(file);
  previewImage.style.display = "block";
});

submitReviewBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    showMessage("Please login first to submit review", "red");
    return;
  }

  if (!productId || !productName) {
    showMessage("Product information missing", "red");
    return;
  }

  if (selectedRating < 1 || selectedRating > 5) {
    showMessage("Please select rating between 1 to 5", "red");
    return;
  }

  if (commentBox.value.trim() === "") {
    showMessage("Review comment cannot be empty", "red");
    return;
  }

  const formData = new FormData();
  formData.append("productId", productId);
  formData.append("productName", productName);
  formData.append("rating", selectedRating);
  formData.append("comment", commentBox.value.trim());

  if (reviewImage.files[0]) {
    formData.append("image", reviewImage.files[0]);
  }

  try {
    submitReviewBtn.innerText = "Submitting...";
    submitReviewBtn.disabled = true;

    const res = await fetch(`${API_URL}/api/reviews/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || "Review submit failed", "red");
      return;
    }

    showMessage("Review submitted successfully ✅", "green");

    setTimeout(() => {
      window.location.href = `product-details.html?id=${productId}`;
    }, 1200);

  } catch (error) {
    showMessage("Server error. Please try again.", "red");
  } finally {
    submitReviewBtn.innerText = "Submit Review";
    submitReviewBtn.disabled = false;
  }
});

function showMessage(text, color) {
  message.innerText = text;
  message.style.color = color;
}