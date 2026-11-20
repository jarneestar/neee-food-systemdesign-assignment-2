const restaurants = [
  {
    id: "pahadi",
    name: "Pahadi Rasoi",
    cuisine: "Indian",
    rating: "4.9",
    time: "20–25 min",
    price: "₹250 for two",
    offer: "20% OFF",
    tags: ["North Indian", "Pahadi"],
    image: "assets/food/pahadi-thali.jpg",
    caption: "Veg comfort, the pahadi way",
    menu: [
      { name: "Pahadi veg thali", description: "Seasonal pahadi vegetable curry, pahadi raita, dal, rice & fresh roti.", price: 269 },
      { name: "Paneer butter masala", description: "Soft paneer in a rich, silky tomato-butter gravy.", price: 229 },
      { name: "Garhwali kafuli", description: "A comforting spinach & fenugreek curry, served with steamed rice.", price: 179 },
      { name: "Gulab jamun", description: "Two warm, syrup-soaked bites of something sweet.", price: 79 },
    ],
  },
  {
    id: "oven",
    name: "The Little Oven",
    cuisine: "Pizza",
    rating: "4.8",
    time: "25–30 min",
    price: "₹400 for two",
    offer: "FREE DESSERT",
    tags: ["Pizza", "Italian"],
    image: "assets/food/veg-pizza.jpg",
    caption: "A little slice of happiness",
    menu: [
      { name: "Margherita, made better", description: "San Marzano tomato, vegetarian-rennet mozzarella & fresh basil.", price: 279 },
      { name: "Garden party pizza", description: "Roasted peppers, olives, mushrooms & a little chilli honey.", price: 359 },
      { name: "Creamy pesto pasta", description: "Basil pesto, vegetarian-rennet parmesan & toasted pine nuts.", price: 259 },
      { name: "Egg-free tiramisu cup", description: "Espresso-soaked egg-free sponge with a cloud of mascarpone.", price: 129 },
    ],
  },
  {
    id: "wok",
    name: "Wok This Way",
    cuisine: "Asian",
    rating: "4.7",
    time: "20–30 min",
    price: "₹350 for two",
    offer: "15% OFF",
    tags: ["Asian", "Noodles"],
    image: "assets/food/veggie-noodles.jpg",
    caption: "Hot wok, happy heart",
    menu: [
      { name: "Chilli garlic noodles", description: "Wok-tossed noodles with crunchy veg & a garlicky kick.", price: 219 },
      { name: "Crispy chilli tofu", description: "Golden tofu, tossed in a sweet, sticky chilli sauce.", price: 199 },
      { name: "Veggie dumplings", description: "Six hand-folded dumplings with ginger-soy dip.", price: 189 },
      { name: "Mango sticky rice", description: "Sweet coconut rice, ripe mango & toasted sesame.", price: 149 },
    ],
  },
  {
    id: "burger",
    name: "Good Mood Burgers",
    cuisine: "Burgers",
    rating: "4.8",
    time: "15–25 min",
    price: "₹300 for two",
    offer: "₹100 OFF",
    tags: ["Burgers", "American"],
    image: "assets/food/veg-burger.jpg",
    caption: "Big buns, bigger smiles",
    menu: [
      { name: "The happy paneer burger", description: "Crispy paneer patty, cheddar, pickles & our happy sauce.", price: 249 },
      { name: "Crispy aloo tikki burger", description: "Golden potato-and-pea tikki, crunchy slaw & tangy mayo.", price: 239 },
      { name: "Truffle cheese fries", description: "Golden fries with truffle oil & a shower of vegetarian-rennet parmesan.", price: 169 },
      { name: "Thick mango shake", description: "Real Alphonso mango blended with egg-free vanilla ice cream.", price: 139 },
    ],
  },
  {
    id: "sugar",
    name: "Sugar, Please!",
    cuisine: "Desserts",
    rating: "4.9",
    time: "20–30 min",
    price: "₹250 for two",
    offer: "SWEET DEAL",
    tags: ["Desserts", "Bakery"],
    image: "assets/food/fruit-dessert.jpg",
    caption: "Save room for the sweet part",
    menu: [
      { name: "Egg-free strawberry cloud cake", description: "Egg-free vanilla sponge, fresh strawberries & whipped cream.", price: 199 },
      { name: "Eggless chocolate brownie", description: "A fudgy, warm eggless brownie with vanilla bean ice cream.", price: 179 },
      { name: "Egg-free lemon tart", description: "Egg-free buttery pastry, bright egg-free lemon curd & toasted aquafaba meringue.", price: 159 },
      { name: "Egg-free cookie dough jar", description: "Edible egg-free chocolate chip cookie dough, ready by the spoonful.", price: 169 },
    ],
  },
  {
    id: "tandoori",
    name: "Tandoori & Co.",
    cuisine: "Indian",
    rating: "4.6",
    time: "25–35 min",
    price: "₹400 for two",
    offer: "20% OFF",
    tags: ["North Indian", "Tandoor"],
    image: "assets/food/paneer-tikka.jpg",
    caption: "Fresh from our veg tandoor",
    menu: [
      { name: "Tandoori paneer tikka", description: "Charred, smoky paneer with mint chutney & lemon.", price: 269 },
      { name: "Dal makhani", description: "Black lentils simmered low and slow with butter & cream.", price: 229 },
      { name: "Garlic naan", description: "Soft, egg-free naan brushed with garlic butter.", price: 69 },
      { name: "Kesar phirni", description: "Chilled saffron rice pudding with toasted pistachio.", price: 99 },
    ],
  },
];

