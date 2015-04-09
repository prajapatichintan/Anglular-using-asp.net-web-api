function show() {
    $(".container").nimbleLoader("show", {
        position: "fixed",
        loaderClass: "loading_bar_body",
        debug: true,
        speed: 700,
        hasBackground: true,
        zIndex: 999,
        backgroundColor: "#34383e"
    })
}
function hide() {
    $(".container").nimbleLoader("hide");
}