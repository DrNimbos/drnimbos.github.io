document.getElementById('lang').selectedIndex = 0;
const translations = {
  en: {
    returnToMain: "Return to main page...",
    profilePicture: "Profile Picture",
    hunterName: "Hunter Name",
    title: "Title",
    favoriteGame: "Favorite Game",
    description: "Description",
    favoriteMonster: "Favorite Monster",
    monsterIcon: "Monster Icon",
    backgroundImage: "Background Image",
    screenshots: "Screenshots (Max of 3)",
    favoriteWeapons: "Favorite Weapons",
    greatsword: "Greatsword",
    longsword: "Longsword",
    swordAndShield: "Sword and Shield",
    dualBlades: "Dual Blades",
    hammer: "Hammer",
    huntingHorn: "Hunting Horn",
    lance: "Lance",
    gunlance: "Gunlance",
    switchAxe: "Switch Axe",
    chargeBlade: "Charge Blade",
    insectGlave: "Insect Glave",
    bow: "Bow",
    lightBowgun: "Light Bowgun",
    heavyBowgun: "Heavy Bowgun",
    tonfa: "Tonfa",
    magnetSpike: "Magnet Spike",
    createGuildCard: "Create Guild Card",
    downloadGuildCard: "Download Guild Card",
    favoriteMonsterLabel: "Favorite Monster:",
    favoriteGameLabel: "Favorite Game:",
    aboutMe: "About me:",
    favoriteWeaponsLabel: "Favorite Weapons:",
    noWeaponsSelected: "No weapons selected"
  },
  pt: {
    returnToMain: "Voltar à página principal...",
    profilePicture: "Foto do Perfil",
    hunterName: "Nome do Caçador",
    title: "Título",
    favoriteGame: "Jogo Favorito",
    description: "Descrição",
    favoriteMonster: "Monstro Favorito",
    monsterIcon: "Ícone do Monstro",
    backgroundImage: "Imagem de Fundo",
    screenshots: "Capturas de Tela (Máx. 3)",
    favoriteWeapons: "Armas Favoritas",
    greatsword: "Espadão",
    longsword: "Espada Longa",
    swordAndShield: "Espada e Escudo",
    dualBlades: "Duplas-Lâminas",
    hammer: "Martelo",
    huntingHorn: "Berrante de Caça",
    lance: "Lança",
    gunlance: "Lançarma",
    switchAxe: "Transmachado",
    chargeBlade: "Lâmina Dínamo",
    insectGlave: "Glaive Inseto",
    bow: "Arco",
    lightBowgun: "Fuzilarco Leve",
    heavyBowgun: "Fuzilarco Pesado",
    tonfa: "Tonfa",
    magnetSpike: "Magnet Spike",
    createGuildCard: "Criar Cartão de Guilda",
    downloadGuildCard: "Baixar Cartão de Guilda",
    favoriteMonsterLabel: "Monstro Favorito:",
    favoriteGameLabel: "Jogo Favorito:",
    aboutMe: "Sobre mim:",
    favoriteWeaponsLabel: "Armas Favoritas:",
    noWeaponsSelected: "Nenhuma arma selecionada"
  },
  jp: {
    returnToMain: "メインページに戻る...",
    profilePicture: "プロフィール画像",
    hunterName: "ハンター名",
    title: "称号",
    favoriteGame: "お気に入りのゲーム",
    description: "説明",
    favoriteMonster: "お気に入りのモンスター",
    monsterIcon: "モンスターアイコン",
    backgroundImage: "背景画像",
    screenshots: "スクリーンショット（最大3枚まで）",
    favoriteWeapons: "お気に入りの武器",
    greatsword: "大剣",
    longsword: "太刀",
    swordAndShield: "片手剣",
    dualBlades: "双剣",
    hammer: "ハンマー",
    huntingHorn: "狩猟笛",
    lance: "ランス",
    gunlance: "ガンランス",
    switchAxe: "スラッシュアックス",
    chargeBlade: "チャージアックス",
    insectGlave: "操虫棍",
    bow: "弓",
    lightBowgun: "ライトボウガン",
    heavyBowgun: "ヘビィボウガン",
    tonfa: "穿龍棍",
    magnetSpike: "磁斬鎚",
    createGuildCard: "ギルドカードを作成する",
    downloadGuildCard: "ギルドカードをダウンロードする",
    favoriteMonsterLabel: "お気に入りのモンスター：",
    favoriteGameLabel: "お気に入りのゲーム:",
    aboutMe: "自己紹介:",
    favoriteWeaponsLabel: "お気に入りの武器：",
    noWeaponsSelected: "武器が選択されていません"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
}

function loadImage(input, imgElement) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => imgElement.src = e.target.result;
  reader.readAsDataURL(file);
}

function generateCard() {
  document.getElementById("star1").style.display = "block";
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
    weaponsContainer.innerText = translations[currentLang].noWeaponsSelected;
    return;
  }

  const weaponImages = selectedWeapons.map(value => {
    const fileName = weaponFileMap[value] || `${value}.png`;
    return `<img class="weapon-icon" src="./imagens/armas/${fileName}" alt="${value}">`;
  });

  weaponsContainer.innerHTML = `<b>${translations[currentLang].favoriteWeaponsLabel}</b><br>${weaponImages.join(" ")}`;
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

setLanguage('pt');