const grid = document.querySelector("#restaurant-grid");
const searchInput = document.querySelector("#search-input");
const emptyState = document.querySelector("#empty-state");
const overlay = document.querySelector("#overlay");
const cart = new Map();
const STORAGE_KEYS = {
  account: "neee-food-demo-account",
  notifications: "neee-food-notification-history",
  user: "neee-food-notification-user",
  links: "neee-food-short-links",
};
let activeCategory = "All";
let activeRestaurant = null;
let toastTimer;

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

function readStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Could not read ${key} from browser storage.`, error);
    showToast("Browser storage is unavailable; this demo may not keep your data.");
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} to browser storage.`, error);
    showToast("Could not save this demo data in browser storage.");
    return false;
  }
}

function renderRestaurants() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = restaurants.filter((restaurant) => {
    const categoryMatches = activeCategory === "All"
      || restaurant.cuisine === activeCategory
      || restaurant.tags.includes(activeCategory);
    const searchMatches = !query
      || [restaurant.name, restaurant.cuisine, ...restaurant.tags, ...restaurant.menu.map((item) => item.name)]
        .some((value) => value.toLowerCase().includes(query));
    return categoryMatches && searchMatches;
  });

  grid.innerHTML = matches.map((restaurant) => `
    <article class="restaurant-card" data-restaurant="${restaurant.id}" tabindex="0" role="button" aria-label="View ${restaurant.name} menu">
      <div class="restaurant-image" style="background-image:url('${restaurant.image}')">
        <span class="discount-tag">${restaurant.offer}</span>
        <button class="heart-button" type="button" aria-label="Save ${restaurant.name}" aria-pressed="false">♡</button>
        <span class="image-caption">${restaurant.caption}</span>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-title-row"><h3>${restaurant.name}</h3><span class="rating"><span>★</span> ${restaurant.rating}</span></div>
        <div class="restaurant-meta"><span>${restaurant.cuisine}</span><span>${restaurant.time}</span><span>${restaurant.price}</span></div>
        <div class="restaurant-tags">${restaurant.tags.map((tag) => `<span>${tag}</span>`).join("")}<span class="veg-tag">100% Veg</span></div>
      </div>
    </article>
  `).join("");
  emptyState.hidden = matches.length > 0;
}

function showOverlay(panel) {
  overlay.hidden = false;
  document.querySelectorAll(".overlay > *").forEach((item) => { item.hidden = item !== panel; });
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  activeRestaurant = null;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2500);
}

