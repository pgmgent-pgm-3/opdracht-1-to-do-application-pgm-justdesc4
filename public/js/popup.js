const $close = document.getElementById("close");
const $popup = document.getElementById("message");
const $background = document.getElementById("overlay-bg");

function registerListeners() {
  $close.addEventListener("click", () => {
    $popup.classList.add("hidden");
    $background.classList.add("hidden");

    // Clear search parameters in the URL
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url);
  });
}

registerListeners();
