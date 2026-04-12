function loadImage(input, imgElement) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => imgElement.src = e.target.result;
  reader.readAsDataURL(file);
}

function generateCard() {
  document.getElementById("name").innerText = document.getElementById("input-name").value;
  document.getElementById("title").innerText = document.getElementById("tit").value;
  document.getElementById("famon").innerText = document.getElementById("favMon").value;
  const selectedGame = document.getElementById("favGame").value;
  const gameFileMap = {
    mh2g: "mhfu.png",
    mhp3: "mh3p.png"
  };

  const fileName = gameFileMap[selectedGame] || `${selectedGame}.png`;
  document.getElementById("favGam").innerHTML = `<img class="gicon" src="./imagens/Logo/${fileName}" alt="${selectedGame}">`;

  const inputDesc = document.getElementById("input-desc").value.substring(0, 432);
  const descLines = inputDesc.split("\n").slice(0, 10);
  document.getElementById("desc").innerText = descLines.join("\n");
  loadImage(document.getElementById("input-profile"), document.getElementById("profile"));
  loadImage(document.getElementById("input-bg"), document.getElementById("bg"));
  loadImage(document.getElementById("input-icon"), document.getElementById("icon"))

  const files = document.getElementById("input-gallery").files;
  for (let i = 0; i < 3; i++) {
    if (files[i]) {
      const reader = new FileReader();
      reader.onload = e => document.getElementById("g" + i).src = e.target.result;
      reader.readAsDataURL(files[i]);
    }
  }

  const checkboxes = document.querySelectorAll("#weapon-list input:checked");
  const weaponsContainer = document.getElementById("weapons");

  const weaponFileMap = {
    LBG: "LGB.png"
  };

  const selectedWeapons = Array.from(checkboxes).map(cb => cb.value);

  if (selectedWeapons.length === 0) {
    weaponsContainer.innerText = "Nenhuma arma selecionada";
    return;
  }

  const weaponImages = selectedWeapons.map(value => {
    const fileName = weaponFileMap[value] || `${value}.png`;
    return `<img class="weapon-icon" src="./imagens/armas/${fileName}" alt="${value}">`;
  });

  weaponsContainer.innerHTML = `<b id="WeaponCardText">Favorite Weapons:</b><br>${weaponImages.join(" ")}`;
}

function downloadCard() {
  const card = document.getElementById("card");
  const originalTransform = card.style.transform;
  card.style.transform = 'none'; // Remove scale for capture
  html2canvas(card, { scale: 2 }).then(canvas => {
    card.style.transform = originalTransform; // Restore scale
    const link = document.createElement("a");
    link.download = "hunter-card.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  });
}