function openRestaurant(restaurant) {
  activeRestaurant = restaurant;
  const modal = document.querySelector("#restaurant-modal");
  modal.innerHTML = `
    <div class="restaurant-modal-top" style="background-image:url('${restaurant.image}')"><button class="close-button" data-close aria-label="Close menu">×</button></div>
    <div class="restaurant-modal-title-row"><h2 id="restaurant-modal-title">${restaurant.name}</h2><span class="rating"><span>★</span> ${restaurant.rating}</span></div>
    <p class="restaurant-modal-info">${restaurant.cuisine} · ${restaurant.time} · ${restaurant.price}</p>
    <span class="section-kicker">A FEW THINGS WE LOVE</span><h3 class="menu-heading">The good stuff</h3>
    <div>${restaurant.menu.map((item, index) => `
      <div class="menu-item"><div><h4>${item.name} <span class="menu-veg-label">VEG</span></h4><p>${item.description}</p><div class="menu-item-price">${money(item.price)}</div></div><button class="menu-add" type="button" data-add="${index}">ADD +</button></div>
    `).join("")}</div>
  `;
  showOverlay(modal);
}

function addToCart(restaurant, item) {
  const key = `${restaurant.id}:${item.name}`;
  const existing = cart.get(key);
  cart.set(key, { key, restaurantId: restaurant.id, restaurantName: restaurant.name, name: item.name, price: item.price, quantity: (existing?.quantity ?? 0) + 1 });
  updateCart();
  showToast(`${item.name} added to your bag ♡`);
}

function updateCart() {
  const quantity = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#bag-item-count").textContent = quantity ? `(${quantity})` : "";
  const content = document.querySelector("#cart-content");
  const footer = document.querySelector("#cart-footer");

  if (!quantity) {
    content.innerHTML = `<div class="cart-empty"><span class="cart-empty-emoji">🥡</span><h3>Your bag's feeling light</h3><p>That's okay — the good stuff is just around the corner.</p><button class="button button-primary" type="button" data-close>Find a bite</button></div>`;
    footer.innerHTML = "";
    return;
  }

  content.innerHTML = [...cart.values()].map((item) => `
    <div class="cart-line"><div><h3>${item.name}</h3><p>${item.restaurantName}</p><div class="quantity-control"><button type="button" data-quantity="-1" data-key="${item.key}" aria-label="Remove one ${item.name}">−</button><span>${item.quantity}</span><button type="button" data-quantity="1" data-key="${item.key}" aria-label="Add one ${item.name}">+</button></div></div><span class="cart-line-price">${money(item.price * item.quantity)}</span></div>
  `).join("");
  const subtotal = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 30;
  const total = subtotal + delivery;
  footer.innerHTML = `
    <div class="bill-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="bill-row"><span>Delivery</span><span>${delivery ? money(delivery) : "On us!"}</span></div>
    <div class="bill-row total"><span>Total</span><span>${money(total)}</span></div>
    <form class="checkout-form" id="checkout-form">
      <label for="delivery-address">Delivery address</label>
      <input id="delivery-address" name="address" placeholder="House, street & area" required />
      <label>How would you like to pay?</label>
      <div class="payment-options">
        <label><input type="radio" name="payment" value="UPI" checked /><span>UPI</span></label>
        <label><input type="radio" name="payment" value="Card" /><span>Card</span></label>
        <label><input type="radio" name="payment" value="Cash" /><span>Cash</span></label>
      </div>
      <p class="payment-demo-note">Payment is simulated for this assignment — no money is charged.</p>
      <button class="button button-primary full-button" type="submit">Place order · ${money(total)} <span aria-hidden="true">→</span></button>
    </form>
  `;
}

function renderNotificationHistory() {
  const historyList = document.querySelector("#notification-history-list");
  const history = readStored(STORAGE_KEYS.notifications, []);
  if (!Array.isArray(history) || history.length === 0) {
    historyList.innerHTML = '<p class="history-empty">Your sent notifications will show up here.</p>';
    return;
  }

  historyList.innerHTML = [...history].reverse().map((notification) => `
    <article class="history-item">
      <div class="history-item-top"><strong>${escapeHtml(notification.type)} · ${escapeHtml(notification.name)}</strong><time>${escapeHtml(notification.createdAt)}</time></div>
      <p class="history-message">${escapeHtml(notification.message)}</p>
      <div class="delivery-channels">${notification.channels.map((channel) => `
        <span class="channel-status ${channel.status.toLowerCase()}">${escapeHtml(channel.channel)}: ${escapeHtml(channel.status)} · ${channel.attempts} attempt${channel.attempts === 1 ? "" : "s"}</span>
      `).join("")}</div>
      ${notification.channels.some((channel) => channel.status === "Failed")
        ? `<button class="retry-button" type="button" data-retry="${escapeHtml(notification.id)}">Retry failed channels</button>`
        : ""}
    </article>
  `).join("");
}

function renderShortLinks() {
  const results = document.querySelector("#shortener-results");
  const links = readStored(STORAGE_KEYS.links, []);
  if (!Array.isArray(links) || links.length === 0) {
    results.innerHTML = '<p class="shortener-empty">Your shortened links and click counts will appear here.</p>';
    return;
  }

  results.innerHTML = [...links].reverse().map((link) => `
    <article class="short-link-card">
      <div class="short-link-details">
        <a class="short-link" href="?s=${encodeURIComponent(link.code)}" data-short-redirect="${escapeHtml(link.code)}">${escapeHtml(link.shortUrl)}</a>
        <span class="short-original" title="${escapeHtml(link.originalUrl)}">${escapeHtml(link.originalUrl)}</span>
        <div class="short-link-meta"><span>${link.clicks} click${link.clicks === 1 ? "" : "s"}</span><span>Created ${escapeHtml(link.createdAt)}</span></div>
      </div>
      <div class="short-link-actions"><button type="button" data-copy="${escapeHtml(link.shortUrl)}">Copy</button><button type="button" data-open-short="${escapeHtml(link.code)}">Open</button></div>
    </article>
  `).join("");
}

function registerNotificationUser(formData) {
  const preferences = [...formData.getAll("channel")];
  if (preferences.length === 0) {
    showToast("Choose at least one notification channel.");
    return false;
  }
  const user = {
    name: String(formData.get("name")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    preferences,
  };
  if (!user.name || !user.email || !user.phone) {
    showToast("Add your name, email and mobile number to register.");
    return false;
  }
  return writeStored(STORAGE_KEYS.user, user);
}

function sendNotification(formData) {
  if (!registerNotificationUser(formData)) return;
  const shouldFailOnce = formData.get("simulateFailure") === "on";
  const channels = formData.getAll("channel").map((channel) => ({
    channel: String(channel),
    status: shouldFailOnce ? "Failed" : "Sent",
    attempts: 1,
  }));
  const history = readStored(STORAGE_KEYS.notifications, []);
  if (!Array.isArray(history)) {
    showToast("Notification history is unavailable; please refresh and try again.");
    return;
  }
  history.push({
    id: `notification-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: String(formData.get("name")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    type: String(formData.get("type")),
    message: String(formData.get("message")).trim(),
    createdAt: new Date().toLocaleString(),
    channels,
  });
  if (!writeStored(STORAGE_KEYS.notifications, history)) return;
  renderNotificationHistory();
  showToast(shouldFailOnce ? "Temporary failure recorded. Use Retry failed channels." : "Notification sent on your selected channels.");
}

function retryNotification(notificationId) {
  const history = readStored(STORAGE_KEYS.notifications, []);
  const notification = Array.isArray(history) ? history.find((item) => item.id === notificationId) : null;
  if (!notification) {
    showToast("That notification could not be found in the saved history.");
    return;
  }
  notification.channels.forEach((channel) => {
    if (channel.status === "Failed") {
      channel.status = "Sent";
      channel.attempts += 1;
    }
  });
  if (writeStored(STORAGE_KEYS.notifications, history)) {
    renderNotificationHistory();
    showToast("Retry complete. Failed channels are now marked as sent.");
  }
}

function updateAccountButton() {
  const account = readStored(STORAGE_KEYS.account, null);
  const label = document.querySelector("#login-button span:last-child");
  if (account && typeof account.name === "string" && account.name) {
    label.textContent = `Hi, ${account.name}`;
    document.querySelector("#login-button").setAttribute("aria-label", `Sign out ${account.name}`);
  } else {
    label.textContent = "Sign in";
    document.querySelector("#login-button").setAttribute("aria-label", "Sign in");
  }
}

function makeShortUrl(longUrl) {
  let destination;
  try {
    destination = new URL(longUrl);
  } catch {
    showToast("Enter a valid URL starting with https:// or http://.");
    return;
  }
  if (destination.protocol !== "https:" && destination.protocol !== "http:") {
    showToast("Only http:// and https:// links can be shortened.");
    return;
  }
  const links = readStored(STORAGE_KEYS.links, []);
  if (!Array.isArray(links)) {
    showToast("Saved links are unavailable; please refresh and try again.");
    return;
  }

  let code;
  do {
    code = Math.random().toString(36).slice(2, 8);
  } while (links.some((link) => link.code === code));
  const shortUrl = new URL(`?s=${code}`, window.location.href.split("?")[0]).href;
  links.push({
    code,
    originalUrl: destination.href,
    shortUrl,
    clicks: 0,
    createdAt: new Date().toLocaleString(),
  });
  if (writeStored(STORAGE_KEYS.links, links)) {
    renderShortLinks();
    showToast("Your tiny link is ready!");
  }
}

function followShortLink(code) {
  const links = readStored(STORAGE_KEYS.links, []);
  const link = Array.isArray(links) ? links.find((item) => item.code === code) : null;
  if (!link) {
    showToast("That short link is not saved in this browser.");
    return;
  }
  link.clicks += 1;
  if (writeStored(STORAGE_KEYS.links, links)) window.location.assign(link.originalUrl);
}

function redirectFromShortLink() {
  const code = new URLSearchParams(window.location.search).get("s");
  if (code) followShortLink(code);
}

document.querySelector("#category-list").addEventListener("click", (event) => {
  const chip = event.target.closest("[data-category]");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  document.querySelectorAll(".category-chip").forEach((item) => item.classList.toggle("active", item === chip));
  renderRestaurants();
});

searchInput.addEventListener("input", renderRestaurants);
document.querySelector("#clear-filters").addEventListener("click", () => {
  activeCategory = "All";
  searchInput.value = "";
  document.querySelectorAll(".category-chip").forEach((item) => item.classList.toggle("active", item.dataset.category === "All"));
  renderRestaurants();
});

grid.addEventListener("click", (event) => {
  const heart = event.target.closest(".heart-button");
  if (heart) {
    const liked = heart.getAttribute("aria-pressed") !== "true";
    heart.setAttribute("aria-pressed", String(liked));
    heart.classList.toggle("liked", liked);
    heart.textContent = liked ? "♥" : "♡";
    showToast(liked ? "Saved to your favourites ♡" : "Removed from your favourites");
    return;
  }
  const card = event.target.closest("[data-restaurant]");
  if (card) openRestaurant(restaurants.find((restaurant) => restaurant.id === card.dataset.restaurant));
});

grid.addEventListener("keydown", (event) => {
  if (event.target !== event.currentTarget && !event.target.matches(".restaurant-card")) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  const card = event.target.closest("[data-restaurant]");
  if (card) openRestaurant(restaurants.find((restaurant) => restaurant.id === card.dataset.restaurant));
});

document.querySelector("#restaurant-modal").addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton && activeRestaurant) addToCart(activeRestaurant, activeRestaurant.menu[Number(addButton.dataset.add)]);
});

document.querySelector("#open-cart").addEventListener("click", () => {
  updateCart();
  showOverlay(document.querySelector("#cart-drawer"));
});
document.querySelector("#login-button").addEventListener("click", () => {
  const account = readStored(STORAGE_KEYS.account, null);
  if (account) {
    if (writeStored(STORAGE_KEYS.account, null)) {
      updateAccountButton();
      showToast("You have signed out of this demo account.");
    }
    return;
  }
  showOverlay(document.querySelector("#login-modal"));
});

overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.closest("[data-close]")) closeOverlay();
});

document.querySelector("#cart-content").addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  const item = cart.get(button.dataset.key);
  if (!item) return;
  item.quantity += Number(button.dataset.quantity);
  if (item.quantity <= 0) cart.delete(item.key);
  updateCart();
});

document.querySelector("#cart-footer").addEventListener("submit", (event) => {
  if (event.target.id !== "checkout-form") return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const checkout = new FormData(event.target);
  const address = checkout.get("address");
  const paymentMethod = checkout.get("payment");
  const paymentStatus = paymentMethod === "Cash"
    ? "Pay with cash on delivery."
    : `${paymentMethod} payment approved in demo mode — no money was charged.`;
  document.querySelector("#track-description").textContent = `Your order is on its way to ${address}. ${paymentStatus}`;
  cart.clear();
  updateCart();
  showOverlay(document.querySelector("#track-modal"));
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const formData = new FormData(event.target);
  const name = String(formData.get("name")).trim();
  const phone = String(formData.get("phone")).trim();
  if (!name || !/^\d{10}$/.test(phone)) {
    showToast("Enter your name and a valid 10-digit mobile number.");
    return;
  }
  if (!writeStored(STORAGE_KEYS.account, { name, phone })) return;
  updateAccountButton();
  closeOverlay();
  showToast(`Welcome, ${name}! Your demo account is saved on this browser.`);
  event.target.reset();
});

document.querySelector("#location-button").addEventListener("click", () => showToast("Delivering in Dehradun, India 📍"));
document.querySelector("#notification-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  sendNotification(new FormData(event.target));
});
document.querySelector("#notification-history-list").addEventListener("click", (event) => {
  const retryButton = event.target.closest("[data-retry]");
  if (retryButton) retryNotification(retryButton.dataset.retry);
});
document.querySelector("#clear-notifications").addEventListener("click", () => {
  if (writeStored(STORAGE_KEYS.notifications, [])) {
    renderNotificationHistory();
    showToast("Notification history cleared.");
  }
});
document.querySelector("#shortener-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  makeShortUrl(new FormData(event.target).get("url"));
  event.target.reset();
});
document.querySelector("#shortener-results").addEventListener("click", async (event) => {
  const shortLink = event.target.closest("[data-short-redirect]");
  if (shortLink) {
    event.preventDefault();
    followShortLink(shortLink.dataset.shortRedirect);
    return;
  }
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      showToast("Short link copied to clipboard.");
    } catch (error) {
      console.error("Could not copy the short link.", error);
      showToast("Clipboard access is unavailable. Select and copy the link instead.");
    }
    return;
  }
  const openButton = event.target.closest("[data-open-short]");
  if (openButton) followShortLink(openButton.dataset.openShort);
});
document.querySelector("#shortener-results").addEventListener("auxclick", (event) => {
  const link = event.target.closest("[data-short-redirect]");
  if (link && event.button === 1) {
    event.preventDefault();
    followShortLink(link.dataset.shortRedirect);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeOverlay();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderRestaurants();
updateCart();
updateAccountButton();
renderNotificationHistory();
renderShortLinks();
const savedNotificationUser = readStored(STORAGE_KEYS.user, null);
if (savedNotificationUser && typeof savedNotificationUser === "object") {
  const notificationForm = document.querySelector("#notification-form");
  notificationForm.elements.namedItem("name").value = savedNotificationUser.name || "";
  notificationForm.elements.namedItem("email").value = savedNotificationUser.email || "";
  notificationForm.elements.namedItem("phone").value = savedNotificationUser.phone || "";
  const savedPreferences = Array.isArray(savedNotificationUser.preferences) ? savedNotificationUser.preferences : [];
  notificationForm.querySelectorAll('input[name="channel"]').forEach((input) => {
    input.checked = savedPreferences.includes(input.value);
  });
}
redirectFromShortLink();
